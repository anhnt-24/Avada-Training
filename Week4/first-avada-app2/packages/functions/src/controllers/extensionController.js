import { getCurrentShopData } from '@functions/helpers/auth'
import { checkActiveStatus } from '@functions/services/extensionService'

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
export async function checkExtensionEnabled (ctx) {
  try {
    const shopData = getCurrentShopData(ctx)
    const result = await checkActiveStatus(shopData)
    ctx.body = {
      success: true,
      data: { isDisabled: result },
    }
  } catch (e) {
    ctx.body = {
      success: false,
      message: e.message
    }
  }
}
