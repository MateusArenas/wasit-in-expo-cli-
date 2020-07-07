import React, { useEffect, useState, useCallback, memo, useRef } from 'react'

import * as ExpoContacts from 'expo-contacts';
import api from '../services/api';
import ContactModel from '../models/contact'

interface useContactsI {
  contacts: Array<any>
  page: number
  loading: boolean
  refreshing: boolean
  refreshList(): Promise<void> 
  loadPage(pageNumber: number, shouldRefresh: boolean): Promise<void>
}

export default function useContacts(pageSize: number = 12) {
  const [status, setStatus] = useState('')
  const [contacts, setContacts] = useState([])
  const [page, setPage] = useState(0)
  const [nextPage, setNextPage] = useState(true)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    if (status === 'granted') loadPage()
  }, [status])

  useEffect(() => {
    (async () => {
      const { status } = await ExpoContacts.requestPermissionsAsync();
      setStatus(status)
    })();
  }, []);

  async function refreshList () {
    setRefreshing(true)
    await loadPage(1, true)
    setRefreshing(false)
  }

  const loadPage = useCallback(async function (pageNumber = page, shouldRefresh = false) {
    if (status === 'granted' && nextPage) {
        setLoading(true)
        const { data, hasNextPage } = await ExpoContacts.getContactsAsync({
          pageSize,// 10 por pagina
          pageOffset: pageSize * pageNumber, // init (10 * 0) second state (10 * 1)....
          fields: [
            ExpoContacts.Fields.Name,
            ExpoContacts.Fields.PhoneNumbers,
            ExpoContacts.Fields.ID,
          ]
        });

        if (data.length > 0) {
          const phones = data.map(contact => contact.phoneNumbers).flat().map(phoneNumber => phoneNumber.number)
          try {
  
            const { data : { value : apiData }} = await api.get('/users', { params: { phones } })

            const contactSchemas = apiData.map(currentUser => {
              if (!currentUser) return null
              return { 
                userId: currentUser.id,
                name: currentUser.name,
                username: currentUser.username,
                bio: currentUser.bio,
                phone: currentUser.phone
              }
            })
            
            try {
              const localContacts = await ContactModel.bulkCreate(contactSchemas)
              setContacts(shouldRefresh ? localContacts : [...contacts, ...localContacts])
              setPage(pageNumber + 1)
              setNextPage(hasNextPage)
              setLoading(false)
            } catch (err) {
              console.log('não foi possivel quardar no banco local.')
              setContacts(shouldRefresh ? contactSchemas : [...contacts, ...contactSchemas])
              setPage(pageNumber + 1)
              setNextPage(hasNextPage)
              setLoading(false)
            }
          
          } catch (err) {
            if (!err.response) { // network error
              const localData = await ContactModel.findPhones(phones)
              setContacts(shouldRefresh ? localData : [...contacts, ...localData])
              setPage(pageNumber + 1)
              setNextPage(hasNextPage)
              setLoading(false)
            } else { // http status code
              setPage(pageNumber + 1)
              setNextPage(hasNextPage)
              setLoading(false)
            }
          }
        }
      }
  }, [contacts, nextPage, page, status])


  return { page, contacts, refreshList, loadPage, loading, refreshing } as useContactsI
}