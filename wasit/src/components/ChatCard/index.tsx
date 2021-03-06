import React, { memo } from 'react';

import { 
  Container, 
  ChatImage, 
  ChatName, 
  ChatLastMessage, 
  ContentContainer, 
  ContentLine,
  LastMessageDate,
  NewsNumber
} from './styles';
import { createDateFormat } from '../../utils/dateFormat';
import { TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ChatCard: React.FC<any> = (props: any) => {
  const navigation = useNavigation()

  const formatedDate = createDateFormat(props?.chat?.lastMessage?.createdAt)

  function handleOpenChat (directId, groupId) {
      navigation.navigate('Chat', { directId, groupId })
  }

  return (
    <TouchableHighlight
    onPress={() => handleOpenChat(props?.chat.directId, props?.chat.groupId)}
    >
      <Container>
        <ChatImage />
        <ContentContainer>
          <ContentLine>
            <ChatName>{props?.chat?.name}</ChatName>
            <LastMessageDate>{formatedDate}</LastMessageDate>
          </ContentLine>
          <ContentLine>
            <ChatLastMessage>{props?.chat?.lastMessage?.content}</ChatLastMessage>
            <NewsNumber style={{textAlignVertical: 'center'}}>{2}</NewsNumber>
          </ContentLine>
        </ContentContainer>
      </Container>
    </TouchableHighlight>
  )
}

export default memo(ChatCard)