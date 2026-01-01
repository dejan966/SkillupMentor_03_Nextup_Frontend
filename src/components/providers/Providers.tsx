import { AuthProvider } from './AuthProvider'
import QueryProvider from './QueryProvider'

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <QueryProvider>{children}</QueryProvider>
    </AuthProvider>
  )
}

export default Providers
