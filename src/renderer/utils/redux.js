const START = 'START'
const SUCCESS = 'SUCCESS'
const ERROR = 'ERROR'

export function createRequestTypes (base) {
  return [START, SUCCESS, ERROR].reduce((acc, type) => {
    acc[type] = `${base}_${type}`
    return acc
  }, {})
}

export function createRequestAction (type) {
  return {
    start: createAction(type.START),
    success: createAction(type.SUCCESS),
    error: createAction(type.ERROR)
  }
}

export const createAction = (type) => {
  return (payload, meta) => {
    const action = {
      type
    }

    if (payload !== undefined) {
      action.payload = payload
    }

    if (meta !== undefined) {
      action.meta = meta
    }

    return action
  }
}

export function createReducer (initialState, handlers) {
  return function reducer (state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    }

    return state
  }
}
