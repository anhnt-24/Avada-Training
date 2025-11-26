export const salePopsSettings = {
  position: 'bottom-right',
  hideTimeAgo: true,
  truncateProductName: true,
  fontFamily: 'Arial',
  hideCloseIcon: false,
  hidePopsAfter: 1,

  displayDuration: 3,
  firstDelay: 2,
  popsInterval: 2,
  maxPopsDisplay: 2,

  includedUrls: '',
  excludedUrls: '',
  allowShow: 'specific',

  specificPages: {
    homepage: true,
    productPages: true,
    collectionPages: true,
    cartPages: true,
    blogPages: true,
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
  { label: 'Home page only', value: 'homePageOnly' },
  { label: 'Specific page', value: 'specific' },
]

