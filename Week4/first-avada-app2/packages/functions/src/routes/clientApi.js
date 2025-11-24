import Router from 'koa-router'
import { getNotificationsAndSetting } from '@functions/controllers/client/clientController'

const router = new Router({
  prefix: '/clientApi'
})
router.use(router.allowedMethods())
router.get('/notifications', getNotificationsAndSetting)

export default router
