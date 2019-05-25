import { sendAndWait } from '../utils/handlers'
import * as Channel from 'constants/Channel'

export default (query) => {
  return sendAndWait(Channel.SEARCH, {
    query
  })
}
