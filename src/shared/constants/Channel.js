const INITIALIZE = 'initialize'
const SEARCH = 'search'
const DOWNLOAD = 'download'
const DOWNLOAD_PROGRESS = `${DOWNLOAD}:progress`
const DOWNLOAD_ERROR = `${DOWNLOAD}:error`
const DOWNLOAD_COMPLETE = `${DOWNLOAD}:complete`
const SELECT_DIR = 'select-dir'
const SET_SETTINGS = 'set-settings'

module.exports = {
  INITIALIZE,
  SEARCH,
  DOWNLOAD,
  DOWNLOAD_PROGRESS,
  DOWNLOAD_ERROR,
  DOWNLOAD_COMPLETE,
  SELECT_DIR,
  SET_SETTINGS
}
