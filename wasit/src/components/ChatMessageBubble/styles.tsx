import styled from 'styled-components'

export const LineContainer = styled.SafeAreaView`
  display: flex;
  justify-content: space-between;
  flex-direction: ${ ({ self }) => self ? 'row-reverse' : 'row' };
`
export const BubbleContainer = styled.View.attrs({
  style: {
    shadowOffset: { width: 2, height: 2 },
    shadowColor: '#000',
    shadowOpacity: 0.2,
    elevation: 4,
    shadowRadius: 2,
  }
})`
  max-width: 75%;
  border-radius: 10px;
  margin-top: 8px;
  margin-right: 10px;
  margin-left: 10px;
  padding: 2px 2px;
  padding-bottom: 6px;
  flex-flow: row wrap;
  align-items: flex-end;
  justify-content: flex-end;
  background-color: ${({ self }) => self ? '#3c4950' : '#F6F6F6'}; 
`
//#363e47 original
//#4f585d
export const BubbleContentText = styled.Text`
  color: ${({ self }) => self ? '#F6F6F6' : 'black'};
  font-size: 14px;
  padding: 2px 4px;
`

export const BubbleDateText = styled.Text`
  color: ${({ self }) => self ? '#909090' : '#909090'};
  font-size: 12px;
  padding: 4px;
  padding-left: 10px;
  padding-right: 5px;
  display: flex;
  text-align: center;
`

export const ArrowContainer = styled.View`
  flex: 1;
  position: absolute;
  justify-content: flex-end;
  align-items: ${({ self }) => self ? 'flex-end' : 'flex-start'};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
`