/**
 * Re-using js and scss variables
 *
 * These variables will be available in scss as: $window-width: get('WINDOW_WIDTH');
 */
const stylingVariables = {
  WINDOW_WIDTH: '480px',
  WINDOW_HEIGHT: '720px',
  HEADER_HEIGHT: '40px',
  SIDE_PADDING: '12px'
}

const APP_NAME = 'Tunepack'

module.exports = {
  APP_NAME,
  stylingVariables
}
