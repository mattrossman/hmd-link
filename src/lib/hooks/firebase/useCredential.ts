import { signInWithCustomToken } from '@firebase/auth'
import type { UserCredential } from '@firebase/auth'
import { useEffect, useState } from 'react'
import useAuth from './useAuth'

export default function useCredential(token?: string) {
  const auth = useAuth()
  const [credential, setCredential] = useState<UserCredential | null>(null)
  useEffect(() => {
    if (token) {
      try {
        signInWithCustomToken(auth, token).then((credential) => setCredential(credential))
      } catch (e) {
        console.error('Failed to sign in with custom token')
      }
    }
  }, [token])
  return credential
}
