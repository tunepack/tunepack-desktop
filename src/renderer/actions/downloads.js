import { createAction, createRequestTypes, createRequestAction } from 'utils/redux'

export const SEARCH = '@downloads/SEARCH'
export const SEARCH_REQUEST = createRequestTypes('@downloads/SEARCH_REQUEST')

export const ON_SEARCH_FOUND = '@downloads/ON_SEARCH_FOUND'

export const DOWNLOAD = '@downloads/DOWNLOAD'
export const DOWNLOAD_REQUEST = createRequestTypes('@downloads/DOWNLOAD_REQUEST')

export const ON_DOWNLOAD_PROGRESS = '@downloads/ON_DOWNLOAD_PROGRESS'
export const ON_DOWNLOAD_ERROR = '@downloads/ON_DOWNLOAD_ERROR'
export const ON_DOWNLOAD_COMPLETE = '@downloads/ON_DOWNLOAD_COMPLETE'
export const ON_DOWNLOAD_SPEED = '@downloads/ON_DOWNLOAD_SPEED'

export const constants = {
  DOWNLOAD,
  DOWNLOAD_REQUEST,
  SEARCH,
  ON_SEARCH_FOUND,
  SEARCH_REQUEST,
  ON_DOWNLOAD_PROGRESS,
  ON_DOWNLOAD_ERROR,
  ON_DOWNLOAD_COMPLETE,
  ON_DOWNLOAD_SPEED
}

export const download = createAction(DOWNLOAD)
export const downloadRequest = createRequestAction(DOWNLOAD_REQUEST)
export const search = createAction(SEARCH)
export const searchRequest = createRequestAction(SEARCH_REQUEST)
export const onSearchFound = createAction(ON_SEARCH_FOUND)
export const onDownloadProgress = createAction(ON_DOWNLOAD_PROGRESS)
export const onDownloadError = createAction(ON_DOWNLOAD_ERROR)
export const onDownloadComplete = createAction(ON_DOWNLOAD_COMPLETE)
export const onDownloadSpeed = createAction(ON_DOWNLOAD_SPEED)

export default {
  download,
  downloadRequest,
  search,
  searchRequest,
  onSearchFound,
  onDownloadProgress,
  onDownloadError,
  onDownloadComplete,
  onDownloadSpeed
}
