import { sendAndWait } from '../utils/handlers'
import * as Channel from '../../shared/constants/channel'

export default ({ query }) => {
  return sendAndWait(Channel.SEARCH, {
    query
  })
}
