import React, { useContext } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import AuthContext from '../../contexts/auth'

// import { Container } from './styles';

const Feed: React.FC = () => {
  const { signed, signIn, signOut } = useContext(AuthContext)
  

  return (
    <View>
      <TouchableHighlight
        onPress={signOut}
      >
        <Text>Feed</Text>
      </TouchableHighlight>
    </View>
  )
}

export default Feed
