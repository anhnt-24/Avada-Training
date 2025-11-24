import { Firestore } from '@google-cloud/firestore'
import { formatDateFields } from '@avada/firestore-utils'

const firestore = new Firestore()
const collection = firestore.collection('AnnouncementBars')

/**
 *
 * @param data
 * @returns {Promise<any>}
 */
export async function createAnnouncementBar (data) {
  const docRef = collection.doc()
  const id = docRef.id

  await docRef.set({
    id,
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  const doc = await docRef.get()
  return { id, ...formatDateFields(doc.data()) }
}

/**
 *
 * @param id
 * @param data
 * @returns {Promise<any>}
 */
export async function updateAnnouncementBar (id, data) {
  const docRef = collection.doc(id)
  await docRef.update({
    ...data,
    updatedAt: new Date()
  })
  const doc = await docRef.get()
  return { id: doc.id, ...formatDateFields(doc.data()) }
}

/**
 *
 * @param id
 * @returns {Promise<any|null>}
 */
export async function getAnnouncementBarById (id) {
  const docRef = collection.doc(id)
  const doc = await docRef.get()

  if (!doc.exists) return null

  return { id: doc.id, ...formatDateFields(doc.data()) }
}

/**
 *
 * @param shop
 * @returns {Promise<any[]|*[]>}
 */
export async function getAnnouncementBarsByShop (shop) {
  const snapshot = await collection.where('shopifyDomain', '==', shop).get()
  if (snapshot.empty) return []

  return snapshot.docs.map(doc => ({ id: doc.id, ...formatDateFields(doc.data()) }))
}

/**
 *
 * @param id
 * @returns {Promise<void>}
 */
export async function deleteAnnouncementBar (id) {
  await collection.doc(id).delete()
}

/**
 * Toggle isPublish
 * @param id
 * @returns {Promise<any>}
 */
export async function toggleIsPublished (id) {
  const docRef = collection.doc(id)
  const doc = await docRef.get()

  if (!doc.exists) throw new Error('AnnouncementBar not found')

  const current = doc.data()?.isPublished ?? false

  await docRef.update({
    isPublished: !current,
    updatedAt: new Date(),
  })

  const updatedDoc = await docRef.get()
  return { id: updatedDoc.id, ...formatDateFields(updatedDoc.data()) }
}

