import { getNotificationsByShop } from '@functions/repositories/notificationRepository'

/**
 * @param ctx
 * @returns {Promise<void>}
 */
export async function getAll (ctx) {
  try {
    const shopifyDomain = ctx.state.shopify.shop
    const notifications = await getNotificationsByShop(shopifyDomain)
    ctx.body = {
      data: notifications,
      success: true,
    }
  } catch (e) {
    ctx.body = {
      data: [],
      success: false,
      message: e.message || 'Internal server error',
    }
  }
}
