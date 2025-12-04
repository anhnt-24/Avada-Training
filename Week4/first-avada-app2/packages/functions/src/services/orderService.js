import { loadGraphQL } from '@functions/helpers/graphql/graphqlHelpers'
import {
  createManyNotifications,
  deleteNotificationsByShop
} from '@functions/repositories/salePopsNotificationsRepository'
import mapOrderToNotification from '@functions/helpers/mapper/mapOrderToNotification'

/**
 *
 * @param shopify
 * @param shopifyDomain
 * @returns {Promise<void>}
 */
export async function syncOrders (shopify, shopifyDomain) {
  const data = await getOrders(shopify)
  const mappedNotifications = data.orders.nodes.map(order => mapOrderToNotification(order, shopifyDomain))
  await deleteNotificationsByShop(shopifyDomain)
  return await createManyNotifications(mappedNotifications)
}

/**
 *
 * @param shopify
 * @returns {Promise<any>}
 */
export async function getOrders (shopify) {
  const query = loadGraphQL('/orders.graphql')
  return await shopify.graphql(query)
}

/**
 *
 * @param shopify
 * @param orderId
 * @returns {Promise<*>}
 */
export async function getOrderById (shopify, orderId) {
  const query = loadGraphQL('/getOrderById.graphql')
  const gid = typeof orderId === 'string' && orderId.startsWith('gid://shopify/Order/')
    ? orderId
    : `gid://shopify/Order/${orderId}`
  const data = await shopify.graphql(query, { id: gid })
  return data?.order
}
