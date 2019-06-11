import * as Channel from 'shared/constants/Channel'
import { createSendAndWait } from '../utils/handlers'
import * as fsUtils from '../utils/fs'

createSendAndWait(Channel.DOWNLOADS_REMOVE, async (event, args) => {
  const {
    downloads
  } = args

  for (const { downloadPath } of downloads) {
    await fsUtils.unlink(downloadPath)
  }

  return true
})
