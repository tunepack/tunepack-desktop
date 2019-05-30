import { sendAndWait } from '../utils/handlers'
import * as Channel from 'src/shared/constants/Channel'

export default () => {
  return sendAndWait(Channel.RESET)
}
