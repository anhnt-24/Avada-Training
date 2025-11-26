import { insertAfter } from '../helpers/insertHelpers'
import { render } from 'preact'
import NotificationPopup from '../components/NotificationPopup/NotificationPopup'

export default class DisplayManager {
  constructor () {
    this.notifications = []
    this.settings = {}
    this.currentIndex = 0
    this.timer = null
  }

  async initialize ({ notifications, settings }) {
    this.notifications = notifications
    this.settings = settings

    if (settings.continueAfterReload) {
      const saved = localStorage.getItem('salepop_index')
      if (saved) this.currentIndex = parseInt(saved)
    }
    this.insertContainer()
    this.setPosition()
    await new Promise(r => setTimeout(r, settings.firstDelay * 1000))
    this.showNext()
  }

  insertContainer () {
    let el = document.querySelector('#Avada-SalePop')
    if (!el) {
      el = document.createElement('div')
      el.id = 'Avada-SalePop'
      const target = document.body.firstChild
      if (target) insertAfter(el, target)
    }
    this.container = el
  }

  setPosition () {
    const pos = this.settings.position
    const s = this.container.style
    s.position = 'fixed'
    s.zIndex = '9999'
    s.bottom = pos.includes('bottom') ? '20px' : 'auto'
    s.top = pos.includes('top') ? '20px' : 'auto'
    s.left = pos.includes('left') ? '20px' : 'auto'
    s.right = pos.includes('right') ? '20px' : 'auto'
  }

  // getFilteredNotifications () {
  //   let list = [...this.notifications]
  //
  //   if (this.settings.basedOnProductView) {
  //     const handle = window.location.pathname.split('/products/')[1]
  //     // if (handle) {
  //     //   list = list.filter(
  //     //     n => n.productHandle === handle || n.productUrl?.includes(handle)
  //     //   )
  //     // }
  //   }
  //
  //   return list
  // }
  setMaxPopsDisplay () {
    const max = this.settings.maxPopsDisplay
    if (this.notifications.length > max)
      this.notifications = this.notifications.slice(0, max)
  }

  getNextNotification () {
    if (this.settings.displayMethod === 'randomly') {
      return this.notifications[Math.floor(Math.random() * this.notifications.length)]
    }

    const item = this.notifications[this.currentIndex % this.notifications.length]
    this.currentIndex++
    return item
  }

  showNext () {
    if (this.currentIndex >= this.notifications.length) {
      if (this.settings.replayPlaylist) this.currentIndex = 0
      else return
    }

    const notification = this.getNextNotification()
    const duration = this.settings.displayDuration * 1000
    const interval = this.settings.popsInterval * 1000

    const popupDiv = document.createElement('div')
    this.container.appendChild(popupDiv)
    render(
      <NotificationPopup
        {...notification}
        settings={this.settings}
        productName={
          this.settings.truncateProductName && notification.productName
            ? notification.productName.length > 30
              ? notification.productName.substring(0, 27) + '...'
              : notification.productName
            : notification.productName
        }
      />,
      popupDiv
    )

    setTimeout(() => {
      popupDiv.classList.add('fade-out-up')
      setTimeout(() => {
        popupDiv.remove()
        if (this.settings.continueAfterReload) {
          localStorage.setItem('salepop_index', this.currentIndex)
        }
        this.timer = setTimeout(() => this.showNext(), interval)
      }, 500)
    }, duration)
  }

  stop () {
    if (this.timer) clearTimeout(this.timer)
  }
}
