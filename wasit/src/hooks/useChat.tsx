import { useEffect, useState, useContext } from "react"
import api from "../services/api"
import AuthContext from "../contexts/auth"
import message from "../reducers/message"
import Message from "../models/chatMessage"
import { useSelector, useDispatch } from 'react-redux'

interface useChatDirectProps {
  // isGroup: boolean
  socket: any
  directId?: number
  groupId?: number
  contact: any
}
// atenção após terminar o direct chat fazer o group chat
export default function useChat(props: useChatDirectProps) {// tanto para quando for criar um chat ou já existe um
  const { user } = useContext(AuthContext) 
  const dispatch = useDispatch()
  const { data:chat, loading } = useSelector(({ chats }) => {
    if (props.contact?.userId) {
      return { ...chats, data: chats?.data.find(currentChat => {
        return currentChat.accountId === user.id && currentChat.directId === props.contact?.userId
      }) }
    }
    if (props?.directId) {
      return { ...chats, data: chats?.data.find(currentChat => {
        return currentChat.accountId === user.id && currentChat.directId === props?.directId 
      }) }
    }
    if (props?.groupId) {
      return { ...chats, data: chats?.data.find(currentChat => {
        return currentChat.accountId === user.id && currentChat.groupId === props?.groupId 
      }) }
    }
  }, [])

  useEffect(() => {
    console.log('view- current chat', chat);
    
  }, [chat])

  // useEffect(() => {
  //   (async function searchChatDirectByMemberId () {
  //     if (props.chatId || chat ) return // caso exista não roda a função
  //     console.log('está aqui...');
  //     try {
  //       dispatch({ type: 'REQUEST_ADD_CHAT', payload: { //direct
  //         chat: { 
  //           accountId: user.id,
  //           directId: props.contact.userId,
  //           name: props.contact.username,
  //           about: props.contact.about,
  //         }
  //        } 
  //       })

  //     } catch(err) {
  //       console.log(err)
  //     }
  //   })()
  // }, [chat])

  
  async function createChatDirectIfNotExist (writeMessage) {
    try {
      if (props.socket) {

        const writeChat = {
          accountId: user.id,
          directId: props.contact?.userId,
          name: props.contact?.username,
          about: props.contact?.about,
        }

        dispatch({ type: 'REQUEST_ADD_CHAT', payload: { 
          user,
          sendTo: { userId: props.contact?.userId },
          chat: writeChat,
          message: {...writeMessage, directId: writeChat.directId },
          socket: props.socket ,
         } 
        })
      }
      

    } catch (err) {
      console.log(err, ' ,_dd');
    }
  }

  async function sendMessage(writeMessage) {
    if(!chat) return await createChatDirectIfNotExist(writeMessage) // caso não exista ele cria antes

    if(props.socket) dispatch({ type: 'REQUEST_ADD_MESSAGE', payload: { 
      message: {  ...writeMessage, directId: chat?.directId }, self: true, socket: props.socket } 
    })
  }

  return { chat, sendMessage }
}