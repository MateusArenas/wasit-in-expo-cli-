import styled from 'styled-components/native';
import { HeaderTitle as NavigationHeaderTitle } from '@react-navigation/stack'

export const Container = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const RightContainer = styled.View`
  display: flex;
  flex-direction: row;
  /* justify-content: center; */
  align-items: center;
`;

export const LeftTitleContainer = styled.View`
  display: flex;
  flex-direction: row;
  /* justify-content: center; */
  align-items: center;
`;

export const AppTitle = styled(NavigationHeaderTitle)`
  margin-right: 5px;
  font-size: 16px;
  font-family: monospace;
  letter-spacing: 2px;
  font-weight: 700;
  color: black;
`;

export const HeaderTitle = styled(NavigationHeaderTitle)`
  margin-right: 10px;
  font-size: 16px;
  color: black;
`;
