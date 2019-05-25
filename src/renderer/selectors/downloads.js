import { createSelector } from 'reselect'
import { List } from 'immutable'

export const getDownloads = state => { return state.downloads }

export const getDownloadByTrackId = trackId => {
  return createSelector(
    getDownloads,
    (downloads) => {
      return downloads.get(trackId)
    }
  )
}

export const getDownloadsList = createSelector(
  getDownloads,
  (downloads) => {
    const items = []

    downloads.forEach(download => {
      items.push(download.get('track'))
    })

    return List(items)
  }
)
