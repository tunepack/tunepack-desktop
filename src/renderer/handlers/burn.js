import { sendAndWait } from '../utils/handlers'
import * as Channel from 'shared/constants/Channel'

export default ({ downloads, type, drive, driveName }) => {
  return sendAndWait(Channel.BURN, {
    downloads,
    type,
    drive,
    driveName
  })
}
