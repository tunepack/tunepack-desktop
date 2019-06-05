import { createAction, createRequestTypes, createRequestAction } from 'utils/redux'

export const INITIALIZE = '@settings/INITIALIZE'
export const INITIALIZE_REQUEST = createRequestTypes('@settings/INITIALIZE_REQUEST')

export const SELECT_DIR = '@settings/SELECT_DIR'
export const SELECT_DIR_REQUEST = createRequestTypes('@settings/SELECT_DIR_REQUEST')

export const SET_SETTINGS = '@settings/SET_SETTINGS'
export const SET_SETTINGS_REQUEST = createRequestTypes('@settings/SET_SETTINGS_REQUEST')
export const SELECT_DOWNLOAD_DIR = '@settings/SELECT_DOWNLOAD_DIR'

export const ON_UPDATE_SETTINGS = '@settings/ON_UPDATE_SETTINGS'

export const TOGGLE_IS_BURNING = '@settings/TOGGLE_IS_BURNING'
export const TOGGLE_DOWNLOAD_SELECT_ALL = '@settings/TOGGLE_DOWNLOAD_SELECT_ALL'
export const TOGGLE_DOWNLOAD_SELECT_BURNING = '@settings/TOGGLE_DOWNLOAD_SELECT_BURNING'
export const SET_SELECTED_FOR_BURNING = '@settings/SET_SELECTED_FOR_BURNING'
export const BURN_CONTINUE = '@settings/BURN_CONTINUE'

export const BURN = '@settings/BURN'
export const BURN_REQUEST = createRequestTypes('@settings/BURN_REQUEST')

export const ON_BURN_PROGRESS = '@settings/ON_BURN_PROGRESS'

export const BURN_RESET = '@settings/BURN_RESET'

export const GET_DRIVES = '@settings/GET_DRIVES'
export const GET_DRIVES_REQUEST = createRequestTypes('@settings/GET_DRIVES_REQUEST')

export const constants = {
  INITIALIZE,
  INITIALIZE_REQUEST,
  SELECT_DIR,
  SELECT_DIR_REQUEST,
  SET_SETTINGS,
  SET_SETTINGS_REQUEST,
  SELECT_DOWNLOAD_DIR,
  ON_UPDATE_SETTINGS,
  TOGGLE_IS_BURNING,
  TOGGLE_DOWNLOAD_SELECT_BURNING,
  TOGGLE_DOWNLOAD_SELECT_ALL,
  SET_SELECTED_FOR_BURNING,
  BURN_CONTINUE,
  BURN,
  BURN_REQUEST,
  ON_BURN_PROGRESS,
  BURN_RESET,
  GET_DRIVES,
  GET_DRIVES_REQUEST
}

export const initialize = createAction(INITIALIZE)
export const initializeRequest = createRequestAction(INITIALIZE_REQUEST)

export const selectDir = createAction(SELECT_DIR)
export const selectDirRequest = createRequestAction(SELECT_DIR_REQUEST)

export const setSettings = createAction(SET_SETTINGS)
export const setSettingsRequest = createRequestAction(SET_SETTINGS_REQUEST)

export const selectDownloadDir = createAction(SELECT_DOWNLOAD_DIR)

export const onUpdateSettings = createAction(ON_UPDATE_SETTINGS)
export const onBurnProgress = createAction(ON_BURN_PROGRESS)

export const toggleIsBurning = createAction(TOGGLE_IS_BURNING)
export const toggleDownloadSelectBurning = createAction(TOGGLE_DOWNLOAD_SELECT_BURNING)
export const toggleDownloadSelectAll = createAction(TOGGLE_DOWNLOAD_SELECT_ALL)
export const setSelectedForBurning = createAction(SET_SELECTED_FOR_BURNING)
export const setBurnContinue = createAction(BURN_CONTINUE)

export const burn = createAction(BURN)
export const burnRequest = createRequestAction(BURN_REQUEST)
export const burnReset = createAction(BURN_RESET)

export const getDrives = createAction(GET_DRIVES)
export const getDrivesRequest = createRequestAction(GET_DRIVES_REQUEST)

export default {
  initialize,
  initializeRequest,
  selectDir,
  selectDirRequest,
  setSettings,
  setSettingsRequest,
  selectDownloadDir,
  onUpdateSettings,
  toggleIsBurning,
  toggleDownloadSelectBurning,
  toggleDownloadSelectAll,
  setSelectedForBurning,
  setBurnContinue,
  burn,
  burnRequest,
  burnReset,
  onBurnProgress,
  getDrives,
  getDrivesRequest
}
