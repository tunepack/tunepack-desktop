import { sendAndWait } from '../utils/handlers'
import * as Channel from 'src/shared/constants/Channel'

export default (newSettings) => {
  return sendAndWait(Channel.SET_SETTINGS, {
    settings: newSettings
  })
}
