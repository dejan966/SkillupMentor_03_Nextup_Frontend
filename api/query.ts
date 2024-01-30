import { useQuery } from 'react-query'

export function query(key: any[], fN: any) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery(key, () => fN, { refetchOnWindowFocus: false })
}
