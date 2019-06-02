import { sendAndWait } from '../utils/handlers'
import * as Channel from 'shared/constants/Channel'

export default (query) => {
  return sendAndWait(Channel.SEARCH, {
    query
  })
}
