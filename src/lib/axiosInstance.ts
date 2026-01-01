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

// Create a helper for server-side requests
export const createServerAxiosInstance = (cookieString?: string) => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
  })

  instance.interceptors.request.use(
    (config) => {
      if (cookieString && config.headers) {
        config.headers.Cookie = cookieString
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.resolve(error.response)
    },
  )

  return instance
}

export default axiosInstance
