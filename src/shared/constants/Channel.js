const INITIALIZE = 'initialize'
const SEARCH = 'search'
const SEARCH_FOUND = `${SEARCH}:found`
const SEARCH_STOP = `${SEARCH}:stop`
const DOWNLOAD = 'download'
const DOWNLOAD_PROGRESS = `${DOWNLOAD}:progress`
const DOWNLOAD_ERROR = `${DOWNLOAD}:error`
const DOWNLOAD_COMPLETE = `${DOWNLOAD}:complete`
const SELECT_DIR = 'select-dir'
const SET_SETTINGS = 'set-settings'
const UPDATE_SETTINGS = 'update-settings'
const RELOAD = 'reload'
const RESET = 'reset'

module.exports = {
  INITIALIZE,
  SEARCH,
  SEARCH_FOUND,
  SEARCH_STOP,
  DOWNLOAD,
  DOWNLOAD_PROGRESS,
  DOWNLOAD_ERROR,
  DOWNLOAD_COMPLETE,
  SELECT_DIR,
  SET_SETTINGS,
  UPDATE_SETTINGS,
  RELOAD,
  RESET
}
