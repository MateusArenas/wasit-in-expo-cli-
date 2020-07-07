import React, { useContext, useState } from 'react'
import AuthContext from '../../contexts/auth'
import api from '../../services/api'

import { Container, Input, Button, ButtonText } from '../SignIn/styles'
import { Text, TouchableHighlight } from 'react-native'
// import { useNavigation } from '@react-navigation/native'

const SignUp: React.FC = () => {
  const [name, setName] = useState('Mateus')
  const [username, setUsername] = useState('arenas_math')
  const [phone, setPhone] = useState('551145781973')
  const [password, setPassword] = useState('mateus45781973')
  const { signed } = useContext(AuthContext)
  // const navigation = useNavigation()



  async function login () {
    try {
      const { data: { value: [user] } } = await api.post('/users', {
        name,
        phone,
        username,
        password
      }, { responseType: 'json' })

      console.log(user)

      // chamada a apiu
      // await SaveAccount(data)
    } catch (err) {
      console.log(err)
    }
  }

  console.log(signed)

  return (
    <Container>
      <Input
        placeholder={'You name here...'}
        value={name}
        onChangeText={setName}
      />
      <Input
        placeholder={'You username here...'}
        value={username}
        onChangeText={setUsername}
      />
      <Input
        placeholder={'You phone number here...'}
        value={phone}
        onChangeText={setPhone}
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
    </Container>
  )
}

export default SignUp
