import DisplayManager from './managers/DisplayManager'
import ApiManager from './managers/ApiManager'
import loadFont from './helpers/loadFont'

console.log('This is the script tag ');

(async () => {
  const apiManager = new ApiManager()
  const displayManager = new DisplayManager()
  const { notifications, settings } = await apiManager.getNotifications()
  loadFont(settings.fontFamily)
  displayManager.initialize({ notifications, settings })
})()

