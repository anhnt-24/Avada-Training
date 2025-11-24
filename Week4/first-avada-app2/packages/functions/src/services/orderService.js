import { getShopByShopifyDomain } from '@avada/core'
import { initShopify } from '@functions/services/shopifyService'
import { loadGraphQL } from '@functions/helpers/graphql/graphqlHelpers'
import { createManyNotifications } from '@functions/repositories/notificationRepository'
import { createSetting } from '@functions/repositories/settingRepository'
import { defaultSetting } from '@functions/const/setting/defaultSetting'
import mapOrderToNotification from '@functions/helpers/mapper/mapOderToNotification'

/**
 *
 * @param shopifyDomain
 * @param shopData
 * @returns {Promise<void>}
 */
export async function syncOrdersAndSetting (shopifyDomain, shopData) {
  try {

    const shopify = initShopify(shopData)
    const query = loadGraphQL('/orders.graphql')
    const data = await shopify.graphql(query)
    const mappedNotifications = data.orders.nodes.map(order => mapOrderToNotification(order, shopifyDomain))
    await createSetting(shopifyDomain, defaultSetting)
    await createManyNotifications(mappedNotifications)
  } catch (error) {
    console.log(error)
    throw error
  }
}

/**
 *
 * @param shopifyDomain
 * @param orderId
 * @returns {Promise<*|null>}
 */
export async function getOrderById (shopifyDomain, orderId) {
  try {
    const shopData = await getShopByShopifyDomain(shopifyDomain)
    const shopify = initShopify(shopData)

    const query = loadGraphQL('/getOrderById.graphql')

    const gid = typeof orderId === 'string' && orderId.startsWith('gid://shopify/Order/')
      ? orderId
      : `gid://shopify/Order/${orderId}`

    const data = await shopify.graphql(query, { id: gid })

    return data?.order || null
  } catch (err) {
    console.log(err)
    throw err
  }
}
