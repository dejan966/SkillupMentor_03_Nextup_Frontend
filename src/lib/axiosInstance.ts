import { SafeError } from '@/models/safeError'
import axios, { AxiosError, AxiosResponse } from 'axios'

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

export const apiRequest = async <D, R>(
  url: string,
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
  data?: D,
): Promise<R> => {
  try {
    const response: AxiosResponse<R> = await axiosInstance({
      method,
      url,
      data,
    })

    return response.data
  } catch (error: unknown) {
    throw getSafeError(error)
  }
}

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

export function getSafeError(error: unknown): SafeError {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<any>

    return {
      status: axiosError.response?.status,
      message:
        axiosError.response?.data?.message ||
        axiosError.message ||
        'Request failed',
      data: axiosError.response?.data,
    }
  }

  // Native Error
  if (error instanceof Error) {
    return {
      message: error.message,
    }
  }

  // String thrown
  if (typeof error === 'string') {
    return {
      message: error,
    }
  }

  // Fallback
  return {
    message: 'An unexpected error occurred',
  }
}

export default axiosInstance
