import React, { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';
import { HeaderBackButton, HeaderTitle } from '@react-navigation/stack';

import { 
  Container,
  TypeMessage,
  TypeContainer,
  ActionButton,
  SendTitle,
} from './styles';
import { Button, Platform, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome, Feather, MaterialCommunityIcons } from '@expo/vector-icons';


interface ChatSendBarPropsI {
  value: string
  onChangeText(text: string): void
  onPress(): void
}
const ChatSendBar: React.FC<ChatSendBarPropsI> = (props: ChatSendBarPropsI) => {

  const styles = StyleSheet.create({
    shadow: {
      shadowOffset: { width: 2, height: -4 },
      shadowColor: '#000',
      shadowOpacity: 0.2,
      elevation: 4,
      shadowRadius: 2,
    }
  });

  return (
    <Container >
        <HeaderBackButton
          onPress={props.onPress}
          backImage={() =>           
            <SendTitle >
              <Feather name="plus" size={32} color="#4b9ed0" />
            </SendTitle>
          }
        />
        <TypeContainer>
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
          <HeaderBackButton
            onPress={props.onPress}
            backImage={() => 
              <SendTitle >
                <MaterialCommunityIcons name="sticker-emoji" size={26} color="#4b9ed0" />
              </SendTitle>
            }
          />
        </TypeContainer>

        <HeaderBackButton
          onPress={props.onPress}
          backImage={() => 
            <SendTitle >
              { props.value ? <Ionicons name="ios-send" size={32} color="#4b9ed0" />
              : <MaterialCommunityIcons name="microphone" size={30} color="#4b9ed0" /> }
            </SendTitle>
          }
        />
      </Container>
  );
}

export default ChatSendBar