import { sendAndWait } from '../utils/handlers'
import * as Channel from 'constants/Channel'

export default () => {
  return sendAndWait(Channel.INITIALIZE)
}
