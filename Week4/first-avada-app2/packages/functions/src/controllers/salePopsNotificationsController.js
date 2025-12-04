import {
  createManyNotifications,
  deleteManyNotifications,
  deleteNotificationsByShop,
  getNotificationsByShop
} from '@functions/repositories/salePopsNotificationsRepository'
import { syncOrders } from '@functions/services/orderService'
import { getCurrentShopData } from '@functions/helpers/auth'
import { initShopify } from '@functions/services/shopifyService'

/**
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
export async function syncManuallyOrders (ctx) {
  try {
    const shopifyDomain = ctx.state.shopify.shop
    const shopData = getCurrentShopData(ctx)
    const shopify = initShopify(shopData)
    const data = await syncOrders(shopify, shopifyDomain)
    console.log(data)
    ctx.body = {
      success: true,
      data
    }
  } catch (e) {
    console.log(e)
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
export async function syncOrdersFromCSV (ctx) {
  try {
    const shopifyDomain = ctx.state.shopify.shop
    const records = ctx.req.body
    console.log('records =', records)
    console.log('type =', typeof records)
    console.log('isArray =', Array.isArray(records))
    const notifications = records.map(record => ({ ...record, shopifyDomain, timestamp: new Date().toISOString() }))
    await deleteNotificationsByShop(shopifyDomain)
    const data = await createManyNotifications(notifications)
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

