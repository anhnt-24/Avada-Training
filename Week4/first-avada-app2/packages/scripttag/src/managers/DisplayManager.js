import { insertAfter } from '../helpers/insertHelpers'
import { render } from 'preact'
import NotificationPopup from '../components/NotificationPopup/NotificationPopup'

const NOTIFICATIONS_HIDE_UNTIL = 'notificationsHideUntil'
const SALEPOPS_INDEX = 'salePopsIndex'

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
    this.setFilteredNotifications()
    this.setMaxPopsDisplay()
    this.setIndexAfterReload()
    this.insertContainer()
    this.setPosition()
    await new Promise(r => setTimeout(r, settings.firstDelay * 1000))
    this.showNext()
  }

  setIndexAfterReload () {
    if (this.settings.continueAfterReload) {
      const saved = localStorage.getItem(SALEPOPS_INDEX)
      const index = parseInt(saved)
      if (isNaN(index) || index >= this.notifications.length) {
        this.currentIndex = 0
      } else {
        this.currentIndex = index
      }
    }
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

  getNextNotification () {
    if (this.settings.displayMethod === 'randomly') {
      return this.notifications[Math.floor(Math.random() * this.notifications.length)]
    }

    return this.notifications[this.currentIndex % this.notifications.length]
  }

  showNext () {
    if (this.currentIndex >= this.notifications.length) {
      if (this.settings.replayPlaylist) this.currentIndex = 0
      else return
    }
    if (this.isClose) {
      return
    }
    const notification = this.getNextNotification()
    this.currentIndex++
    const duration = this.settings.displayDuration * 1000
    const interval = this.settings.popsInterval * 1000
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

    setTimeout(() => {
      popupDiv.classList.add('Fade-Out-Up')
      setTimeout(() => {
        popupDiv.remove()
        if (this.settings.continueAfterReload) {
          localStorage.setItem(SALEPOPS_INDEX, this.currentIndex)
        }
        setTimeout(() => this.showNext(), interval)
      }, 500)
    }, duration)
  }

  shouldShow () {
    if (!this.settings.isActive) return false
    const hideUntil = Number(localStorage.getItem(NOTIFICATIONS_HIDE_UNTIL))
    if (hideUntil && Date.now() < hideUntil) {
      return false
    }
    if (this.settings.allowShow === 'all') return true
    if (this.settings.allowShow === this.currentPage) return true
    return this.settings.allowShow === 'specific' && this.settings.specificPages[this.currentPage]
  }

  onClose (e) {
    e.stopPropagation()
    e.preventDefault()
    this.isClose = true
    const hideUntil = Date.now() + this.settings.hidePopsAfter * 60 * 60 * 1000
    localStorage.setItem(NOTIFICATIONS_HIDE_UNTIL, hideUntil)
  }
}
