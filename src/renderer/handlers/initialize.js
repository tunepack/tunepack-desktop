import { sendAndWait } from '../utils/handlers'
import * as Channel from '../../shared/constants/channel'

export default () => {
  return sendAndWait(Channel.INITIALIZE)
}
