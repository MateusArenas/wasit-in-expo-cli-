import styled from 'styled-components/native'
import PullToRefresh from 'react-native-pull-to-refresh-custom';


export const Container = styled.View`
  flex: 1;
  /* background: #f9f9f9; */
  background-color: #F6F6F6;
`

export const ItemContainer = styled.View`
  padding: 20px;
  margin-bottom: 5px;
  border: 1px dotted rgba(0,0,0,.05);
  border-top-width: 0px;
  background: white;
  align-items: center;
`

export const ItemName = styled.Text`
  font-size: 16px;
`

export const ItemPhone = styled.Text`
  font-size: 12px;
`
export const ItemProfile = styled.View`
  width: 50px;
  height: 50px;
  background: #F6F6F6;
  border-radius: 25px;
  margin-bottom: 5px;
`

export const Loading = styled.ActivityIndicator.attrs({
  size: 'large',
  // color: '#909090'
  color: '#4b9ed0'
})`
  margin: 15px 0;
`

export const PullToRefreshContainer = styled(PullToRefresh)`
  
`