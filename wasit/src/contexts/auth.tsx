import React, { createContext, useState, useEffect } from 'react'
import api from '../services/api'
import Account from '../models/account'

interface AuthContextData {
  signed: boolean
  user: any | null
  error: any | null
  loading: boolean
  checkUsername(username: string, done: any,start: any): Promise<boolean>
  checkPhoneFake(phone: string, done: any,start: any): Promise<boolean>
  signUp(username: string, phone: string, password: string): Promise<void>
  signIn(username: string, password: string): Promise<void>
  signOut(): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

// eslint-disable-next-line react/prop-types
export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<any | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<any | null>(null)

  useEffect(() => {
    async function loadSignedAccount () {
      try { 

        const accountSigned = await Account.findSigned()
        
        setUser(accountSigned)
        
      } catch (err) {
        if (!err.response) { // network error
          // setError({ ...error, network: 'erro de conexão' })
        } else { // http status code
          // setError({ ...error, default: 'erro de conexão' })
        }
      }
    }

    loadSignedAccount()
  }, [])

  async function SaveAccount (account) {
    try {
      const data = {
        id: account.id,
        name: account.name,
        username: account.username,
        phone: account.phone,
        password: account.password,
        token: account.token,
        signedAccount: true,
        lastSigned: Date.now()
      }

      Account.create(data)
      setUser(data)
    } catch (err)   {
      console.log('err of all', err)
    }
  }

  async function signIn (username: string, password: string) {
    try {
      setLoading(true)
      const { data: { token, value: data } } = await api.post('/sessions', {
        username,
        password
      }, { responseType: 'json' })

      setUser(data)
      api.defaults.headers.Authorization = `Bearer ${token}`
      data.token = token
      data.password = password

      await SaveAccount(data)
      setError(null)
      setLoading(false)
    } catch (err) {
      if (!err.response) { // network error
        setError({ ...error, network: 'Não ha conexão com a internet.' })
        setLoading(false)
      } else { // http status code
        setError({ ...error, default: 'O seu email e ou senha estão incorretos.' })
        setLoading(false)
      }
    }
  }

  async function signUp (username: string, phone: string, password: string) {
    try {
      setLoading(true)
      const { data: { token, value: data } } = await api.post('/users', {
        username,
        phone,
        password
      }, { responseType: 'json'})
      setUser(data)
      api.defaults.headers.Authorization = `Bearer ${token}`
      data.token = token
      data.password = password

      await SaveAccount(data)
      setError(null)
      setLoading(false)
    } catch(err) {
      if (!err.response) { // network error
        setError({ ...error, network: 'Não ha conexão com a internet.' })
        setLoading(false)
      } else { // http status code
        setError({ ...error, default: 'Não foi possivel criar usuário.' })
        setLoading(false)
      }
    }
  }

  async function signOut () {
    const { id } = user as any
    await Account.delete(id)
    setUser(null)
  }

  async function checkPhoneFake(phone: string, done: any, start: any) {
    if (!phone) return false
    start()
    setLoading(true)
    setTimeout(() => {
      setError(null)
      setLoading(false)
      done(true)
    }, 1000);
    done(true)
  }

  async function checkUsername (username: string, done: any, start: any) {
    if (!username) return false
    start()
    setError(false)
    setLoading(true)
      try {
        await api.get('/users', { params: { username } })
        setError({ ...error, default: 'Já existe um usuário com esse nome de usuário.' })
        setLoading(false)
        done(false)
      } catch (err) {
        if (!err.response) { // network error
          setError({ ...error, network: 'Não ha conexão com a internet.' })
          setLoading(false)
          done(false)
        } else { // http status code
          setError(null)
          setLoading(false)
          done(true)
        }
      }
  }

  return (
    <AuthContext.Provider value={{ 
        signUp, 
        signIn, 
        signOut, 
        checkUsername,
        checkPhoneFake,
        loading, 
        signed: !!user, 
        user, 
        error 
      }}>
      {children}
    </AuthContext.Provider>
  )
}
export default AuthContext
