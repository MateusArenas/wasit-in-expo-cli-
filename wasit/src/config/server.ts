import { AxiosRequestConfig } from 'axios'

export const apiConfig: AxiosRequestConfig = {
  // baseURL: 'http://10.0.2.2:3333/', // this is localhost
  // baseURL: 'http://localhost:3333/', // this is localhost
  baseURL: 'http://10.0.0.8:3333/', // this is localhost
  // baseURL: 'http://192.168.0.103:3333/', // this is localhost
  // validateStatus: function () { return true; }
  headers: {
    'Access-Control-Allow-Origin': '*',
    Connection: 'keep-alive'
  }
}