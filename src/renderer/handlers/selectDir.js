import { sendAndWait } from '../utils/handlers'
import * as Channel from 'shared/constants/Channel'

export default ({
  defaultPath
}) => {
  return sendAndWait(Channel.SELECT_DIR, {
    defaultPath,
    properties: [
      'openDirectory',
      'createDirectory'
    ]
  })
}
