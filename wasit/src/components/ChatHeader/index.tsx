import React from 'react'
import { HeaderBackButton, HeaderTitle } from '@react-navigation/stack';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { Image, View, Text, ImageBackground } from 'react-native'
import { BackTitle } from './styles';

const ChatTitle: React.FC = (props: any) =>  {
  const { name, status } = props
  return (
    <View style={{ 
      display: 'flex', 
      justifyContent: "center", 
      alignItems: "center", 
      // flexDirection: "collunm" 
    }}>
      <HeaderTitle {...props} >
        {name} 
      </HeaderTitle>
      <Text style={{ color: '#4b9ed0', fontWeight: '700', fontSize: 12 }}>{status}</Text>
        {/* <Ionicons name="ios-arrow-down" size={16} color={'#4b9ed0'} />  */}
    </View >
  )
}

{/* <Ionicons name="ios-menu" size={24} color="black" /> */}

const ChatHeaderLeft: React.FC = (props: any) =>  {
  
  const { name, status, label: backTitle } = props
  return (
    <View
      style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}
    >
    <HeaderBackButton {...props} 
      // onPress={() => navigation.goBack()}
      backTitleVisible={true}
      backImage={({ tintColor }) => (
        <View
          style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
        >
          <Ionicons name="ios-arrow-back" size={28} color={'#4b9ed0'} />
          <BackTitle>{backTitle}</BackTitle>
        </View>
      )}
    />
      <Image style={{height: 38, width: 38, borderRadius: 30, borderWidth: 1, borderColor: 'rgba(0,0,0,.1)'}}
      source={{ uri: "https://instagram.fcgh27-1.fna.fbcdn.net/v/t51.2885-19/s150x150/117610668_960715697725440_1827531412615749991_n.jpg?_nc_ht=instagram.fcgh27-1.fna.fbcdn.net&_nc_ohc=AclWDemTDDkAX89_DC3&oh=d1b04178df4992b5e7c7f8c2597ee05c&oe=5F6C8651"}}
      />
    </View>
  )
}

export default ({ name, status, backTitle = '200' }) => ({
  headerBackTitle: backTitle,
  headerForceInset: { top: 'never', bottom: 'never' },
  headerTitleStyle: {
    fontSize: 16
  },
    headerStyle: {
      backgroundColor: '#F6F6F6',
      elevation: 0,       //remove shadow on Android
      shadowOpacity: 0,   //remove shadow on iOS
      borderBottomColor: 'rgba(0, 0, 0, .1)',
      borderBottomWidth: 1
    },  
    headerRightContainerStyle: {
      padding: 5,
    },
    headerLeftContainerStyle: {
      // marginLeft: 10,
      // padding: 10,
    },
    headerTitleAlign: "center",
    headerTitle:  props => <ChatTitle 
      {...props} 
      name={name} 
      status={status} 
    />,
    headerLeft: props =>  <ChatHeaderLeft {...props} />,
    headerRight: (props) => 
      <View
        style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
      >
        <HeaderBackButton {...props} 
        // onPress={() => navigation.goBack()}
          backImage={({ tintColor }) => 
            <Feather name="phone-forwarded" size={20} color="#4b9ed0" />
          }
        />
        <HeaderBackButton {...props} 
        // onPress={() => navigation.goBack()}
          backImage={({ tintColor }) => 
            <Ionicons name="ios-information-circle-outline" size={26} color={'#4b9ed0'} />
          }
        />
      </View>
})
