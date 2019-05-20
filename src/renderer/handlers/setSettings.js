import { sendAndWait } from '../utils/handlers'
import * as Channel from 'constants/channel'

export default (newSettings) => {
  return sendAndWait(Channel.SET_SETTINGS, {
    settings: newSettings
  })
}
