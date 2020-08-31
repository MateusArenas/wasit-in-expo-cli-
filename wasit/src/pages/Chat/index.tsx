import React, { useEffect, useState, useCallback, useContext, useMemo, useRef } from 'react';
import { Container, BackgroundContainerList } from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import ChatSendBar from '../../components/ChatSendBar'
import Message from '../../models/chatMessage'
import AuthContext from '../../contexts/auth'
import MessageBubble from '../../components/ChatMessageBubble'
import { ImageBackground, ActivityIndicator } from 'react-native'
import useChat from '../../hooks/useChat';
import ChatHeader from '../../components/ChatHeader'
import { useSelector, useDispatch } from 'react-redux'
import { Loading } from '../Contacts/styles';

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

const Chat: React.FC<any> = (props: any) => {
  const { socket, pageSize } = props?.extraData
  const flatListRef = useRef(null)
  const { user } = useContext(AuthContext)
  const navigation = useNavigation()
  const { params } = useRoute()
  const { contact, directId, groupId } = params as any
  const { chat, sendMessage } = useChat({ contact, directId, groupId, socket })
  const [text, setText] = useState<string | null>(null)
  const [lastText, setLastText] = useState<string | null>(null)

  const dispatch = useDispatch()
  const [status, setStatus] = useState('')

  const { data: messages, type, self, loading, hasNextPage } = useSelector(({ messages }) => {
    return ({ 
      ...messages,
      data: messages?.data.filter(message => message?.directId === chat?.directId),
    })
  }, [chat])

  const [page, setPage] = useState(1)

useEffect(() => {
  navigation.setOptions(ChatHeader({ 
    name: chat ? chat.name : contact?.username,
    status,
    backTitle: '2'
  }))
}, [status])

useEffect(() => {
  if (chat && user && socket) {
    setPage(1) //reset value

    // socket.emit('online', { userId: contact.userId })

    // socket.on('userConnection', ({ connection }) => {
    //   setStatus(connection)
    // })

    return () => { // close chat 
      // socket.emit('offline', { userId: contact.userId })
      // socket.off('userConnection')
      // dispatch({ type: 'REQUEST_LOAD_MESSAGES', payload: { //limpa
      //   accountId: user.id, chatIds: [chat.chatId], pageSize, pageOffset: 0 } 
      // })
    }
  }
}, [user, socket, chat])

  async function handleSendMessage () {
    if(!text) return
    try {
      const writeMessage = { 
        directId: chat ? chat.directId : contact?.userId,
        groupId: chat?.groupId,
        chatId: chat?.id,
        userId: user.id,
        content: text,
        accountId: user?.id,
      }
      await sendMessage(writeMessage)
      if (messages.length) flatListRef.current.scrollToIndex({animated: true, index: 0, viewPosition: 100  })
    } catch (err) {
      console.log(err, ' ,_dd')
    }
    setLastText(text)
    setText(null)
  }

  const loadPage = useCallback(function (pageNumber = page, shouldRefresh = false) {
    console.log('in loadPage', hasNextPage);
    if (chat && hasNextPage) {
          
          dispatch({ type: 'REQUEST_LOAD_MESSAGES', payload: { 
            added: true,
            accountId: user.id, 
            orArray: [{ directId: chat.directId, groupId: chat.groupId }], 
            pageSize, 
            pageOffset: pageSize * pageNumber,
          } })

          setPage(pageNumber + 1)
        }
  }, [page, chat ])

  const onViewRef = React.useRef(({ viewableItems, changed }) => {
    if (Array.isArray(viewableItems)) viewableItems.forEach(({ item }) => {
      
      const self = user.id === item.userId
      if (socket && !self && !item.readDate) {

        socket.emit('watchMessage', { 
          directId: item.directId, 
          originId: item.originId, 
          readDate: new Date().toISOString()
        })
      }
    });
  })

  return (
    <Container style={{ backgroundColor: 'black'}}> 
      <ImageBackground
        style={{ flex: 1 }}
        source={{ uri: "https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png"}}
      >
        <BackgroundContainerList
          viewabilityConfig={{ 
              minimumViewTime: 1, //milissegundos
              // viewAreaCoveragePercentThreshold: 0, //porcentagem da viewport que deve ser cobeerta pelo item
              itemVisiblePercentThreshold: 5, //porcentagem do item vizivel
              // waitForInteraction: true,//somente quando a interções
            }
              //or
            //useRef(viewConfig).current
          }
          onViewableItemsChanged={onViewRef.current}
          ref={flatListRef}
          inverted
          data={messages}
          onEndReached={() => loadPage(page, false)}
          onEndReachedThreshold={.5}
          renderItem={renderItem}
          keyExtractor={item => String(item?.id)}
          initialNumToRender={pageSize}
          ListFooterComponent={type !== 'UPDATE' && type !== 'ADD' && loading && <Loading />}
          ListHeaderComponent={type === 'ADD' && loading && <MessageBubble data={{ 
            userId: self ? user.id : contact ? contact?.userId : chat?.directId,
            content: self ? lastText : '...',
            createdAt: new Date().toISOString()
          }} />}
          contentContainerStyle={{justifyContent: 'flex-end', flexGrow: 1,
            paddingHorizontal: 10, paddingVertical: 5, 
          }}
          ListFooterComponentStyle={{ justifyContent: 'center', display: 'flex' }}
        />
        <ChatSendBar 
          value={text} 
          onChangeText={setText} 
          onPress={useCallback(handleSendMessage, [text])} 
        />
      </ImageBackground>
    </Container>
  )
}

const renderItem = ({ item }) => <MessageBubble data={item} />

export default Chat;