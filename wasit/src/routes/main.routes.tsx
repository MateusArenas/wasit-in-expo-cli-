import React, { useEffect, useRef, useContext } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import Dashboard from '../pages/Dashboard'
import Feed from '../pages/Feed'
import Contacts from '../pages/Contacts'
import { useNavigation } from '@react-navigation/native'
import { TouchableHighlight } from 'react-native'
import AccountsModal from '../components/AccountsModal'
import { Modalize } from 'react-native-modalize'
import AuthContext from '../contexts/auth'

const Tab = createMaterialTopTabNavigator()
import MainHeader from '../components/MainHeader'


const MainRoutes: React.FC = () => {
  const modalizeRef = useRef<Modalize>(null);
  const { user, loading } = useContext(AuthContext)
  const navigation = useNavigation()

  const openModal = () => {
    modalizeRef.current?.open();
  };
  
  useEffect(() => { 
    if (!loading) {
      navigation.setOptions({
        headerStyle: {
          elevation: 0,       //remove shadow on Android
          shadowOpacity: 0,   //remove shadow on iOS
          backgroundColor: "white",
        },
        headerTitle: (props) => 
          <MainHeader {...props} 
            openModal={openModal} 
            children={user.username}
          />
      })
    }
  }, [loading, user])

  return (
    <>
    <Tab.Navigator tabBarOptions={{
      indicatorStyle: {
        backgroundColor: "black",
        borderRadius: 20
      },
      activeTintColor: 'black',
      labelStyle: { fontSize: 12, fontWeight: "bold" },
      // tabStyle: { width: 100 },
      style: { backgroundColor: '#F6F6F6' },
    }}>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Contacts" component={Contacts} />
    </Tab.Navigator>
    <AccountsModal 
      modalizeRef={modalizeRef}
    />
    </>
  )
}

export default MainRoutes
