import React, { useContext, useState, useEffect } from 'react'
import AuthContext from '../../contexts/auth'
import api from '../../services/api'

import { Container, Input, Button, ButtonText } from './styles'
import { TouchableHighlight, Text, Keyboard } from 'react-native'
import { useNavigation, useRoute, useNavigationState } from '@react-navigation/native'

const SignIn: React.FC = () => {
  const [username, setUsername] = useState('arenas_math')
  const [password, setPassword] = useState('mateus')
  const { signed, signIn } = useContext(AuthContext)
  const navigation = useNavigation()
  const routeNames = useNavigationState(state => state.routeNames)

  async function login () {
    try {
      Keyboard.dismiss()
      await signIn(username, password)
      if (routeNames.includes('Main')) navigation.navigate('Main')
    } catch(err) {

    }
  }

  useEffect(() => {
    console.log('SIGN IN ');
    
  })

  return (
    <Container>
      <Input
        placeholder={'You username here...'}
        value={username}
        onChangeText={setUsername}
      />
      <Input
        placeholder={'You username here...'}
        value={password}
        onChangeText={setPassword}
      />
      <Button
        onPress={login}
      >
        <ButtonText>Sign In</ButtonText>
      </Button>
      <TouchableHighlight onPress={() => {
        navigation.navigate('SignUp')
      }}>
        <Text style={{ color: 'black' }}>Create Account</Text>
      </TouchableHighlight>
    </Container>
  )
}

export default SignIn
