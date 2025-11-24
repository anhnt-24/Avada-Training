import { Firestore } from '@google-cloud/firestore'
import { formatDateFields } from '@avada/firestore-utils'

const firestore = new Firestore()
const collection = firestore.collection('Notifications')

/**
 *
 * @returns {Promise<any[]>}
 */
export async function getNotificationsByShop (shopifyDomain) {
  const snapshot = await collection.where('shopifyDomain', '==', shopifyDomain).get()
  return snapshot.docs.map(doc => ({ id: doc.id, ...formatDateFields(doc.data()) }))
}

/**
 *
 * @param data
 * @returns {Promise<any>}
 */
export async function createNotification (data) {
  const docRef = await collection.add({
    ...data,
    createdAt: new Date()
  })

  const snapshot = await docRef.get()
  return {
    id: snapshot.id,
    ...formatDateFields(snapshot.data())
  }
}

/**
 *
 * @param notifications
 * @returns {Promise<boolean>}
 */
export async function createManyNotifications (notifications) {
  const batch = firestore.batch()

  try {
    notifications.forEach(item => {
      const ref = collection.doc()
      batch.set(ref, {
        ...item,
        createdAt: new Date()
      })
    })

    await batch.commit()
    return true
  } catch (error) {
    return false
  }
}

