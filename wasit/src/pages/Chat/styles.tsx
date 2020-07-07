import styled from 'styled-components/native'
export { default as KeyboardSpacer } from 'react-native-keyboard-spacer';

export const Container = styled.KeyboardAvoidingView`
    flex: 1;
    background: lightgray;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
`;

export const BackgroundContainerList = styled.FlatList`
  flex: 1;
  flex-grow: 1;
  margin-bottom: 5px;
  position: relative;
  padding: 0px 10px;
`;