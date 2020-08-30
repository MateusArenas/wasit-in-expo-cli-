import React, { useEffect, useState, useCallback } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Routes from './routes'
import { AuthProvider } from './contexts/auth'
import sqliteorm from './services/sqliteorm'
import { Provider } from 'react-redux'
import store from './services/store'
// import { Container } from './styles';
// import createSequelize from './services/typeorm'

const MainApp: React.FC = () => {
  useEffect(() => {
    sqliteorm()
  }, [])
  
  return (
    <Provider store={store} >
      <NavigationContainer>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </NavigationContainer>
    </Provider>
  )
}

export default MainApp
