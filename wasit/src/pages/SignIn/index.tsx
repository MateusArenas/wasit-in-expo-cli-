import React, { useContext, useState, useEffect } from 'react'
import AuthContext from '../../contexts/auth'
import api from '../../services/api'

import { Container, Input, Button, ButtonText } from './styles'
import { TouchableHighlight, Text, Keyboard } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const SignIn: React.FC = () => {
  const [username, setUsername] = useState('arenas_math')
  const [password, setPassword] = useState('mateus45781973')
  const { signed, signIn } = useContext(AuthContext)
  const navigation = useNavigation()

  async function login () {
    await signIn(username, password)
    Keyboard.dismiss()
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
