import React, { createContext, useState, useEffect } from 'react'
import api from '../services/api'
import AccountModel from '../models/account'

interface AuthContextData {
  signed: boolean
  user: any | null
  error: any | null
  loading: boolean
  signUp(username: string, phone: string, password: string): Promise<void>
  signIn(username: string, password: string): Promise<void>
  signInSwap(userId: number): Promise<void>
  signOut(): Promise<void>
  getAllAccounts(skip: number, top: number): Promise<any>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<any | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<any | null>(null)

  useEffect(() => {
    (async function fake () {
      try {
        await api.post('/users', {
          username: 'arenas_venicio',
          phone: '983178590',
          password: 'mateus'
        }, { responseType: 'json'})

        await api.post('/users', {
          username: 'arenas_math' ,
          phone: '+55 11 94817-7931',
          password: 'mateus'
        }, { responseType: 'json'})
      } catch (err) {
        console.log(err);
      }
    })()
  }, [])

  useEffect(() => {// SET API CREDENTIALS
    if(user) api.defaults.headers.Authorization = `Bearer ${user.token}`
    else api.defaults.headers.Authorization = null
  }, [user])

  useEffect(() => { // LOAD ACCOUNT SIGNED IN COMPONENT START APPLICATION
    (async function loadSignedAccount () {
      try { 
        setLoading(true)
        const accountSigned = await AccountModel.findSigned()
        console.log('conta logada -> ', accountSigned);
        setUser(accountSigned)
      } catch (err) {
        console.log(err)
      }
      setLoading(false)
    })()
  }, [])

//SELECT * FROM x ORDER BY timestamp DESC LIMIT 1;
  async function SaveAccount (userData: any) {
    try {
      const data = {
        id: userData.id,
        name: userData.name,
        username: userData.username,
        phone: userData.phone,
        password: userData.password,
        token: userData.token,
        signedAccount: 1,
        lastSigned: new Date().toISOString()
      }
      setUser(data) //seta antes de salvar para ganho de desempenho
      await AccountModel.createAndSigned(data)
      
    } catch (err) { // local storage
      console.log(err)
    }
  }

  async function signInSwap (userId: number) { //trocar de login
    try {
      setLoading(true)
      const userSelected = await AccountModel.findByUserIdAndSigned(userId) as any
      setUser(userSelected)
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  async function signIn (username: string, password: string) {
    try {
      setLoading(true)
      const { data: { token, value: data } } = await api.post('/sessions', {
        username,
        password
      }, { responseType: 'json' })

      await SaveAccount({...data, password, token})
      
      setError(null)
      setLoading(false)
    } catch (err) {
      if (!err.response) { // network error
        setError({ ...error, network: 'Não ha conexão com a internet.' })
        setLoading(false)
        return Promise.reject(err) // cai no cath
      } else { // http status code 
        setError({ ...error, default: 'O seu email e ou senha estão incorretos.' })
        setLoading(false)
        return Promise.reject(err)
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

      await SaveAccount({...data, password, token})

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
    try {
      if(user) await AccountModel.delete(user.id)
      setUser(null)
    } catch (err) {
      if (err.storage) {// erro no local storage
        console.log(err)
      }
    }
  }

  async function getAllAccounts(skip: number, top: number) {
    return await AccountModel.findAllOrderByLastSigned(skip, top)
  }

  return (
    <AuthContext.Provider value={{ 
        signUp, signIn, signInSwap, signOut, 
        getAllAccounts,
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
