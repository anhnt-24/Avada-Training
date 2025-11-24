import appConfig from '@functions/config/app'
import { initShopify } from '@functions/services/shopifyService'
import { isEmpty } from '@avada/utils'

/**
 *
 * @param shopData
 * @returns {Promise<Shopify.IWebhook>}
 */
export async function registerWebhook (shopData) {
  const shopify = initShopify(shopData)
  const currentWebhooks = await shopify.webhook.list()
  const unusedHooks = currentWebhooks.filter((webhook) =>
    !webhook.address.includes(appConfig.baseUrl)
  )

  if (!isEmpty(unusedHooks)) {
    await Promise.all(
      unusedHooks.map((hook) => shopify.webhook.delete(hook.id))
    )
  }

  const webhooks = await shopify.webhook.list({
    address: `https://${appConfig.baseUrl}/webhook/order/new`
  })
  if (webhooks.length === 0) {
    return await shopify.webhook.create({
      topic: 'orders/create',
      address: `https://${appConfig.baseUrl}/webhook/order/new`,
      format: 'json'
    })
  }
}

