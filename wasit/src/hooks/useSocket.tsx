import { useState, useContext } from "react"
import AuthContext from "../contexts/auth"
import SocketIOClient from 'socket.io-client'
import { socketConfig } from '../config/server'

export default function useSocket () {
  const [socket, setSocket] = useState(null)
  const { user } = useContext(AuthContext) 

  function setupSocket (query: any) {
    const token = `Bearer ${user.token}`
    if (user.token && !socket) {
      const newSocket = SocketIOClient(socketConfig.baseURL, {
        query: {
          // "chatId": 1,
          // "chatType": "DIRECT",
          ...query,
          token
        },
        reconnection: true, reconnectionDelay: 500, reconnectionAttempts: 10, 
        forceNew: true, multiplex: false, 'force new connection':true
      })

      newSocket.on('disconnect', () => {
        console.log('socket disconnect')
        setSocket(null)
        setTimeout(setupSocket, 3000);
      })

      newSocket.on('connect', () => {
        console.log('socket connect')
      })

      setSocket(newSocket)
    }
  }

  return { socket, setupSocket }
}