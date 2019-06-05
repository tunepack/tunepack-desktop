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
export const getIsBurningContinued = state => { return state.settings.get('isBurningContinued') }

export const getIsAllSelectedForBurning = createSelector(
  getSelectedForBurning,
  getDownloadsList,
  (selectedForBurning, downloadsList) => {
    return selectedForBurning.count() === downloadsList.count()
  }
)

export const getDrives = state => { return state.settings.get('drives') }
export const getIsExecutingGetDrives = state => { return state.settings.get('isExecutingGetDrives') }
export const getIsExecutingBurning = state => { return state.settings.get('isExecutingBurning') }
export const getBurningError = state => { return state.settings.get('burningError') }
export const getBurnProgress = state => { return state.settings.get('burnProgress') }
export const getIsBurned = state => { return state.settings.get('isBurned') }
