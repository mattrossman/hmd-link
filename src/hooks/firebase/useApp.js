import { getApp, initializeApp } from '@firebase/app'
import { useState } from 'preact/hooks'

export default function useApp() {
  const [app] = useState(() => {
    try {
      return getApp()
    } catch (e) {
      if (process.env.PUBLIC_FIREBASE_CONFIG) {
        return initializeApp(JSON.parse(process.env.PUBLIC_FIREBASE_CONFIG))
      } else {
        throw new Error('Missing "PUBLIC_FIREBASE_CONFIG"')
      }
    }
  })
  return app
}
