import { signInWithCustomToken } from '@firebase/auth'
import { useEffect, useState } from 'preact/hooks'
import useAuth from './useAuth'

/** @typedef {import("@firebase/auth").UserCredential} UserCredential */

/**
 * @param {?string} token
 */
export default function useCredential(token) {
  const auth = useAuth()
  /** @type {[?UserCredential, (credential: ?UserCredential) => void]} */
  const [credential, setCredential] = useState(null)
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
