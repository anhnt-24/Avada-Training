import admin from 'firebase-admin'
import serviceAccount from '../../todokoajs-firebase-adminsdk-fbsvc-fd0d0e8b98.json' with { type: 'json' }

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()

export default db
