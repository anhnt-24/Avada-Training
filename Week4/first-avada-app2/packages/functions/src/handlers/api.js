import App from 'koa'
import createErrorHandler from '@functions/middleware/errorHandler'
import * as errorService from '@functions/services/errorService'
import apiRouter from '@functions/routes/api'
import render from 'koa-ejs'
import path from 'path'
import { getShopByShopifyDomain, verifyEmbedRequest } from '@avada/core'
import shopifyConfig from '@functions/config/shopify'
import appConfig from '@functions/config/app'
import shopifyOptionalScopes from '@functions/config/shopifyOptionalScopes'
import { syncOrders } from '@functions/services/orderService'
import { registerWebhook } from '@functions/services/registerWebhook'
import { salePopsSettings } from '@functions/const/salePopsSettings'
import { createSetting } from '@functions/repositories/salePopsSettingsRepository'
import { createAnnouncementBarDefinition } from '@functions/services/announcementBarSettingsService'
import { initShopify } from '@functions/services/shopifyService'
// Initialize all demand configuration for an application
const api = new App()
api.proxy = true

render(api, {
  cache: true,
  debug: false,
  layout: false,
  root: path.resolve(__dirname, '../../views'),
  viewExt: 'html'
})
api.use(createErrorHandler())
api.use(
  verifyEmbedRequest({
    returnHeader: true,
    apiKey: shopifyConfig.apiKey,
    scopes: shopifyConfig.scopes,
    secret: shopifyConfig.secret,
    hostName: appConfig.baseUrl,
    isEmbeddedApp: true,
    optionalScopes: shopifyOptionalScopes,
    accessTokenKey: shopifyConfig.accessTokenKey,
    afterLogin: async ctx => {
    },
    afterInstall: async ctx => {
      const shopifyDomain = ctx.state.shopify.shop
      const shopData = await getShopByShopifyDomain(shopifyDomain)
      const shopify = initShopify(shopData)
      await Promise.all([
        createAnnouncementBarDefinition(shopify),
        registerWebhook(shopify),
        syncOrders(shopify, shopifyDomain),
        createSetting(shopifyDomain, salePopsSettings)
      ])
    },
    initialPlan: {
      id: 'free',
      name: 'Free',
      price: 0,
      trialDays: 0,
      features: {}
    }
  })
)
const router = apiRouter(true)
api.use(router.routes())
api.use(router.allowedMethods())

api.on('error', errorService.handleError)

export default api
