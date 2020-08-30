import styled from 'styled-components/native'
export { default as KeyboardSpacer } from 'react-native-keyboard-spacer';

export const Container = styled.KeyboardAvoidingView`
    flex: 1;
    background: #f6f6f6;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
`;

export const BackgroundContainerList = styled.FlatList`
  flex: 1;
  flex-grow: 1;
  /* margin-bottom: 5px; */
  position: relative;
`;
//https://i.pinimg.com/originals/fb/6c/53/fb6c53aa282debf76706c6576ff25df4.jpg