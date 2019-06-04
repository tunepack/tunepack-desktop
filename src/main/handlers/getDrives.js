import * as Channel from 'shared/constants/Channel'
import { createSendAndWait } from '../utils/handlers'
import { list } from 'drivelist'

createSendAndWait(Channel.GET_DRIVES, async () => {
  const drives = await list()

  return {
    drives
  }
})
