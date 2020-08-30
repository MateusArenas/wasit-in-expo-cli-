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

const AppStack = createStackNavigator()

const AppRoutes: React.FC = () => {
  const { user } = useContext(AuthContext)
  const [socket, setSocket] = useState(null)
  const pageSize = 13
  const dispatch = useDispatch()
  const [JoinedRoomChat, setJoinedRoomChat] = useState({})
  const { data:chats, loading } = useSelector(({ chats }) => chats, [])

  useEffect(() => { // join chat rooms
    if (socket) {
      chats.forEach(({ chatId }) => {
        if(!JoinedRoomChat[chatId]) {
          socket.emit('joinChatRoom', { chatId })
          setJoinedRoomChat(currentJoinedRoomChat => ({...currentJoinedRoomChat, [chatId]: true }))
        }
      })
      return () => { // leave chat rooms
        chats.forEach(({ chatId }) => {
          if(JoinedRoomChat[chatId]) {
            socket.emit('leaveChatRoom', { chatId })
            setJoinedRoomChat(currentJoinedRoomChat => ({...currentJoinedRoomChat, [chatId]: false }))
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

  useEffect(() => { // carrega um  pocuco de mensagens de cada chat
    if (JoinedRoomChat) (function loadMessagesIntoMemory () {
      const chatIds = Object.keys(JoinedRoomChat)
      dispatch({ type: 'REQUEST_LOAD_MESSAGES', payload: { accountId: user.id, chatIds, pageSize, pageOffset: 0 } })
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
      socket.on('inviteJoinChatRoom', async ({ chat: chatReceived, senderId }) => {
        try {
          const writeChat = { 
            chatId: chatReceived.id,
            accountId: user.id,
            directId: senderId,
            group: + chatReceived.group,
            name: chatReceived.name,
            about: chatReceived.about,
          }
          
          dispatch({ type: 'REQUEST_ADD_CHAT', payload: { 
            chat: writeChat,
          } })

        } catch(err) {
          console.log(err);
        }
      })
  
      socket.on('receivedMessage', async (messageReceived: any, callEmiter) => {
        try {
          const writeMessage = { 
            accountId: user.id,
            chatId: messageReceived.chatId,
            userId: messageReceived.userId, 
            content: messageReceived.content, 
            messageId: messageReceived.messageId
          }

          dispatch({ type: 'REQUEST_ADD_MESSAGE', payload: { 
            message: writeMessage 
          } })

        } catch(err) {
          console.log(err);
        }
        socket.emit('confirmReceivedMessage', { messageId: messageReceived.id, chatId: messageReceived.chatId })
      }) 

      socket.on('viewedMessage', async ({ messageId, readDate, chatId }) => {
        dispatch({ type: 'REQUEST_UPDATE_MESSAGE', payload: { id: messageId, body: { readDate } } })
      })

      return () => {
        socket.off('inviteJoinChatRoom')
        socket.off('receivedMessage')
        socket.off('viewedMessage')
        // getChats() // update chats from network and load in memory
      }
    }
  }, [socket])

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
