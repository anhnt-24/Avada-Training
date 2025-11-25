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
    createdAt: new Date(),
  })

  const snapshots = await collection
    .orderBy('createdAt', 'desc')
    .get()

  if (snapshots.size > 30) {
    const extra = snapshots.docs.slice(30)

    const batch = firestore.batch()
    extra.forEach((doc) => batch.delete(doc.ref))
    await batch.commit()
  }
  const snapshot = await docRef.get()
  return {
    id: snapshot.id,
    ...formatDateFields(snapshot.data()),
  }
}

/**
 *
 * @param notifications
 * @returns {Promise<Awaited<any>[]|*[]>}
 */
export async function createManyNotifications (notifications) {
  const batch = firestore.batch()
  const createdRefs = []

  try {
    notifications.forEach(item => {
      const ref = collection.doc()
      batch.set(ref, {
        ...item,
        createdAt: new Date()
      })
      createdRefs.push(ref)
    })

    await batch.commit()

    const createdData = await Promise.all(
      createdRefs.map(async (ref) => {
        const snapshot = await ref.get()
        return {
          id: snapshot.id,
          ...formatDateFields(snapshot.data())
        }
      })
    )

    return createdData
  } catch (error) {
    console.error('error:', error)
    return []
  }
}

/**
 *
 * @param ids
 * @returns {Promise<boolean>}
 */
export async function deleteManyNotifications (ids) {
  const batch = firestore.batch()

  try {
    ids.forEach(id => {
      const ref = collection.doc(id)
      batch.delete(ref)
    })

    await batch.commit()
    return true
  } catch (error) {
    console.error('deleteManyNotifications error:', error)
    return false
  }
}

/**
 *
 * @param shopifyDomain
 * @returns {Promise<boolean>}
 */
export async function deleteNotificationsByShop (shopifyDomain) {
  try {
    const snapshots = await collection
      .where('shopifyDomain', '==', shopifyDomain)
      .get()

    if (snapshots.empty) return true

    const batch = firestore.batch()
    snapshots.docs.forEach(doc => {
      batch.delete(doc.ref)
    })

    await batch.commit()
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}



