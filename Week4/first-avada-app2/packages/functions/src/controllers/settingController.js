import { getSettingByShopDomain, updateSetting } from '@functions/repositories/settingRepository'

/**
 * @param ctx
 * @returns {Promise<void>}
 */
export async function getSetting (ctx) {
  try {
    const shopifyDomain = ctx.state.shopify.shop
    const setting = await getSettingByShopDomain(shopifyDomain)

    ctx.body = {
      data: setting,
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

/**
 * @param ctx
 * @returns {Promise<void>}
 */
export async function updateSetting (ctx) {
  try {
    const shopifyDomain = ctx.state.shopify.shop
    const inputData = ctx.req.body
    const updatedSetting = await updateSetting(shopifyDomain, inputData)
    console.log(updatedSetting)
    ctx.body = {
      data: updatedSetting,
      success: !!updatedSetting,
      message: updatedSetting ? 'Updated successfully' : 'Setting not found',
    }
  } catch (e) {
    console.error(e)
    ctx.body = {
      data: {},
      shopData: {},
      success: false,
      message: e.message || 'Internal server error',
    }
  }
}
