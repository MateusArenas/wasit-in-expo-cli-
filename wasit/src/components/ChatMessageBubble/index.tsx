import React, { useEffect, useState, memo } from 'react';

import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import { BubbleContainer,LineContainer,BubbleText } from './styles'

interface MessageBubblePropsI {
  data: {
    self?: boolean
    content?: string
    date?: string
    formatedDate?: number
  }
}
const MessageBubble : React.FC<MessageBubblePropsI> = (props) => {

  return (
      <LineContainer self={props.data.self} >
          <BubbleContainer self={props.data.self} >
            <BubbleText>{props.data.content}</BubbleText>
            <BubbleText>{props.data.formatedDate}</BubbleText>
          </BubbleContainer>
        </LineContainer>
    );
}

export default memo(MessageBubble)