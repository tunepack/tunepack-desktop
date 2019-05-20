import { sendAndWait } from '../utils/handlers'
import * as Channel from 'constants/channel'

export default (args) => {
  return sendAndWait(Channel.DOWNLOAD, args)
}
