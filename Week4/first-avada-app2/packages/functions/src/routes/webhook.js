import Router from 'koa-router'
import { listenNewOrder } from '@functions/controllers/webhook/webhookController'

const router = new Router({
  prefix: '/webhook'
})
router.use(router.allowedMethods())
router.post('/order/new', listenNewOrder)

export default router
