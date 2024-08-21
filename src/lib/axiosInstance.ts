import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
})

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = null

    if (token) {
      if (config.headers) config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default axiosInstance
