import { supabase } from 'app/utils/supabase'
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '' : '',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getAccessToken = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return session?.access_token
}

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken()
    console.log('🔔 AxiosInstance token', token)
    if (token) {
      config.headers.authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

export default axiosInstance
