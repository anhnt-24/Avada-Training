export const ContentSideBarSettingDefault =
  {
    type: 'simple',
    title: 'Enjoy a 20% discount on all our products!',
    subheading: '',
    name: 'New Announcement Bar',
    announcements: [
      {
        title: 'Enjoy a 20% discount on all our products!',
        subheading: '',
      },
      {
        title: 'Enjoy a 20% discount on all our products!',
        subheading: '',
      }
    ],
    rotateSpeed: 5,
    closeIcon: false,
    cta:
      {
        type: 'button',
        textBtn: '',
        link: ''
      },
    schedule: {
      startOption: 'now',
      startDate: null,
      endOption: 'never',
      endDate: null
    }
  }

export const ANNOUNCEMENT_TYPE_OPTIONS = [
  { label: 'Simple announcement', value: 'simple' },
  { label: 'Running line announcement', value: 'running' },
  { label: 'Multiple rotating announcements', value: 'rotating' },
]

export const CTA_TYPE_OPTIONS = [
  { label: 'No call to action ', value: 'none' },
  { label: 'Button', value: 'button' },
  { label: 'Entire bar clickable', value: 'entire' },
]

export const SCHEDULE_OPTIONS = [
  { label: 'Right now', value: 'now' },
  { label: 'Specific date', value: 'specific' },
]
export const DesignSideBarSettingsDefault = {
  card: {
    background: {
      type: 'solid',
      colors: ['#ffffff', '#ffffff'],
      angle: 90,
    },
    cornerRadius: 0,
    border: {
      size: 0,
      color: '#000000',
    },
  },
  typography: {
    font: '',
    title: {
      size: 16,
      color: '#000000',
    },
    subtitle: {
      size: 14,
      color: '#000000',
    },
  },
  button: {
    size: 16,
    background: {
      type: 'solid',
      colors: ['#000000', '#ffffff'],
      angle: 90,
    },
    cornerRadius: 0,
    border: {
      size: 0,
      color: '#000000',
    },
  },
  closeIcon: {
    size: 16,
    color: '#000000',
  },
}

export const BACKGROUND_TYPE_OPTIONS = [
  { label: 'Single color background', value: 'solid' },
  { label: 'Gradient background', value: 'gradient' },
]

export const FONT_OPTIONS = [
  { label: 'Arial', value: 'arial' },
  { label: 'Helvetica', value: 'helvetica' },
  { label: 'Times New Roman', value: 'times' },
]

export const PlacementSideBarSettingsDefault = {
  restrictionType: 'home_page',
}

export const PAGE_SELECTION_OPTIONS = [
  { label: 'Every page', value: 'every_page' },
  { label: 'Home page only', value: 'home_page' },
  { label: 'All product pages', value: 'all_product_pages' },
  { label: 'All collection pages', value: 'all_collection_pages' },
]

export const AnnouncementBarSettingsDefault = {
  content: ContentSideBarSettingDefault,
  design: DesignSideBarSettingsDefault,
  placement: PlacementSideBarSettingsDefault,
  isPublished: false,
}
