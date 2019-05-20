import { sendAndWait } from '../utils/handlers'
import * as Channel from '../../shared/constants/channel'

export default (args) => {
  return sendAndWait(Channel.DOWNLOAD, args)
}
