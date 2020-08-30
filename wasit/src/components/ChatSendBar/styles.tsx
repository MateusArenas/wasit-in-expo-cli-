import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  padding: 6px;
  background-color: #F6F6F6;
  border-top-color: rgba(0,0,0, .1);
  border-top-width: 1px;
`;

export const TypeMessage = styled.TextInput`
  /* flex: 1; */
  /* flex-grow: 1; */
  width: 80%;
  font-size: 16px;
  min-height: 30px;
  max-height: 120px;
`;

export const TypeContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  border: 1px solid rgba(0,0,0, .1);
  padding: 2px 15px;
  padding-bottom: 4px;
  padding-right: 6px;
  border-radius: 20px;
  background-color: white;
`;

export const ActionButton = styled.TouchableHighlight`
  justify-content: center;
  align-items: center;
  padding: 2px 10px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  /* background-color: steelblue; */
  /* border: 2px solid rgba(0,0,0,0.1); */
`;

export const SendTitle = styled.Text`
  /* padding: 10px; */
  color: gray;
  /* color: ${({ active }) => active ? 'black' : 'gray'}; */
`;
