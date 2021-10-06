import { useEffect, useMemo, useState } from 'react'
import { getAuth, connectAuthEmulator } from '@firebase/auth'

import cliConfig from '@/firebase.json'
import useApp from './useApp'

export default function useAuth() {
  const app = useApp()
  const [auth] = useState(() => {
    const auth = getAuth(app)
    if (process.env.NODE_ENV === 'development') {
      connectAuthEmulator(auth, 'http://localhost:' + cliConfig.emulators.auth.port, { disableWarnings: true })
    }
    return auth
  })
  return auth
}
