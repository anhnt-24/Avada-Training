import { initShopify } from '@functions/services/shopifyService'

/**
 *
 * @param shopData
 * @returns {Promise<Shopify.IScriptTag|null>}
 */
export async function registerScriptTag (shopData) {

  const shopify = initShopify(shopData)

  const existingTags = await shopify.scriptTag.list()
  const srcUrl = 'https://localhost:5050/scripttag/avada-sale-pop.min.js'
  const alreadyRegistered = existingTags.some(tag => tag.src === srcUrl)

  if (alreadyRegistered) {
    console.log('ScriptTag đã tồn tại, không tạo lại')
    return null
  }

  console.log('Đăng ký ScriptTag mới')
  return await shopify.scriptTag.create({
    event: 'onload',
    src: srcUrl
  })
}

