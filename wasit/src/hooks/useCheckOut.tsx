import { useState } from "react"
import api from "../services/api"


interface useCheckOutData {
  error: any | null
  loading: boolean
  checkUsername(username: string, done: any,start: any): Promise<boolean>
  checkPhoneFake(phone: string, done: any,start: any): Promise<boolean>
}

export default function useCheckOut () {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<any | null>(null)

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

  return { checkUsername, checkPhoneFake, loading, error } as useCheckOutData
}