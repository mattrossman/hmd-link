import { getApp, initializeApp } from '@firebase/app'
import { useState } from 'react'

export default function useApp() {
  const [app] = useState(() => {
    try {
      return getApp()
    } catch (e) {
      if (process.env.NEXT_PUBLIC_FIREBASE_CONFIG) {
        return initializeApp(JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG))
      } else {
        throw new Error('Missing "NEXT_PUBLIC_FIREBASE_CONFIG"')
      }
    }
  })
  return app
}
