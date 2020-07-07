import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  background-color: white;
  padding: 5px;
`;

export const TypeMessage = styled.TextInput`
  flex: 1;
  border: 2px solid rgba(0,0,0,0.5);
  font-size: 16px;
  padding: 10px;
  border-radius: 2px;
  min-height: 30px;
  max-height: 120px;
`;

export const SendContainer = styled.View`
  justify-content: flex-end;
  align-items: center;
  margin-left: 5px;
`;

export const SendButton = styled.TouchableHighlight`
  justify-content: center;
  align-items: center;
  padding: 0 15px 0 15px;
  border-radius: 5px;
  background-color: rgba(255,255,255,0.05);
  border: 2px solid rgba(0,0,0,0.5);
  
`;

export const SendTitle = styled.Text`
  padding: 15px 10px 15px 10px;
  color: gray;
  /* color: ${({ active }) => active ? 'black' : 'gray'}; */
`;
