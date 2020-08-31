import React, { useEffect, useState, useContext, useMemo, useRef } from 'react'
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack'
import MainRoutes from './main.routes'
import Chat from '../pages/Chat'
import NewGroup from '../pages/NewGroup'
import AuthRoutes from './auth.routes'
import Profile from '../pages/Profile'
// import { Container } from './styles';
import io from '../services/socket'
import AuthContext from '../contexts/auth'
import { useDispatch, useSelector } from 'react-redux'
import api from '../services/api'

const AppStack = createStackNavigator()

const AppRoutes: React.FC = () => {
  const { user } = useContext(AuthContext)
  const [socket, setSocket] = useState(null)
  const pageSize = 13
  const dispatch = useDispatch()
  const [JoinedRoomChat, setJoinedRoomChat] = useState({ group: {}, direct: {} })
  const { data:chats, loading } = useSelector(({ chats }) => chats, [])

useEffect(() => {
  console.log('all chats... ', chats);
  // organizar a entrada no app
  /**
   * quando entrar no app ira pedir todas as mensagems que não foram entregues
   * 1 - pergar as mensagems não entregues para o usuario com directId 
   * 2 - pegar os grupos que o usuario está
   * 3 - pegar as mensagens não entregues para o usuario com groupId
   */
}, [chats])

  useEffect(() => {
    if(socket) {
      loadDirectsUndeliverableMessages()
      loadGroups()
    }
    ///////////////////////////////////////////
  }, [socket])

  async function loadDirectsUndeliverableMessages () {
    try {
      console.log('in loadDirectsUndeliverableMessages');
      
      const { data: { value: undeliverableMessages } } = await api.get('/messages', { 
        params: { skip: 0, top: 100, include: ['user'] },
        responseType: 'json' 
      }) as any

      console.log('undeliverableMessages... ', undeliverableMessages);
      

      if (undeliverableMessages.length) undeliverableMessages.forEach(async _message => {
        const writeChat = { 
          accountId: user.id,
          directId: _message.userId, // inverted directId 
          groupId: null,
          name: _message.user.username,
          about: _message.user.about,
        }
        await receivedChat({ chat: writeChat, senderId: _message.userId})
        delete _message.user
        await receivedMessage(_message)
      }) 

    } catch (err) {
      console.log('request errou', err)
    }
  }

  async function loadGroups () {
    try {
      const { data: { value: groups } } = await api.get('/groups', { params: { skip: 0, top: 100 } })
      if (groups.length) groups.forEach((_group) => receivedChat({ chat: _group, senderId: null })) 
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => { // join chat rooms
    if (socket) {
      chats.forEach(async ({ directId, groupId }) => {
        if (directId) {
          if(!JoinedRoomChat.direct[directId]) {
            setJoinedRoomChat(({ direct, group }) => ({ group, direct: { ...direct, [directId]: true } }))
            try {
              const { data: { value: undeliverableMessages } } = await api.get('/messages', { params: { skip: 0, top: 100 } }) //get direct messages
              if (undeliverableMessages.length) undeliverableMessages.forEach(receivedMessage)
            } catch (err) {
              console.log(err)
            }
          }
        }
        if (groupId) {
          if(!JoinedRoomChat.group[groupId]) {
            socket.emit('joinGroupRoom', groupId)
            setJoinedRoomChat(({ direct, group }) => ({ direct, group: { ...group, [groupId]: true } }))
            try {
              const { data: { value: undeliverableMessages } } = await api.get('/messages', { params: { groupId, skip: 0, top: 100 } }) //get direct messages
              if (undeliverableMessages.length) undeliverableMessages.forEach(receivedMessage)
            } catch (err) {
              console.log(err)
            }
          }
        }
      })
      return () => { // leave chat rooms
        chats.forEach(({ directId, groupId }) => {
          if (groupId) {
            if(JoinedRoomChat.group[groupId]) {
              socket.emit('leaveGroupRoom', groupId)
              setJoinedRoomChat(({ direct, group }) => ({ direct, group: { ...group, [groupId]: false } }))
            }
          }
        })
      }
    }
  }, [socket, chats, JoinedRoomChat])

  const setupSocket = () => {
    const { token } = user
    if (token && !socket) {
      const newSocket = io({ token: `Bearer ${token}` })

      newSocket.on('disconnect', () => {
        setSocket(null)
        setTimeout(setupSocket, 3000)
        console.log('disconect...');
      })

      newSocket.on('connection', () => {
        console.log('conection...');
      })

      setSocket(newSocket)
    } 
  }

  useEffect(() => {
    setupSocket()
    // getChats()
  }, [])

  useEffect(() => { // carrega um  pocuco de mensagens de cada chat [{directId: 7, groupId: 2}, { groupId: 10 }]
    if (JoinedRoomChat) (function loadMessagesIntoMemory () {
      const orArray = chats.map(({ groupId, directId }) => ({ groupId, directId }))
      dispatch({ type: 'REQUEST_LOAD_MESSAGES', payload: { accountId: user.id, orArray, pageSize, pageOffset: 0 } })
    })()
  }, [JoinedRoomChat])

  async function getChats () {
    try {
      dispatch({ type: 'REQUEST_LOAD_CHATS', payload: { accountId: user.id, pageSize: 10, pageOffset: 0 } })
    } catch(err) {
      console.log('chats... ', err);
    }
  }

  useEffect(() => {
    if (socket) {
      socket.on('inviteJoinChatRoom', receivedChat)
      socket.on('receivedMessage', receivedMessage) 
      socket.on('viewedMessage', viewedMessage)
      socket.on('deliveredMessage', deliveredMessage)
      return () => {
        socket.off('inviteJoinChatRoom')
        socket.off('receivedMessage')
        socket.off('viewedMessage')
        socket.off('deliveredMessage')
        // getChats() // update chats from network and load in memory
      }
    }
  }, [socket])

  async function receivedMessage (messageReceived: any) { // ok
    try {
      const writeMessage = { 
        accountId: user.id,
        groupId: messageReceived.groupId,
        directId: messageReceived.directId && messageReceived.userId, //inverted directId
        userId: messageReceived.userId, 
        content: messageReceived.content, 
        originId: messageReceived.originId,
        receivedDate: new Date().toISOString()
      }

      console.log('received this... ', writeMessage);
      

      dispatch({ type: 'REQUEST_ADD_MESSAGE', payload: { 
        message: writeMessage 
      } })

      socket.emit('confirmReceivedMessage', { 
        messageId: messageReceived.id, 
        groupId: messageReceived.groupId,
        directId: messageReceived.directId && messageReceived.userId,
        receivedDate: writeMessage.receivedDate
      })

    } catch(err) {
      console.log(err);
    }
  }

  async function receivedChat ({ chat: chatReceived, senderId }) {
    try {
      const writeChat = { 
        directId: chatReceived.directId && senderId, // inverted directId 
        groupId: chatReceived.groupId,
        accountId: user.id,
        name: chatReceived.name,
        about: chatReceived.about,
      }
      
      dispatch({ type: 'REQUEST_ADD_CHAT', payload: { 
        chat: writeChat,
      } })

    } catch(err) {
      console.log(err);
    }
  }

  async function viewedMessage ({ originId, readDate }) {
    console.log('1viewedMessage... ', originId);

    dispatch({ type: 'REQUEST_UPDATE_MESSAGE', payload: { id: originId, body: { readDate } } })
  }

  async function deliveredMessage ({ originId, receivedDate }) {
    console.log('1deliveredMessage... ', originId);
    
    dispatch({ type: 'REQUEST_UPDATE_MESSAGE', payload: { id: originId, body: { receivedDate } } })
  }

  return (<>
    <AppStack.Navigator headerMode={"screen"}  >
      <AppStack.Screen name="Main" component={MainRoutes}/>
      <AppStack.Screen name="Profile" component={Profile}/>
      <AppStack.Screen name="Chat">
        { props => <Chat {...props} extraData={{ socket, pageSize }} /> }
      </AppStack.Screen> 
      <AppStack.Screen name="NewGroup" component={NewGroup}/>
      <AppStack.Screen name="AuthRoutes" options={{ header: () => <></> }} component={AuthRoutes}/>
    </AppStack.Navigator>
  </>)
}


export default AppRoutes
