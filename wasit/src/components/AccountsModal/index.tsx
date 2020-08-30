import React, { useState, useContext, useEffect, useCallback } from 'react'
import { Modalize } from 'react-native-modalize';
import { 
  Container, 
  InnerContainer, 
  AccountContainer,
  AccountPhoto,
  AccountUsername,
  AccountContentContainer,
  FooterAccountContainer,
  AddAccountIconContainer,
} from './styles'
import AuthContext from '../../contexts/auth';
import { useNavigation } from '@react-navigation/native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Image } from 'react-native';

const RenderItem: React.FC = (props: any) => {
  const { signedAccount, username, id} = props.item as any

  return (
    <AccountContainer onPress={() => props.onPress(id)}>
      <> 
        <AccountPhoto >
          <Image style={{height: 60, width: 60, borderRadius: 60}}
          source={{ uri: "https://instagram.fcgh27-1.fna.fbcdn.net/v/t51.2885-19/s150x150/105372639_322220025438185_8802608788025483050_n.jpg?_nc_ht=instagram.fcgh27-1.fna.fbcdn.net&_nc_ohc=6aLmOIchALYAX-uaGcG&oh=d23c0fed7e6023a9a45922966ca4441c&oe=5F2FD220"}}/>
          {/* <MaterialIcons name="account-circle" size={60} color="lightgray" /> */}
        </AccountPhoto>
          <AccountContentContainer>
            <AccountUsername>{username}</AccountUsername>
          </AccountContentContainer>
          {/* ios-arrow-dropright-circle */}
          {!!signedAccount && <Ionicons name="ios-arrow-dropright-circle" size={36} color="gray" />}
          {!signedAccount && <FontAwesome name="circle-thin" size={32} color="gray" />}
      </>
    </AccountContainer>
  )
}

interface AccountsModalPropsI {
  modalizeRef: any
}

const AccountsModal: React.FC<AccountsModalPropsI> = (props: any) => {
  const [accounts, setAccounts] = useState()
  const { user, getAllAccounts, signInSwap, loading } = useContext(AuthContext)
  const navigation = useNavigation()

  useEffect(() => {
    if (!loading && user) { // espera terminar o load de criação da conta anteriormente
      (async () => {
        const localAccounts = await getAllAccounts(0, 10)
        
        setAccounts(localAccounts)
      })()
    }
  }, [loading, user])

  const handleAccount = useCallback(function (id: number) {
    if(id != user.id) {
      signInSwap(id)
    } else {
      navigation.navigate('Profile', { user })
    }
  }, [])

  return (
    <Modalize 
      ref={props.modalizeRef}
      modalStyle={{
        borderTopRightRadius: 4,
        borderTopLeftRadius: 4
      }}
      handleStyle={{
        backgroundColor: "#F6F6F6",
        borderRadius: 1,
        height: 4
      }}
      adjustToContentHeight={true}
      flatListProps={{
        data: accounts,
        renderItem: props => <RenderItem {...props} onPress={handleAccount} signedId={user.id} />,
        keyExtractor: item => item.id,
        showsVerticalScrollIndicator: false,
      }}
      FooterComponent={ props => <FoooterModal {...props} navigation={navigation} />}
    ></Modalize>
  )
}

const FoooterModal: React.FC<any> = (props) => {
  return (
    <FooterAccountContainer>
      <TouchableHighlight
        onPress={() => props.navigation.navigate('AuthRoutes')}
      >
        <AddAccountIconContainer >
           <Ionicons name="ios-add" size={32} color="black" />
        </AddAccountIconContainer>
      </TouchableHighlight>
    </FooterAccountContainer>
  )
}

export default AccountsModal
