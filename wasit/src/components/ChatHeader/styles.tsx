import styled from 'styled-components'

export const BackTitle = styled.Text`
  text-align: center;
  color: #4b9ed0;
  font-size: 14px;
  font-weight: 700;
  margin-left: 5px;
`
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
  background-color: ${({ self }) => self ? '#363e47' : '#F6F6F6'};
`

export const BubbleContentText = styled.Text`
  color: ${({ self }) => self ? '#F6F6F6' : 'black'};
  font-size: 14px;
  padding: 2px 4px;
`

export const BubbleDateText = styled.Text`
  color: ${({ self }) => self ? '#F6F6F6' : 'black'};
  opacity: .6;
  font-size: 10px;
  padding: 4px;
  padding-left: 10px;
  padding-right: 5px;
  display: flex;
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