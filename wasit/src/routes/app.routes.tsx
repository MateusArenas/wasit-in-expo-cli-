import React from 'react'
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack'
import MainRoutes from './main.routes'
import Chat from '../pages/Chat'
import NewGroup from '../pages/NewGroup'
import { TouchableHighlight } from 'react-native'
import { useScrollToTop } from '@react-navigation/native'

// import { Container } from './styles';

const AppStack = createStackNavigator()

const NewHeaderTitle = (props) => (
  <TouchableHighlight
    onPress={() => {}}
  >
    <HeaderTitle  {...props} />
  </TouchableHighlight> 
  )

const AppRoutes: React.FC = () => (
  <AppStack.Navigator headerMode={"screen"} screenOptions={{ headerTitle: NewHeaderTitle }}>
    <AppStack.Screen name="@arenas_math" component={MainRoutes}/>
    <AppStack.Screen name="Chat" component={Chat}/>
    <AppStack.Screen name="NewGroup" component={NewGroup}/>
  </AppStack.Navigator>
)

export default AppRoutes
