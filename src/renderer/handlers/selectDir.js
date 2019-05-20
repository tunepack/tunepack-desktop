import { sendAndWait } from '../utils/handlers'
import * as Channel from '../../shared/constants/channel'

export default ({
  defaultPath
}) => {
  return sendAndWait(Channel.SELECT_DIR, {
    defaultPath
  })
}
