import React, { useEffect, useState, useCallback, useContext } from 'react';

import { Container, KeyboardSpacer, BackgroundContainerList } from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import ChatSendBar from '../../components/ChatSendBar'
import Message from '../../models/message'
import AuthContext from '../../contexts/auth'
import MessageBubble from '../../components/ChatMessageBubble'
import api from '../../services/api';
import { createDateFormat  } from '../../utils/dateFormat'
import ChatMessageModel from '../../models/message'

interface chatI {
  name: string
  about: string
  group: boolean
  chatMemberUserIds: Array<number>
  messageContent: string
}

interface messageI {
  chatId: number
  userId: number
  content: string
}

const Chat: React.FC = () => {
  const navigation = useNavigation()
  const [chat, setChat] = useState<any | null>(null)
  const { params } = useRoute()
  const { contact, isGroup, currentChat } = params as any
  const [text, setText] = useState<string | null>(null)
  const [messages, setMessages] = useState<Array<any>>([])
  const { user } = useContext(AuthContext)

  useEffect(() => {
    (async () => {   
      if (chat) {
        await loadChatMessages()
        navigation.setOptions({ headerTitle: chat.name })
        console.log(chat);   
      } else {
        if (currentChat) setChat(currentChat)
      }
    })()
  }, [chat])

  useEffect(() => {
    (async () => {
      if (!currentChat) {
        if (!isGroup) {
          await searchChatDirectByMemberId()
        } else {
  
        }
      }
    })()
  }, [])

  async function searchChatDirectByMemberId() {
    try {
      const { data: { value: [data] } } = await api.get('/chats', { params: { 
        chatMemberUserIds: [contact.userId, user.id],
        group: false  
      } })
      setChat(data)
    } catch(err) {
      if (!err.response) { // network error
        // procurar no db local
        console.log(err);
        
      } else { // http status code
        // não existe
        console.log(err);

      }
    }
  }

  async function createChatDirectIfNotExist (writeMessage) {
    try {
      const { data: { value: [data] } } = await api.post('/chats', {
        group: false,
        name: contact.username,
        about: contact.name,
        chatMemberUserIds: [contact.userId],
        messageContent: writeMessage.content
      }, { responseType: 'json' })
      setChat(data)
    } catch (err) {
      if (!err.response) { // network error
        // console.log(err, ' ,_dd');
        //... não tem jeito
      } else { // http status code
        // a algo de errado...
        console.log(err, ' ,_dd');
      }
    }
  }

  async function handleSendMessage () {
    if(!text) return
    const writeMessage = { 
      chatId: chat?.id,
      userId: user.id,
      content: text,
      self: true,
      formatedDate: createDateFormat(Date.now())
    }
    await saveMessage(writeMessage)
    setText(null)
  }

  async function saveMessage (writeMessage: any) {
    delete writeMessage.self
    delete writeMessage.formatedDate
    try {
      if(!chat) {
        if (!isGroup) await createChatDirectIfNotExist(writeMessage)
      } else {
        writeMessage.chatId = chat?.id
        const localMessage = await Message.create(writeMessage) 
        if (!messages) setMessages([localMessage])
        else setMessages([...messages, localMessage])
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function loadChatMessages () {
    if (!chat) return
    try {
      const localMessages = await ChatMessageModel.findAllbyChatId(chat.id)
      if (localMessages) setMessages(localMessages)
    } catch (err) {
      console.log(err)      
    }
  }
  
  return (
    <Container > 
      <BackgroundContainerList
        data={messages}
        renderItem={({ item }) => ( <MessageBubble data={item}/>)}
        keyExtractor={item => String(item.id)}
      />
      <ChatSendBar 
        value={text} 
        onChangeText={useCallback(setText, [text])} 
        onPress={useCallback(handleSendMessage, [text])} 
      />
    </Container>
  )
}

export default Chat;