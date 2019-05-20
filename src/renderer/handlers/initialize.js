import { sendAndWait } from '../utils/handlers'
import * as Channel from 'constants/channel'

export default () => {
  return sendAndWait(Channel.INITIALIZE)
}
