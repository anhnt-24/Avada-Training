import { getShopByShopifyDomain } from '@avada/core'
import { initShopify } from '@functions/services/shopifyService'
import { loadGraphQL } from '@functions/helpers/graphql/graphqlHelpers'
import {
  createManyNotifications,
  deleteNotificationsByShop
} from '@functions/repositories/salePopsNotificationsRepository'
import { createSetting } from '@functions/repositories/salePopsSettingsRepository'
import { salePopsSettings } from '@functions/const/salePopsSettings'
import mapOrderToNotification from '@functions/helpers/mapper/mapOrderToNotification'

/**
 *
 * @param shopifyDomain
 * @param shopData
 * @returns {Promise<void>}
 */
export async function syncOrdersAndSetting (shopifyDomain, shopData) {
  try {
    const data = await getOrders(shopData)
    const mappedNotifications = data.orders.nodes.map(order => mapOrderToNotification(order, shopifyDomain))
    await deleteNotificationsByShop(shopifyDomain,)
    await Promise.all([createSetting(shopifyDomain, salePopsSettings), createManyNotifications(mappedNotifications)])
  } catch (error) {
    console.log(error)
    throw error
  }
}

/**
 *
 * @param shopData
 * @returns {Promise<any>}
 */
export async function getOrders (shopData) {
  try {
    const shopify = initShopify(shopData)
    const query = loadGraphQL('/orders.graphql')
    return await shopify.graphql(query)
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
