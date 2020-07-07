import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Username from './User'
import Password from './Password'
// import SignUp from '../pages/SignUp'

// import { Container } from './styles';

const SignUpStack = createStackNavigator()

const SignUpRoutes: React.FC = () => (
  <SignUpStack.Navigator headerMode={'none'}>
    <SignUpStack.Screen name="Username" component={Username}/>
    <SignUpStack.Screen name="Password" component={Password}/>
    {/* <SignUpStack.Screen name="SignUp" component={SignUp}/> */}
  </SignUpStack.Navigator>
)

export default SignUpRoutes
