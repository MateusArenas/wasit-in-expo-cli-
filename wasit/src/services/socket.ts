import SocketIOClient from 'socket.io-client'
import { socketConfig } from '../config/server'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// export default function createSocketClient (namespace: string, query: any) {
//   SocketIOClient.disconnect && SocketIOClient.disconnect()
//   return SocketIOClient(`${socketConfig.baseURL}${namespace}`, {
//     query
//   } as SocketIOClient.ConnectOpts)
// }

export default function io (query) { return SocketIOClient(socketConfig.baseURL, {
  query,//: {
    // "chatId": 1,
    // "chatType": "DIRECT",
    // "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTk0NDI5NDI0fQ.oiJPSztbe8Bhi_LLVhI7z1PAa4JeyudEHIiDmyy87JA",
  //},
  'reconnection': true,
  'reconnectionDelay': 500,
  'reconnectionAttempts': 10,
  forceNew: true,
  multiplex: false,
  'force new connection':true
})
}