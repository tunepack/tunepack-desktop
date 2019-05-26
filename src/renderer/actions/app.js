import { createAction, createRequestTypes, createRequestAction } from 'utils/redux'

export const SHOW_LOADING = '@app/SHOW_LOADING'
export const SHOW_ERROR = '@app/SHOW_ERROR'

export const RELOAD = '@app/RELOAD'
export const RELOAD_REQUEST = createRequestTypes('@settings/RELOAD_REQUEST')

export const RESET = '@app/RESET'
export const RESET_REQUEST = createRequestTypes('@settings/RESET_REQUEST')

export const constants = {
  SHOW_LOADING,
  SHOW_ERROR,
  RELOAD,
  RELOAD_REQUEST,
  RESET,
  RESET_REQUEST
}

export const showLoading = createAction(SHOW_LOADING)
export const showError = createAction(SHOW_ERROR)
export const reload = createAction(RELOAD)
export const reloadRequest = createRequestAction(RELOAD_REQUEST)
export const reset = createAction(RESET)
export const resetRequest = createRequestAction(RESET_REQUEST)

export default {
  showLoading,
  showError,
  reload,
  reloadRequest,
  reset,
  resetRequest
}
