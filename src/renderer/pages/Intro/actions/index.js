import { createAction, createRequestTypes, createRequestAction } from 'utils/redux'

export const SELECT_DOWNLOADS_DIR = '@pages/intro/SELECT_DOWNLOADS_DIR'
export const SELECT_DOWNLOADS_DIR_REQUEST = createRequestTypes('@pages/intro/SELECT_DOWNLOADS_DIR_REQUEST')

export const SUBMIT = '@pages/intro/SUBMIT'

export const constants = {
  SELECT_DOWNLOADS_DIR,
  SELECT_DOWNLOADS_DIR_REQUEST,
  SUBMIT
}

export const selectDownloadsDir = createAction(SELECT_DOWNLOADS_DIR)
export const selectDownloadsDirRequest = createRequestAction(SELECT_DOWNLOADS_DIR_REQUEST)
export const submit = createAction(SUBMIT)

export default {
  selectDownloadsDir,
  selectDownloadsDirRequest,
  submit
}
