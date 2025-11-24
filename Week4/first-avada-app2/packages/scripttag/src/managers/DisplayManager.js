import { insertAfter } from '../helpers/insertHelpers'
import { render } from 'preact'
import NotificationPopup from '../components/NotificationPopup/NotificationPopup'

export default class DisplayManager {
  constructor () {
    this.notifications = []
    this.settings = {}
    this.popCount = 1
    this.container = null
    this.currentIndex = 0
    this.timer = null
  }

  async initialize ({ notifications, settings }) {
    this.notifications = notifications
    this.settings = settings
    this.popCount = settings.maxPopsDisplay || 1

    if (!this.shouldShowOnUrl(window.location.pathname)) return

    this.insertContainer()
    this.setPosition()

    const firstDelay = this.settings.firstDelay || 0
    await new Promise((resolve) => setTimeout(resolve, firstDelay * 1000))

    this.showNextBatch()
  }

  insertContainer () {
    if (!document.querySelector('#Avada-SalePop')) {
      const popupEl = document.createElement('div')
      popupEl.id = 'Avada-SalePop'
      popupEl.classList.add('Avada-SalePop__OuterWrapper')
      const targetEl = document.querySelector('body').firstChild
      if (targetEl) insertAfter(popupEl, targetEl)
      this.container = popupEl
    } else {
      this.container = document.querySelector('#Avada-SalePop')
    }
    return this.container
  }

  setPosition () {
    if (!this.container) return
    const pos = this.settings.position || 'bottom-left'
    const style = this.container.style
    style.position = 'fixed'
    style.zIndex = '9999'
    style.bottom = pos.includes('bottom') ? '20px' : 'auto'
    style.top = pos.includes('top') ? '20px' : 'auto'
    style.left = pos.includes('left') ? '20px' : 'auto'
    style.right = pos.includes('right') ? '20px' : 'auto'
  }

  shouldShowOnUrl (url) {
    const { includedUrls = '', excludedUrls = '', allowShow = 'all' } = this.settings
    const included = includedUrls.split('\n').map((u) => u.trim()).filter(Boolean)
    const excluded = excludedUrls.split('\n').map((u) => u.trim()).filter(Boolean)

    if (allowShow === 'specific' && included.length && !included.includes(url)) return false
    if (excluded.includes(url)) return false
    return true
  }

  showNextBatch () {
    if (!this.notifications.length) return

    const duration = (this.settings.displayDuration || 5) * 1000
    const interval = (this.settings.popsInterval || 10) * 1000 + 1000

    const displayBatch = () => {
      if (!this.shouldShowOnUrl(window.location.pathname)) return

      const batch = []

      for (let i = 0; i < this.popCount; i++) {
        const notification = this.notifications[this.currentIndex % this.notifications.length]
        batch.push(notification)
        this.currentIndex++
      }

      batch.forEach((notification, index) => {
        const newNotification = {
          ...notification,
          productName:
            this.settings.truncateProductName && notification.productName
              ? notification.productName.length > 30
                ? notification.productName.substring(0, 27) + '...'
                : notification.productName
              : notification.productName,
        }

        const popupDiv = document.createElement('div')
        const pos = this.settings.position || 'bottom-left'
        popupDiv.style.marginBottom = pos.includes('bottom') ? `${index * 4}px` : 'auto'
        popupDiv.style.marginTop = pos.includes('top') ? `${index * 4}px` : 'auto'

        this.container.appendChild(popupDiv)
        render(<NotificationPopup {...newNotification} />, popupDiv)

        setTimeout(() => {
          popupDiv.classList.add('fade-out-up')
          setTimeout(() => popupDiv.remove(), 500)
        }, duration - 1000)
      })
      this.timer = setTimeout(displayBatch, interval)
    }

    displayBatch()
  }

}
