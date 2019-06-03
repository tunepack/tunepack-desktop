import { createSelector } from 'reselect'
import { getDownloadsList } from './downloadsList'

export const getDownloadsDir = state => { return state.settings.getIn(['data', 'downloadsDir']) }
export const getIsInitialized = state => { return state.settings.get('isInitialized') }
export const getData = state => { return state.settings.get('data') }
export const getIsResetting = state => { return state.settings.get('isResetting') }
export const getHasNewRelease = state => { return state.settings.get('hasNewRelease') }
export const getLatestReleaseInfo = state => { return state.settings.get('latestReleaseInfo') }
export const getIsBurning = state => { return state.settings.get('isBurning') }
export const getSelectedForBurning = state => { return state.settings.get('selectedForBurning') }

export const getIsAllSelectedForBurning = createSelector(
  getSelectedForBurning,
  getDownloadsList,
  (selectedForBurning, downloadsList) => {
    return selectedForBurning.count() === downloadsList.count()
  }
)
