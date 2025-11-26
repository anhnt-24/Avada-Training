import { Firestore } from '@google-cloud/firestore'
import { formatDateFields } from '@avada/firestore-utils'

const firestore = new Firestore()
const collection = firestore.collection('salePopsSettings')

/**
 *
 * @param shopifyDomain
 * @returns {Promise<any|null>}
 */
export async function getSettingByShopDomain (shopifyDomain) {
  const querySnapshot = await collection
    .where('shopifyDomain', '==', shopifyDomain)
    .limit(1)
    .get()

  if (querySnapshot.empty) return null

  const doc = querySnapshot.docs[0]
  return {
    id: doc.id, ...formatDateFields(doc.data())

  }
}

/**
 *
 * @param shopifyDomain
 * @param data
 * @returns {Promise<any>}
 */
export async function createSetting (shopifyDomain, data) {
  const newDoc = await collection.add({
    shopifyDomain,
    ...data
  })
  const createdDoc = await newDoc.get()
  return {
    id: createdDoc.id,
    ...formatDateFields(createdDoc.data())
  }
}

/**
 *
 * @param shopifyDomain
 * @param data
 * @returns {Promise<*>}
 */
export async function updateSalePopsSettings (shopifyDomain, data) {
  const querySnapshot = await collection
    .where('shopifyDomain', '==', shopifyDomain)
    .limit(1)
    .get()

  if (querySnapshot.empty) {
    return createSetting(shopifyDomain, data)
  }
  const doc = querySnapshot.docs[0]
  return collection.doc(doc.id).update(data)
}

/**
 *
 * @param shopifyDomain
 * @returns {Promise<FirebaseFirestore.WriteResult|*>}
 */
export async function toggleActive (shopifyDomain) {
  const querySnapshot = await collection
    .where('shopifyDomain', '==', shopifyDomain)
    .limit(1)
    .get()

  if (querySnapshot.empty) {
    return createSetting(shopifyDomain, { isActive: true })
  }

  const doc = querySnapshot.docs[0]
  const currentData = doc.data()
  const newActiveValue = !currentData.isActive

  return collection.doc(doc.id).update({ isActive: newActiveValue })
}



