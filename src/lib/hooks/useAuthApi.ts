import type { AuthResponse } from '@/pages/api/auth'
import useSWR from 'swr'

export default function useAuthApi() {
  const { data } = useSWR<AuthResponse>('/api/auth', { revalidateOnFocus: false })
  return data
}
