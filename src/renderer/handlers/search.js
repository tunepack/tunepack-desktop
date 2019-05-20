import { sendAndWait } from '../utils/handlers'
import * as Channel from 'constants/channel'

export default ({ query }) => {
  return sendAndWait(Channel.SEARCH, {
    query
  })
}
