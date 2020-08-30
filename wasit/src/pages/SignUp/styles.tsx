import styled from 'styled-components/native'

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #f6f6f6;
`

export const Input = styled.TextInput.attrs({
  placeholderTextColor: "rgba(0,0,0,.5)"
})`
  width: 100%;
  padding: 10px;
  padding-right: 50px;
  border-radius: 5px;
  background-color: #FFF;
  align-self: stretch;
  font-size: 14px;
  border: 2px solid ${props => 
    props.sucesss ? "lightsteelblue" 
      : props.error ? "#ba4d4c" : "rgba(0,0,0,.1)"};
`

export const ErrorMessage = styled.Text`
  text-align: center;
  color: #ba4d4c;
  font-size: 10px;
  margin: 15px 15px;
  margin-top: 0;
  font-weight: bold;

`

export const Button = styled.TouchableHighlight.attrs({
  activeOpacity: 0.8,
  underlayColor: "rgba(0,0,0,0.8)"
})`
  border-radius: 5px;
  opacity: ${ props => props.disabled ? "0.4" : "1"};
  background-color: black;
  align-self: stretch;
  margin: 15px 0px;
  margin-top: 0;
  font-size: 14px;
  padding: 15px;
  margin-left: 30px;
  margin-right: 30px;
`

export const ButtonText = styled.Text`
  color: #FFF;
  font-weight: bold;
  font-size: 15px;
  text-align: center;
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

export const HeaderTitle = styled.Text`
  padding: 15px 50px;
  font-size: 26px;
  margin-bottom: 5px;
  text-align: center;
  font-weight: bold;
  background-color: #F5F5F5;
`

export const ActionInfoContainer = styled.View`
  width: 100%;
  padding: 10px;
  padding-bottom: 0;
  background-color: rgba(0,0,0,.05);
  margin-bottom: 10px;
`

export const InfoText = styled.Text`
  margin-bottom: 15px;
  font-size: 10px;
  opacity: 0.5;
  color: ${props => props.color ? props.color : 'black'};
  font-weight: 600;
  text-align: center;
  font-weight: 700;
`

export const Loading = styled.ActivityIndicator.attrs({
  size: 'small',
  // color: '#909090'
})`
  /* margin: 30px 0; */
  position: relative;
`

export const TabContainer = styled.View`
  margin-bottom: 10px;
  margin-top: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-left: 30px;
  padding-right: 30px;
  background-color: rgba(0,0,0, .03);
`
export const TabButton = styled.TouchableHighlight.attrs({
  activeOpacity: 0.6,
  underlayColor: "white"
})`
  opacity: ${ props => props.steps === props.stepName ? "1" : "0.4"};
  border-bottom-width: ${ props => props.steps === props.stepName ? "2" : "1"};
  padding: 15px;
  width: 50%;
  border-color: black;
`
export const TabText = styled.Text`
  text-align: center;
  color: black;
  font-weight: bold;
`

export const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 15px 0px;
  margin-top: 0;
  padding-left: 30px;
  padding-right: 30px;
`

export const InputCheckContainer = styled.View`
  margin-right: 30px;
  position: absolute;
  height: 100%;
  padding: 16px;
  right: 0;
`

export const InputCheckText = styled.Text`
  font-weight: bold;
  color: lightsteelblue;
`