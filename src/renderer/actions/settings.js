import { createAction, createRequestTypes, createRequestAction } from 'utils/redux'

export const INITIALIZE = '@settings/INITIALIZE'
export const INITIALIZE_REQUEST = createRequestTypes('@settings/INITIALIZE_REQUEST')

export const SELECT_DIR = '@settings/SELECT_DIR'
export const SELECT_DIR_REQUEST = createRequestTypes('@settings/SELECT_DIR_REQUEST')

export const SET_SETTINGS = '@settings/SET_SETTINGS'
export const SET_SETTINGS_REQUEST = createRequestTypes('@settings/SET_SETTINGS_REQUEST')

export const constants = {
  INITIALIZE,
  INITIALIZE_REQUEST,
  SELECT_DIR,
  SELECT_DIR_REQUEST,
  SET_SETTINGS,
  SET_SETTINGS_REQUEST
}

export const initialize = createAction(INITIALIZE)
export const initializeRequest = createRequestAction(INITIALIZE_REQUEST)

export const selectDir = createAction(SELECT_DIR)
export const selectDirRequest = createRequestAction(SELECT_DIR_REQUEST)

export const setSettings = createAction(SET_SETTINGS)
export const setSettingsRequest = createRequestAction(SET_SETTINGS_REQUEST)

export default {
  initialize,
  initializeRequest,
  selectDir,
  selectDirRequest,
  setSettings,
  setSettingsRequest
}
