import React, { useEffect, useState, useCallback, memo, useRef } from 'react'
import { useNavigation, useScrollToTop } from '@react-navigation/native';
import { FlatList, TouchableHighlight, Text, ActivityIndicator, RefreshControl, ViewStyle, TextStyle, Animated } from 'react-native';
import { Container, ItemContainer, ItemName, ItemPhone, ItemProfile, Loading, PullToRefreshContainer } from './styles';
// import api from '../../services/api';
// import ContactModel from '../../models/contact'
import PullToRefreshHeader from '../../components/PullToRefreshHeader'
import { MaterialIcons } from '@expo/vector-icons'; 
import useContacts from '../../hooks/useContacts';

const Contacts: React.FC = () => {
  const navigation = useNavigation()
  const { page, contacts, loadPage, loading, refreshList, refreshing } = useContacts(120)

  // useScrollToTop(ref)  

  function handleOpenContactChat(contact: any) {
    try {
        // const localContact = await ContactModel.findPhone(phone)
        // if (localContact) {
          navigation.navigate('Chat', { contact, isGroup: false })
        // } else {
        //   const { data: { value: [contact] } } = await api.get('/users', { params: { phone } })
        //   navigation.navigate('Chat', { contact })
        // }
      } catch (err) {
        console.log(err)
      }
  }
  
  

  return (
    <Container>
    {/* <TouchableHighlight 
      // onPress={() => { navigation.navigate('NewGroup') }}
    >
      <Text>Criar Grupo</Text>
    </TouchableHighlight> */}
    <PullToRefreshContainer
      HeaderComponent={PullToRefreshHeader}
      headerHeight={100}
      refreshTriggerHeight={80}
      refreshingHoldHeight={100}
      refreshing={refreshing}
      onRefresh={refreshList}
      style={{ flex: 1 }}
      topPullThreshold={2}
      
    >
      <FlatList
        // ref={ref}
        data={contacts}  
        onEndReached={() => loadPage(page, false)}
        onEndReachedThreshold={0.6}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 10 }}
        renderItem={({ item }) => (
            <TouchableHighlight
            onPress={() => handleOpenContactChat(item)}
            >
            <ItemContainer>
              <ItemProfile >
                <MaterialIcons name="account-circle" size={50} color="lightgray" />
              </ItemProfile>
              <ItemName>{item.username}</ItemName>
              <ItemName>{item.phone}</ItemName>
              {/* {item.phoneNumbers.map((phone, key) => <ItemPhone key={key}>{phone.number}</ItemPhone>)} */}
            </ItemContainer>
          </TouchableHighlight>
        )}
        keyExtractor={(item) => String(item.id)}
        ListFooterComponent={loading && <Loading />}
        // onRefresh={refreshList}
        // refreshing={refreshing}
        // refreshControl={<RefreshControl
        //   tintColor="#065fd4"
        //   colors={['#065fd4','#2c72ce']}
        //   progressBackgroundColor='#f9f9f9'
        //   refreshing={refreshing}
        //   onRefresh={refreshList}
        // />}
        // ListHeaderComponent={refreshing && <Loading />}
        initialNumToRender={4}
      />
    </PullToRefreshContainer>
  </Container>
  )
}


/**
 * custom header component for pull to refresh
 */





export default Contacts