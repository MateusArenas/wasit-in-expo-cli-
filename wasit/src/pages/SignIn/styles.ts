import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #F5F5F5;
`as styled.View

export const Input = styled.TextInput`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid rgba(0,0,0,.1);
  background-color: #FFF;
  align-self: stretch;
  margin: 0px 30px 15px 30px;
  font-size: 14px;
`

export const ErrorMessage = styled.Text`
  text-align: center;
  color: #ce2029;
  font-size: 16px;
  margin: 0 20px 15px 20px;
`

export const Button = styled.TouchableHighlight`
  padding: 5px;
  border-radius: 5px;
  background-color: #ba4d4c;
  align-self: stretch;
  margin: 0px 30px 15px 30px;
  font-size: 14px;

`

export const ButtonText = styled.Text`
  color: #FFF;
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  padding: 10px;
`

export const SignUpLink = styled.TouchableHighlight`
  padding: 10px;
  margin-top: 20px;
`

export const SignUpLinkText = styled.Text`
  color: #999;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
`
