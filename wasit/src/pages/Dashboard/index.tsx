import React, { useEffect } from 'react'
import { View, Text } from 'react-native'

import ChatCard from '../../components/ChatCard'
import { Container } from './styles';
import { useDispatch, useSelector } from 'react-redux'

const Dashboard: React.FC = () => {
  const { data:chats, loading } = useSelector(({ chats, messages }) => {
    const data = chats?.data.map(chat => {
      const lastMessage = messages?.data.find(message =>
         message.directId === chat.directId && message.groupId === chat.groupId
      )
      return {...chat, lastMessage}
    })
    return { ...chats, data }
  }, [])

  useEffect(() => {
    
  }, [chats])

  return (
    <Container>
      {chats && chats?.map(chat => <ChatCard key={chat.id} chat={chat} />)}
      {/* <Text style={{ fontSize: 20, color: "black", fontWeight: "bold" }} >Dashboard</Text> */}
    </Container>
  )
}

export default Dashboard
