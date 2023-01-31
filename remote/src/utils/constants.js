export const events = {
  LOADING_START: 'loading_start',
  LOADING_STOP: 'loading_stop',
  DIALOG_ERROR: 'dialog_error_visible',
  DIALOG_SUCCESS: 'dialog_success_visible',
  AUTH_DIALOG_ERROR: 'auth_dialog_error_visible',
  AUTH_DIALOG_SUCCESS: 'auth_dialog_success_visible',

  SHOW_COMPLETE_PROFILE_DIALOG: 'complete-profile',
  SHOW_TERMINAL_DIALOG: 'terminal',
  SHOW_SCREENSHOT_DIALOG: 'screenshot',

  REGISTER_TOKEN: 'register_notification_token',
  UNREGISTER_TOKEN: 'unregister_notification_token',
  ON_MESSAGE: 'notification_on_message'
}

export const TOKEN_KEY = 'token'
export const PIN_TOKEN_KEY = 'pinToken'
export const DEFAULT_AVATAR = 'https://tren-socmed.s3-ap-southeast-1.amazonaws.com/public/Profile+Pict+.jpeg'
export const DEFAULT_CAMPAIGN_BANNER = 'https://banksaham.s3-ap-southeast-1.amazonaws.com/public/campaign_illust.svg'
export const DEFAULT_NOTIFICATION_POST = 'https://banksaham.s3.ap-southeast-1.amazonaws.com/public/icons/onlytext.png'

export const moduleBackButton = {
  EMITEN_SETTING: 'a-emiten-setting-dialog'
}

export const cmsMode = {
  EDIT: 'edit'
}

export const personalization = {
  FILTER_WATCHLIST_ITEMS: 'FILTER_WATCHLIST_ITEMS',
  SEARCH_WATCHLIST_ITEMS: 'SEARCH_WATCHLIST_ITEMS',
  SEARCH_PORTFOLIO: 'SEARCH_PORTFOLIO',
  TAB_PORTFOLIO: 'TAB_PORTFOLIO',
  FILTER_PORTFOLIO: 'FILTER_PORTFOLIO',
  RECENT_SEARCHES: 'RECENT_SEARCHES',
  DELETE_RECENT_SEARCH: 'DELETE_RECENT_SEARCH',
  SEARCH_ORDER: 'SEARCH_ORDER',
  FILTER_ORDER: 'FILTER_ORDERS',
  PORTFOLIO_GROUP_BY_WATCHLIST: 'portfolio-group-by-watchlist',
  PORTFOLIO_GROUP_BY_SECTOR: 'portfolio-group-by-sector',
  SEARCH_INDEKS_ITEMS: 'SEARCH_INDEKS_ITEMS',
  FILTER_INDEKS_ITEMS: 'FILTERS_INDEKS_ITEMS',
  LIST_PORTFOLIO: 'LIST_PORTFOLIO'
}

export const sectors = [
  { key: 'A', name: 'Energi' },
  { key: 'B', name: 'Bahan Baku' },
  { key: 'C', name: 'Industri' },
  { key: 'D', name: 'Konsumsi Primer' },
  { key: 'E', name: 'Konsumsi Non-Primer' },
  { key: 'F', name: 'Kesehatan' },
  { key: 'G', name: 'Keuangan' },
  { key: 'H', name: 'Properti' },
  { key: 'I', name: 'Teknologi' },
  { key: 'J', name: 'Infrastruktur' },
  { key: 'K', name: 'Transportasi & Logistik' }
]

export const tradingview = {
  SCRIPT_ID: 'tradingview-chart-script',
  CONTAINER_ID: 'tradingview-chart'
}

export const groupBy = {
  WATCHLIST: 'WATCHLIST',
  SECTOR: 'SECTOR'
}

export const icons = {
  READ_NOTIFICATION: 'https://banksaham.s3.ap-southeast-1.amazonaws.com/public/icons/read-notification.svg',
  BS_LOGO_CIRCLE: 'https://banksaham.s3.ap-southeast-1.amazonaws.com/public/logo/logo-bs_profile.svg'
}

export const illustration = {
  GREEN_CIRCLE_CHECK: 'https://banksaham.s3.ap-southeast-1.amazonaws.com/public/group/Group+181.png',
  BLUE_CIRCLE_CHECK: 'https://banksaham.s3.ap-southeast-1.amazonaws.com/public/illustration/circle-blue-check.svg'
}

export default {
  events,
  TOKEN_KEY,
  PIN_TOKEN_KEY,
  moduleBackButton,
  cmsMode,
  personalization,
  sectors,
  DEFAULT_NOTIFICATION_POST,
  icons,
  illustration
  // TOKEN_KEY
}
