import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'

// import { Container } from './styles';

const AuthStack = createStackNavigator()

const AuthRoutes: React.FC = () => (
  <AuthStack.Navigator headerMode={'none'}>
    <AuthStack.Screen name="SignIn" component={SignIn}/>
    <AuthStack.Screen name="SignUp" component={SignUp}/>
  </AuthStack.Navigator>
)

export default AuthRoutes
