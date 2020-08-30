import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import { View, TouchableHighlight } from 'react-native';

import { HeaderTitle, LeftTitleContainer, AppTitle, Container, RightContainer } from './styles';

const MainHeader = (props) => {
  
  return (
      <Container>
        <LeftTitleContainer>
          <AppTitle>WASIT</AppTitle>
        </LeftTitleContainer>
        <TouchableHighlight
          onPress={() => {
            props.openModal()
          }}
        >
          <RightContainer>
            <HeaderTitle {...props} >{props.children}</HeaderTitle>
            <Ionicons name="ios-arrow-down" size={18} color="black" />
          </RightContainer>
        </TouchableHighlight> 
      </Container>
  )
}

export default MainHeader;