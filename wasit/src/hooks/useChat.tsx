import { useEffect, useState, useContext } from "react"
import api from "../services/api"
import AuthContext from "../contexts/auth"
import message from "../reducers/message"
import Message from "../models/chatMessage"
import { useSelector, useDispatch } from 'react-redux'

interface useChatDirectProps {
  // isGroup: boolean
  socket: any
  chatId: number | null
  contact: any
}
// atenção após terminar o direct chat fazer o group chat
export default function useChat(props: useChatDirectProps) {// tanto para quando for criar um chat ou já existe um
  const { user } = useContext(AuthContext) 
  const dispatch = useDispatch()
  const { chat, loading } = useSelector(({ chats }) => {
    const chat = props.chatId ? chats?.data.find(currentChat => { 
      return currentChat.accountId === user.id && currentChat.chatId === props.chatId
    })
    : chats?.data.find(currentChat => {
      return currentChat.accountId === user.id && currentChat.directId === props.contact.userId 
    })
    return { chat, loading: chats?.loading }
  }, [])

  useEffect(() => {
    console.log('view- current chat', chat);
    
  }, [chat])

  useEffect(() => {
    (async function searchChatDirectByMemberId () {
      if (props.chatId || chat ) return // caso exista não roda a função
      console.log('está aqui...');
      
      try {
        const { data: { value: [data] } } = await api.get('/chats', { params: { 
          chatMemberUserIds: [props.contact.userId, user.id],
          group: false  
        } })

        dispatch({ type: 'REQUEST_ADD_CHAT', payload: { //direct
          chat: { 
            ...data, 
            chatId: data.id,
            accountId: user.id,
            directId: props.contact.userId,
            name: props.contact.username,
            about: props.contact.about,
          }
         } 
        })

      } catch(err) {
        if (!err.response) { // network error
          // procurar no db local
          console.log(err);
        } else { // http status code
          // não existe
          console.log(err);
        }
      }
    })()
  }, [chat])

  
  async function createChatDirectIfNotExist (writeMessage) {
    try {
      const { data: { value: [data] } } = await api.post('/chats', {
        group: false,
        name: props.contact.username,
        about: props.contact.name,
        chatMemberUserIds: [props.contact.userId],
        messageContent: writeMessage.content
      }, { responseType: 'json' })

      if (props.socket) {

        const writeChat = {
          accountId: user.id,
          chatId: data.id,
          directId: props.contact.userId,
          group: + data.group,
          name: props.contact.username,
          about: props.contact.about,
        }

        dispatch({ type: 'REQUEST_ADD_CHAT', payload: { 
          user,
          sendTo: { userId: props.contact.userId },
          chat: writeChat,
          message: {...writeMessage, chatId: data.id },
          socket: props.socket ,
         } 
        })
      }
      

    } catch (err) {
      if (!err.response) { // network error
        console.log(err, ' ,_dd');
        //... não tem jeito
      } else { // http status code
        // a algo de errado...
        console.log(err, ' ,_dd');
      }
    }
  }

  async function sendMessage(writeMessage) {
    if(!chat) return await createChatDirectIfNotExist(writeMessage) // caso não exista ele cria antes

    if(props.socket) dispatch({ type: 'REQUEST_ADD_MESSAGE', payload: { 
      message: {  ...writeMessage, chatId: chat.chatId }, self: true, socket: props.socket } 
    })
  }

  return { chat, sendMessage }
}