import { getOrderById } from '@functions/services/orderService'
import { createNotification } from '@functions/repositories/notificationRepository'
import mapOrderToNotification from '@functions/helpers/mapper/mapOderToNotification'

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
export async function listenNewOrder (ctx) {
  try {
    const order = ctx.req.body
    const shopifyDomain = ctx.headers['x-shopify-shop-domain']
    const data = await getOrderById(shopifyDomain, order.id)
    const notification = mapOrderToNotification(data, shopifyDomain)
    await createNotification(notification)
    ctx.body = { success: true }
  } catch (error) {
    ctx.body = { success: false, message: error.message }
  }
}


