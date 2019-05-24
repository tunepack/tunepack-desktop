import { sendAndWait } from '../utils/handlers'
import * as Channel from 'constants/Channel'

export default ({
  defaultPath
}) => {
  return sendAndWait(Channel.SELECT_DIR, {
    defaultPath
  })
}
