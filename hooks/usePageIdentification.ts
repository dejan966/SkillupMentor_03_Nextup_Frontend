import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

const onDefault = () => {
  document.title = 'Home'
  document.body.id = ''
}
const onHome = () => {
  document.title = 'Create Next App'
  document.body.id = 'home-page'
}
const onLogin = () => {
  document.title = 'Login'
  document.body.id = 'login-page'
}
const onSignup = () => {
  document.title = 'Signup'
  document.body.id = 'signup-page'
}

const callbacks: any = {
  '/': [onHome],
  '/login': [onLogin],
  '/signup': [onSignup],
  '*': [onDefault],
}

export const addPageIdentification = (_case: string, fn: () => void) => {
  callbacks[_case] = callbacks[_case] || []
  callbacks[_case].push(fn)
}

export const usePageIdentification = () => {
  const location = usePathname()

  const customSwitch = (value: string) => {
    if (callbacks[value]) {
      callbacks[value].forEach((fn: () => void) => {
        fn()
      })
    } else {
      onDefault()
    }
  }

  useEffect(() => {
    if (location) customSwitch(location)
  }, [location])
}
