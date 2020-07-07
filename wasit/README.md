import React, { useEffect, useCallback, useState } from 'react';
import { View, Text, FlatList, TouchableHighlight, StatusBar } from 'react-native';
import * as Contacts from 'expo-contacts';

import { Container } from './styles'

export default function App() {
  const [status, setStatus] = useState('')
  const [contacts, setContacts] = useState([])
  const [page, setPage] = useState(0)
  const [nextPage, setNextPage] = useState(true)
  const pageSize = 2
  
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      setStatus(status)
    })();
  }, []);
  
  useEffect(() => {
    if (status === 'granted') loadPage()
  }, [status, loadPage])
  
  const loadPage = useCallback(async function (pageNumber = page) {
    if (status === 'granted' && nextPage) {
        const { data, hasNextPage } = await Contacts.getContactsAsync({
          pageSize,// 10 por pagina
          pageOffset: pageSize * pageNumber, // init (10 * 0) second state (10 * 1)....
          fields: [Contacts.Fields.Name],
        });

        if (data.length > 0) {
          console.log(data);
          setContacts([...contacts, ...data])
          setPage(pageNumber + 1)
          setNextPage(hasNextPage)
        }
      }
  }, [contacts, nextPage, page, status])
  

  return (
    <>
    <StatusBar />
    <Container>
      <FlatList 
        style={{ flex: 1}}
        data={contacts}  
        onEndReached={() => loadPage()}
        onEndReachedThreshold={0.1}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (<View style={{ padding: 100, backgroundColor: 'white'}}><Text>{item.name}</Text></View>)}
      />
    </Container>
    </>
  );
}
