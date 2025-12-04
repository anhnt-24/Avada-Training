import Router from 'koa-router'
import * as sampleController from '@functions/controllers/sampleController'
import * as shopController from '@functions/controllers/shopController'
import * as subscriptionController from '@functions/controllers/subscriptionController'
import * as appNewsController from '@functions/controllers/appNewsController'
import { getApiPrefix } from '@functions/const/app'
import * as salePopsSettingsController from '@functions/controllers/salePopsSettingsController'
import * as salePopsNotificationController from '@functions/controllers/salePopsNotificationsController'
import * as announcementController from '@functions/controllers/anouncementBarController'
import * as extensionController from '@functions/controllers/extensionController'
import { validateNotificationsMiddlware } from '@functions/middleware/validateNotificationsMiddleware'

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

  router.get('/settings', salePopsSettingsController.getSetting)
  router.put('/settings', salePopsSettingsController.updateSetting)
  router.put('/settings/active', salePopsSettingsController.toggleActiveSetting)

  router.get('/notifications', salePopsNotificationController.getAll)
  router.post('/notifications/sync-orders', salePopsNotificationController.syncManuallyOrders)
  router.delete('/notifications/delete', salePopsNotificationController.deleteMany)
  router.post('/notifications/import', validateNotificationsMiddlware, salePopsNotificationController.syncOrdersFromCSV)

  router.get('/announcements', announcementController.getAll)
  router.get('/announcements/:id', announcementController.getById)
  router.post('/announcements', announcementController.create)
  router.put('/announcements/:id/toggle-published', announcementController.togglePublished)
  router.put('/announcements/:id', announcementController.update)
  router.delete('/announcements/delete-many', announcementController.deleteMany)
  router.delete('/announcements/:id', announcementController.remove)

  router.get('/extension/is-disabled', extensionController.checkExtensionEnabled)

  return router
}
