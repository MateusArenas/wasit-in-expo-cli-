import React, { useContext } from 'react'
import AuthRoutes from './auth.routes'
import AppRoutes from './app.routes'

import AuthContext from '../contexts/auth'
import Loading from '../pages/Loading'
// import { Container } from './styles';

const Routes: React.FC = () => {
  const { signed, loading } = useContext(AuthContext)

  if (loading) { // FAZ O LOADING
    return <Loading />
  }

  return signed ? <AppRoutes /> : <AuthRoutes />
}

export default Routes
