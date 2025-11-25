import {
  createManyNotifications,
  deleteManyNotifications,
  deleteNotificationsByShop,
  getNotificationsByShop
} from '@functions/repositories/notificationRepository'
import { getShopByShopifyDomain } from '@avada/core'
import { getOrders } from '@functions/services/orderService'
import mapOrderToNotification from '@functions/helpers/mapper/mapOderToNotification'

/**
 * Lấy tất cả notifications của shop
 * @param ctx
 */
export async function getAll (ctx) {
  try {
    const shopifyDomain = ctx.state.shopify.shop
    const notifications = await getNotificationsByShop(shopifyDomain)
    ctx.body = {
      success: true,
      data: notifications,
    }
  } catch (e) {
    ctx.body = {
      success: false,
      data: [],
      message: e.message || 'Internal server error',
    }
  }
}

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
export async function syncOrders (ctx) {
  try {
    const shopifyDomain = ctx.state.shopify.shop
    const shopData = await getShopByShopifyDomain(shopifyDomain)
    const orders = await getOrders(shopData)

    const mappedNotifications = orders.orders.nodes.map(order => mapOrderToNotification(order, shopifyDomain))
    await deleteNotificationsByShop(shopifyDomain)
    const data = await createManyNotifications(mappedNotifications)
    ctx.body = {
      success: true,
      data
    }
  } catch (e) {
    ctx.body = {
      success: false,
      message: e.message || 'Failed to create notifications',
    }
  }
}

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
export async function deleteMany (ctx) {
  try {
    const { ids } = ctx.req.body
    const result = await deleteManyNotifications(ids)
    ctx.body = {
      success: result,
    }
  } catch (e) {
    ctx.body = {
      success: false,
      message: e.message || 'Failed to delete notifications',
    }
  }
}

