import React, { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';

import { 
  Container,
  TypeMessage,
  SendContainer,
  SendButton,
  SendTitle,
} from './styles';
import { Button } from 'react-native';


interface ChatSendBarPropsI {
  value: string
  onChangeText(text: string): void
  onPress(): void
}
const ChatSendBar: React.FC<ChatSendBarPropsI> = (props: ChatSendBarPropsI) => {
  
  // const value = useMemo(() => props.value, [props.value])
  useEffect(() => {
    console.log('rerender-send-bar');
    
  }, [])

  return (
    <Container>
        <TypeMessage 
          // ref={inputRef}
          placeholder="Type a message..."
          value={props.value}
          // value={message.content && message.content}
          multiline={true}
          defaultHeight={30}
          autoCapitalize="none" 
          autoCorrect={true}
          // selectTextOnFocus={true}
          // onFocus={props.onFocus}
          // onContentSizeChange={onInputSizeChange}  
          onChangeText={props.onChangeText}
          // onContentSizeChange={({nativeEvent:{ contentSize: { width, height } }}) => console.log(width, height)}
        />
        <SendContainer>
          <SendButton 
            onPress={props.onPress}
          >
            <SendTitle >Send</SendTitle>
          </SendButton>
        </SendContainer>
      </Container>
  );
}

export default ChatSendBar