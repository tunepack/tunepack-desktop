import { sendAndWait } from '../utils/handlers'
import * as Channel from 'src/shared/constants/Channel'

export default (args) => {
  return sendAndWait(Channel.DOWNLOAD, args)
}
