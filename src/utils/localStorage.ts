import { UserType } from '@/models/auth'

const user_prefix = 'user'

const userStorage = {
  getUser: () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      return JSON.parse(
        localStorage.getItem(`${user_prefix}`) as string,
      ) as UserType
    }
  },
  setUser: (user: UserType): void => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(`${user_prefix}`, JSON.stringify(user))
    }
  },
  clearUser: (): void => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.clear()
    }
  },
}

export { userStorage }
