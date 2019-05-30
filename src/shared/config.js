const APP_NAME = 'Tunepack'
const HOME_PAGE_URL = 'https://tunepack.io'
const REPO_OWNER = 'tunepack'
const REPO_NAME = 'tunepack-desktop'
const APP_VERSION = '1.0.7'
const GA_TRACKING_ID = process.env.GA_TRACKING_ID

const stylingVariables = {
  WINDOW_WIDTH: '540px',
  WINDOW_HEIGHT: '768px',
  HEADER_HEIGHT: '40px',
  NAV_HEIGHT: '60px',
  SIDE_PADDING: '12px',
  LIST_ITEM_HEIGHT: '100px',
  VIEW_HEADER_HEIGHT: '80px'
}

module.exports = {
  stylingVariables,
  APP_NAME,
  APP_VERSION,
  HOME_PAGE_URL,
  REPO_OWNER,
  REPO_NAME,
  GA_TRACKING_ID
}
