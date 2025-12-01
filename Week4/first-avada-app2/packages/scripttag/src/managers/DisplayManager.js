import { insertAfter } from '../helpers/insertHelpers'
import { render } from 'preact'
import NotificationPopup from '../components/NotificationPopup/NotificationPopup'

const STORAGE_KEYS = {
  hideUntil: 'notificationsHideUntil',
  restoreIndex: 'salePopsIndex',
}

export default class DisplayManager {

  constructor () {
    this.notifications = []
    this.settings = {}
    this.currentIndex = 0
    this.timer = null
    this.currentPage = window.ShopifyAnalytics.meta.page.pageType
    this.isClose = false
  }

  async initialize ({ notifications, settings }) {
    this.notifications = notifications
    this.settings = settings
    if (!this.shouldShow()) return
    await this.init()
  }

  async init () {
    this.setFilteredNotifications()
    this.setMaxPopsDisplay()
    this.setIndexAfterReload()
    this.insertContainer()
    await this.waitFirstDelay()
    await this.startPopupLoop()
  }

  shouldShow () {
    if (!this.settings.isActive) return false
    const hideUntil = Number(localStorage.getItem(STORAGE_KEYS.hideUntil))
    if (hideUntil && Date.now() < hideUntil) {
      return false
    }
    if (this.settings.allowShow === 'all') return true
    if (this.settings.allowShow === this.currentPage) return true
    return this.settings.allowShow === 'specific' && this.settings.specificPages[this.currentPage]
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

  setFilteredNotifications () {
    if (this.settings.basedOnProductView && this.currentPage === 'product') {
      const handle = window.location.pathname.replace('/products/', '')
      if (handle) {
        this.notifications = this.notifications.filter(
          n => n.productHandle === handle
        )
      }
    }
  }

  setMaxPopsDisplay () {
    const max = this.settings.maxPopsDisplay
    if (this.notifications.length > max)
      this.notifications = [...this.notifications.slice(0, max)]
  }

  setIndexAfterReload () {
    if (this.settings.continueAfterReload) {
      const saved = localStorage.getItem(STORAGE_KEYS.restoreIndex)
      const index = parseInt(saved)
      if (isNaN(index) || index >= this.notifications.length) {
        this.currentIndex = 0
      } else {
        this.currentIndex = index
      }
    }
  }

  async waitFirstDelay () {
    const delay = this.settings.firstDelay
    await new Promise(resolve => setTimeout(resolve, delay * 1000))
  }

  getNextNotification () {
    if (this.settings.displayMethod === 'randomly') {
      return this.notifications[Math.floor(Math.random() * this.notifications.length)]
    }
    return this.notifications[this.currentIndex % this.notifications.length]
  }

  async startPopupLoop () {
    const interval = this.settings.popsInterval * 1000
    const duration = this.settings.displayDuration * 1000
    if (this.notifications.length === 0 || this.isClose) return

    do {
      if (this.currentIndex >= this.notifications.length) {
        if (this.settings.replayPlaylist) {
          this.currentIndex = 0
        } else {
          break
        }
      }
      const notification = this.getNextNotification()
      this.currentIndex++
      const popupDiv = this.displayPopup(notification)
      await this.sleep(duration)
      await this.fadeOut(popupDiv)
      await this.sleep(interval)
      if (this.settings.continueAfterReload) {
        localStorage.setItem(STORAGE_KEYS.restoreIndex, this.currentIndex)
      }
    } while (!this.isClose && (this.settings.replayPlaylist || this.currentIndex < this.notifications.length))
  }

  displayPopup (notification) {
    const popupDiv = document.createElement('div')
    this.container.appendChild(popupDiv)
    const productLink = window.location.origin + '/products/' + notification.productHandle
    render(
      <NotificationPopup
        {...notification}
        settings={this.settings}
        productLink={productLink}
        onClose={this.onClose.bind(this)}
      />,
      popupDiv
    )
    return popupDiv
  }

  async fadeOut (popupDiv) {
    const wrapper = document.querySelector('.Avava-SP__Wrapper')
    if (wrapper) wrapper.classList.add('Fade-Out-Up')
    await this.sleep(1000)
    popupDiv.remove()

  }

  onClose (e) {
    e.stopPropagation()
    e.preventDefault()
    this.isClose = true
    const hideUntil = Date.now() + this.settings.hidePopsAfter * 60 * 60 * 1000
    localStorage.setItem(STORAGE_KEYS.hideUntil, hideUntil)
  }

  sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}
