import { createSelector } from 'reselect'
import { List } from 'immutable'

export const getDownloadsList = state => { return state.downloadsList }

export const getSortedDownloadsList = createSelector(
  getDownloadsList,
  downloads => {
    if (!downloads) {
      return List()
    }

    return downloads.sort(
      (a, b) => {
        return b.get('createdAt') - a.get('createdAt')
      }
    )
  }
)
