import React, { useEffect, useState, useCallback } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Routes from './routes'
import { AuthProvider } from './contexts/auth'
import sqliteorm from './services/sqliteorm'
// import { Container } from './styles';
// import createSequelize from './services/typeorm'

const MainApp: React.FC = () => {
  useEffect(() => {
    sqliteorm()
  }, [])
  
  return (
    <NavigationContainer>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  )
}

export default MainApp
