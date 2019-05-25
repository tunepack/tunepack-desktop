import { createSelector } from 'reselect'

export const getDownloads = state => { return state.downloads }

export const getDownloadByTrackId = trackId => {
  return createSelector(
    getDownloads,
    (downloads) => {
      return downloads.get(trackId)
    }
  )
}
