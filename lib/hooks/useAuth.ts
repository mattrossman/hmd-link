import type { AuthResponse } from '@/pages/api/auth'
import useSWR from 'swr'

export default function useAuth() {
  const { data } = useSWR<AuthResponse>('/api/auth')
  return data
}
