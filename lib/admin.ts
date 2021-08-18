// Initializes the Firebase Admin SDK with credentials from environment

import admin from 'firebase-admin'
import cliConfig from '@/firebase.json'

/**
 * Set environment variables to enable emulator in development
 * See https://firebase.google.com/docs/emulator-suite/connect_auth#admin_sdks
 */
if (process.env.VERCEL_ENV === 'development') {
  process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:' + cliConfig.emulators.auth.port
  process.env.FIREBASE_DATABASE_EMULATOR_HOST = 'localhost:' + cliConfig.emulators.database.port
}

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
})

export default admin
