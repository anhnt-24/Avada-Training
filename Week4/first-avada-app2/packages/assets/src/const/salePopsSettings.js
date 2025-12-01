export const salePopsSettings = {
  position: 'bottom-right',
  hideTimeAgo: true,
  truncateProductName: true,
  fontFamily: 'Arial',
  closeIcon: false,
  hidePopsAfter: 1,

  displayDuration: 3,
  firstDelay: 2,
  popsInterval: 2,
  maxPopsDisplay: 2,

  includedUrls: '',
  excludedUrls: '',
  allowShow: 'specific',

  specificPages: {
    home: true,
    product: true,
    collection: true,
    cart: true,
    blog: true,
  },

  specificProducts: {
    type: 'all',
    list: []
  },
  specificCollections: {
    type: 'all',
    list: []
  },

  displayMethod: 'randomly',
  replayPlaylist: false,
  continueAfterReload: false,
  basedOnProductView: false,
  isActive: true
}

export const DISPLAY_METHOD_OPTIONS = [
  { label: 'Display randomly', value: 'randomly' },
  { label: 'Display in order', value: 'in-order' },
]
export const RESTRICTION_OPTIONS = [
  { label: 'All pages', value: 'all' },
  { label: 'Home page only', value: 'home' },
  { label: 'Specific page', value: 'specific' },
]
export const SPECIFIC_PAGES = [
  { label: 'Homepage', value: 'home' },
  { label: 'Product pages', value: 'product' },
  { label: 'Collection pages', value: 'collection' },
  { label: 'Cart pages', value: 'cart' },
  { label: 'Blog pages', value: 'blog' },
]

