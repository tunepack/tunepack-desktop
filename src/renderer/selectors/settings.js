export const getIsNew = state => { return state.settings.getIn(['data', 'isNew']) }
export const getDownloadsDir = state => { return state.settings.getIn(['data', 'downloadsDir']) }
export const getIsInitialized = state => { return state.settings.get('isInitialized') }
export const getData = state => { return state.settings.get('data') }
