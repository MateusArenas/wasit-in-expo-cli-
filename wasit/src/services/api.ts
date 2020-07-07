import axios from 'axios'
import { apiConfig } from '../config/server'

const api = axios.create(apiConfig)

export default api
