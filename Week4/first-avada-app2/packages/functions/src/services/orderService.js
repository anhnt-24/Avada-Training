import { getShopByShopifyDomain } from '@avada/core'
import { initShopify } from '@functions/services/shopifyService'
import { loadGraphQL } from '@functions/helpers/graphql/graphqlHelpers'
import {
  createManyNotifications,
  deleteNotificationsByShop
} from '@functions/repositories/salePopsNotificationsRepository'
import mapOrderToNotification from '@functions/helpers/mapper/mapOrderToNotification'

/**
 *
 * @param shopifyDomain
 * @param shopData
 * @returns {Promise<void>}
 */
export async function syncOrders (shopifyDomain, shopData) {
  const data = await getOrders(shopData)
  const mappedNotifications = data.orders.nodes.map(order => mapOrderToNotification(order, shopifyDomain))
  await deleteNotificationsByShop(shopifyDomain)
  await createManyNotifications(mappedNotifications)
}

/**
 *
 * @param shopData
 * @returns {Promise<any>}
 */
export async function getOrders (shopData) {
  const shopify = initShopify(shopData)
  const query = loadGraphQL('/orders.graphql')
  return await shopify.graphql(query)
}

/**
 *
 * @param shopifyDomain
 * @param orderId
 * @returns {Promise<*>}
 */
export async function getOrderById (shopifyDomain, orderId) {
  const shopData = await getShopByShopifyDomain(shopifyDomain)
  const shopify = initShopify(shopData)
  const query = loadGraphQL('/getOrderById.graphql')
  const gid = typeof orderId === 'string' && orderId.startsWith('gid://shopify/Order/')
    ? orderId
    : `gid://shopify/Order/${orderId}`
  const data = await shopify.graphql(query, { id: gid })
  return data?.order
}
