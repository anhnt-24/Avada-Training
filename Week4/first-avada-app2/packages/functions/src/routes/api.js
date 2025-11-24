import Router from 'koa-router'
import * as sampleController from '@functions/controllers/sampleController'
import * as shopController from '@functions/controllers/shopController'
import * as subscriptionController from '@functions/controllers/subscriptionController'
import * as appNewsController from '@functions/controllers/appNewsController'
import { getApiPrefix } from '@functions/const/app'
import * as settingController from '@functions/controllers/settingController'
import * as notificationController from '@functions/controllers/notificationController'
import * as announcementController from '@functions/controllers/anouncementBarController'

export default function apiRouter (isEmbed = false) {
  const router = new Router({ prefix: getApiPrefix(isEmbed) })

  router.get('/samples', sampleController.exampleAction)
  router.get('/shops', shopController.getUserShops)
  router.get('/subscription', subscriptionController.getSubscription)
  router.get('/appNews', appNewsController.getList)

  router.get('/subscriptions', subscriptionController.getList)
  router.post('/subscriptions', subscriptionController.createOne)
  router.put('/subscriptions', subscriptionController.updateOne)
  router.delete('/subscriptions/:id', subscriptionController.deleteOne)

  router.get('/settings', settingController.getSetting)
  router.put('/settings', settingController.updateSetting)

  router.get('/notifications', notificationController.getAll)

  router.get('/announcements', announcementController.getAll)
  router.get('/announcements/:id', announcementController.getById)
  router.post('/announcements', announcementController.create)
  router.put('/announcements/:id/toggle-published', announcementController.togglePublished)
  router.put('/announcements/:id', announcementController.update)
  router.delete('/announcements/:id', announcementController.remove)
  return router
}
