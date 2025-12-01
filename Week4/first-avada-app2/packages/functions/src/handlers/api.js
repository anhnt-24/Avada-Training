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
      const shopifyDomain = ctx.state.shopify.shop
      const shopData = await getShopByShopifyDomain(shopifyDomain)
      await registerWebhook(shopData)

    },
    afterInstall: async ctx => {
      const shopifyDomain = ctx.state.shopify.shop
      const shopData = await getShopByShopifyDomain(shopifyDomain)
      await Promise.all([
        registerWebhook(shopData),
        syncOrders(shopifyDomain, shopData),
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
api.use(router.allowedMethods())
api.use(router.routes())

api.on('error', errorService.handleError)

export default api
