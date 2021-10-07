import useSWR from 'swr'

/**
 * @typedef {import('@/api/auth').AuthResponse} AuthResponse
 */

export default function useAuthApi() {
  /** @type {import("swr").SWRResponse<AuthResponse>} */
  const { data } = useSWR('/api/auth', { revalidateOnFocus: false })
  return data
}
