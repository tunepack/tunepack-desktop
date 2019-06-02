import createDebug from 'debug'

const debug = createDebug('tunepack:state')

let _state = {
  isQuitting: false,
  activeStreams: {
    downloadStreams: {}
  }
}

export const getState = () => {
  return _state
}

export const setState = (state) => {
  _state = {
    ..._state,
    ...state
  }
}

export const addActiveStream = (streamId, stream) => {
  _state.activeStreams.downloadStreams[streamId] = stream
}

export const removeActiveStream = (streamId) => {
  delete _state.activeStreams.downloadStreams[streamId]
}

export const destroyActiveStreams = () => {
  const streams = _state.activeStreams.downloadStreams

  for (const [id, s] of Object.entries(streams)) {
    debug(`Destroying active stream: ${id}`)
    s.destroy()
  }

  return true
}
