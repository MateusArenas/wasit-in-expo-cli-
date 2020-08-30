import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #f6f6f6;
`;

export const ImageContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
`
export const Image = styled.View`
  width: 120px;
  height: 120px;
  border-radius: 75px;
  background-color: lightgrey;
`
export const SectionContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
`
export const SectionIconContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
`
export const SectionIcon = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: lightsteelblue;
`
export const SectionInfoContainer = styled.View`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: flex-start;
  border-bottom-width: 1px;
  border-color: rgba(0,0,0, .2);
  padding: 10px;
  margin-left: 20px;
`
export const SectionInfoTitle = styled.Text`
  font-size: 12px;
  font-weight: 700;
  opacity: .5;
`
export const SectionInfoDescribe = styled.Text`
  font-size: 16px;
  font-weight: 500;
`

export const FooterContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
  padding: 20px;
  background-color: rgba(0,0,0, .05);
`
export const FooterSignOutContainer = styled.View`
  padding: 10px;
`
export const FooterSignOutText = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: red;
`