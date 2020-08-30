import styled from 'styled-components/native'

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: transparent;
`

export const InnerContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 100;
  background-color: red;
`

export const AccountContainer = styled.TouchableHighlight`
  padding: 20px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`

export const AccountPhoto = styled.View`
  width: 60px;  
  height: 60px;  
  border-radius: 30px;  
  background-color: #F6F6F6;
`

export const AccountContentContainer = styled.Text`
  display: flex;
  flex-grow: 1;
  align-items: flex-start;
  justify-content: center;
  padding: 10px;
`

export const AccountUsername = styled.Text`
  font-size: 16px;
  font-weight: 500;
`

export const FooterAccountContainer = styled.View`
  border: 1px solid rgba(0,0,0, .1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
`

export const AddAccountIconContainer = styled.View`
    width: 40px;  
    height: 40px;  
    border-radius: 6px;  
    border: 2px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
`