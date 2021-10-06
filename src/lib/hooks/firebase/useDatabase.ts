import { getDatabase, connectDatabaseEmulator } from 'firebase/database'
import { useMemo } from 'react'
import useApp from './useApp'
import cliConfig from '@/firebase.json'

export default function useDatabase() {
  const app = useApp()
  const db = useMemo(() => {
    const db = getDatabase(app)
    if (process.env.NODE_ENV === 'development') {
      connectDatabaseEmulator(db, 'localhost', cliConfig.emulators.database.port)
    }
  }, [app])
  return db
}
