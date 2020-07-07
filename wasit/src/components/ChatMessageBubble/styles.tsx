import styled from 'styled-components'

export const LineContainer = styled.SafeAreaView`
  display: flex;
  justify-content: space-between;
  flex-direction: ${ ({ self }) => self ? 'row-reverse' : 'row' };
`
export const BubbleContainer = styled.View`
  border-radius: 5px;
  margin-top: 8px;
  margin-right: 10px;
  margin-left: 10px;
  padding: 5px 10px;
  flex-direction: row;
  background-color: ${({ self }) => self ? '#d5d8d4' : 'rgba(0,0,0,0.3)'};
`

export const BubbleText = styled.Text`
  color: black;
  font-size: 16px;
`