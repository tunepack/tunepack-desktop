const pkg = require('../../package')

const APP_NAME = 'Tunepack'
const APP_VERSION = pkg.version

const stylingVariables = {
  WINDOW_WIDTH: '540px',
  WINDOW_HEIGHT: '680px',
  HEADER_HEIGHT: '40px',
  NAV_HEIGHT: '60px',
  SIDE_PADDING: '12px',
  LIST_ITEM_HEIGHT: '100px',
  VIEW_HEADER_HEIGHT: '80px'
}

module.exports = {
  stylingVariables,
  APP_NAME,
  APP_VERSION
}
