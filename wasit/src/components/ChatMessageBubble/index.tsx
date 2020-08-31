import React, { useEffect, useState, memo, useContext } from 'react';

import { createDateFormat } from '../../utils/dateFormat'

import { BubbleContainer,LineContainer, BubbleContentText, BubbleDateText, ArrowContainer } from './styles'
import AuthContext from '../../contexts/auth';
import { View, StyleSheet } from 'react-native';
import { Svg, Path } from 'react-native-svg'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface MessageBubblePropsI {
  read?: boolean
  data: {
    userId?: number
    self?: boolean
    content?: string | any
    date?: string
    formatedDate?: number
    createdAt?: string
    readDate?: string
    receivedDate?: string
    messageId?: number
  }
}


const MessageBubble : React.FC<MessageBubblePropsI> = (props) => {
  const { data } = props
  const { user } = useContext(AuthContext)
  const self = user.id === data.userId
  
  const formatedDate = createDateFormat(props.data.createdAt)
  
  return (
      <LineContainer self={self} >
          <BubbleContainer self={self} style={styles.shadow}>
            <BubbleContentText 
              self={self}
            > {data.content}
            </BubbleContentText>
            {formatedDate && <BubbleDateText self={self}>
              {formatedDate + ' '}
              {
                !data.receivedDate ? <MaterialCommunityIcons name="check" size={14} color="#909090" />
                : self && <MaterialCommunityIcons name="check-all" size={14} color={ data.readDate ? "#4b9ed0" : "#909090" } />
              }
            </BubbleDateText> }
            <ArrowContainer 
              self={self}
            >
              <Svg 
                style={{ [self ? 'right' : 'left' ]: moderateScale(-6, 0.5) }} 
                width={moderateScale(15.5, 0.6)} 
                height={moderateScale(17.5, 0.6)} 
                viewBox="32.485 17.5 15.515 17.5"  
                enable-background="new 32.485 17.5 15.515 17.5"
              >
                    <Path
                        fill={self ? "#3c4950" : "#F6F6F6"}
                        d={
                          self ? "M48,35c-7-4-6-8.75-6-17.5C28,17.5,29,35,48,35z" 
                          : "M38.484,17.5c0,8.75,1,13.5-6,17.5C51.484,35,52.484,17.5,38.484,17.5z"
                        }
                        x="0"
                        y="0"
                    />
                </Svg>
            </ArrowContainer>
          </BubbleContainer>
        </LineContainer>
    );
}

const styles = StyleSheet.create({
  shadow: {
    shadowOffset: { width: 2, height: -4 },
    shadowColor: '#000',
    shadowOpacity: 0.2,
    elevation: 4,
    shadowRadius: 2,
  },
  item: {
      marginVertical: moderateScale(7, 2),
      flexDirection: 'row'
  },
  itemIn: {
      marginLeft: 20
  },
  itemOut: {
      alignSelf: 'flex-end',
      marginRight: 20
  },
  balloon: {
      maxWidth: moderateScale(250, 2),
      paddingHorizontal: moderateScale(10, 2),
      paddingTop: moderateScale(5, 2),
      paddingBottom: moderateScale(7, 2),
      borderRadius: 20,
  },
  }
)

export default memo(MessageBubble)