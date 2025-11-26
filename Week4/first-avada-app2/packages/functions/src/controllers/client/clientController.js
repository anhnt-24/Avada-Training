import { getSettingByShopDomain } from '@functions/repositories/salePopsSettingsRepository'
import { getNotificationsByShop } from '@functions/repositories/salePopsNotificationsRepository'

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
export async function getNotificationsAndSetting (ctx) {
  try {
    const { shopifyDomain } = ctx.query
    const settings = await getSettingByShopDomain(shopifyDomain)
    const notifications = await getNotificationsByShop(shopifyDomain)
    ctx.body = {
      data: {
        settings,
        notifications
      },
      success: true,
    }
  } catch (e) {
    ctx.body = {
      data: {},
      success: false,
      message: e.message || 'Internal server error',
    }
  }
}
