import React, { useContext } from 'react';
import { FlatList } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

import { 
  Container,
  Image,
  ImageContainer,
  SectionContainer,
  SectionIconContainer,
  SectionIcon,
  SectionInfoContainer,
  SectionInfoDescribe,
  SectionInfoTitle,
  FooterContainer,
  FooterSignOutContainer,
  FooterSignOutText
} from './styles';
import { useRoute, useNavigation } from '@react-navigation/native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import AuthContext from '../../contexts/auth';

const ItemRender: React.FC<any> = ({ item }) => {
  const { title, describe, iconName, iconFrom } = item.field
  
  return (
    <SectionContainer>
      <SectionIconContainer>
        {iconFrom === "Ionicons" && <Ionicons name={iconName} size={24} color="black" />} 
        {iconFrom === "MaterialIcons" && <MaterialIcons name={iconName} size={24} color="black" />}
        {/* <SectionIcon/> */}
      </SectionIconContainer>
      <SectionInfoContainer>
        <SectionInfoTitle>{title}</SectionInfoTitle>
        <SectionInfoDescribe>{describe}</SectionInfoDescribe>
      </SectionInfoContainer>
      <MaterialIcons name="edit" size={18} color="black" />
    </SectionContainer>
  )
}

const Profile: React.FC = () => {
  const { params } = useRoute()
  const { user } = params as any
  const data = [
    { field: { title: 'username', describe: user.username, iconName: "ios-at", iconFrom: "Ionicons" } },
    { field: { title: 'name', describe: user.name, iconName: "account-box", iconFrom: "MaterialIcons" } },
    { field: { title: 'bio', describe: user.bio, iconName: "md-text", iconFrom: "Ionicons" } },
    { field: { title: 'phone', describe: user.phone, iconName: "local-phone", iconFrom: "MaterialIcons" } },
  ]

  return (
    <Container>
      <FlatList
        ListHeaderComponent={<ImageContainer><Image/></ImageContainer>}
        data={data}
        renderItem={ItemRender}
        keyExtractor={item => item.field.title}
        ListFooterComponent={ItemFooter}
      />
    </Container>
  )
}

const ItemFooter: React.FC = () => {
  const { signOut } = useContext(AuthContext)

  return (
    <FooterContainer>
      <FooterSignOutContainer>
        <TouchableHighlight
          onPress={signOut}
        >
          <FooterSignOutText>Sign Out</FooterSignOutText>
        </TouchableHighlight>
      </FooterSignOutContainer>
    </FooterContainer>
  )
}

export default Profile;