import { sendAndWait } from '../utils/handlers'
import * as Channel from 'shared/constants/Channel'

export default () => {
  return sendAndWait(Channel.RELOAD)
}
