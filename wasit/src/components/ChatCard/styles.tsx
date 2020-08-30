import styled from 'styled-components'

export const Container = styled.View`
  padding: 20px;
  margin-bottom: 5px;
  border: 1px dotted rgba(0,0,0,.05);
  border-top-width: 0px;
  background: white;
  align-items: center;

  display: flex;
  justify-content: space-between;
  flex-direction: ${ ({ self }) => self ? 'row-reverse' : 'row' };
`
export const ChatImage = styled.View`
  width: 50px;
  height: 50px;
  background: #F6F6F6;
  border-radius: 25px;
  margin-bottom: 5px;
  margin-right: 10px;
`
export const ContentContainer = styled.View`
  flex-grow: 1;
  /* background-color: red; */
  margin-bottom: 5px;
`

export const ContentLine = styled.View`
  flex: 1;
  /* background-color: gray; */
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  /* margin-bottom: 5px; */
`

export const LastMessageDate = styled.Text`
  font-size: 12px;
`

export const NewsNumber = styled.Text`
  text-align: center;
  width: 24px;
  height: 24px;
  border-radius: 30;
  font-size: 10px;
  font-weight: 700;
  background-color: blue;
  color: white;
`

export const ChatName = styled.Text`
  font-size: 18px;
  font-weight: 700;
`

export const ChatLastMessage = styled.Text`
  font-size: 16px;
  
`