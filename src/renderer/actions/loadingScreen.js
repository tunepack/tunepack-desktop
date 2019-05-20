import { createAction } from 'utils/redux'

export const TOGGLE = '@loadingScreen/TOGGLE'

export const constants = {
  TOGGLE
}

export const toggle = createAction(TOGGLE)

export default {
  toggle
}
