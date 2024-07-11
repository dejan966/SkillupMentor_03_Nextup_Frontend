import { UserType } from '@/models/auth'
import { useEffect, useState } from 'react'
import { isServer } from './useServer'

const useLocalStorage = () => {
  const [user, setUser] = useState({} as UserType)

  const checkUser = (value: string) => {
    setUser(value ? JSON.parse(value) : ({} as UserType))
  }
  useEffect(() => {
    try {
      if (!isServer()) {
        const value = window.localStorage.getItem('user')
        checkUser(value!)
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  const setValue = (value: UserType) => {
    try {
      if (!isServer()) {
        window.localStorage.setItem('user', JSON.stringify(value))
        setUser(value)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const signout = () => {
    localStorage.clear()
    setUser({} as UserType)
  }

  return [user, setValue, signout] as const
}

export default useLocalStorage
