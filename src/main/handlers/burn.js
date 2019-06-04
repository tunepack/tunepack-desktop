import * as Channel from 'shared/constants/Channel'
import { createSendAndWait } from '../utils/handlers'
import { dir as createTmpDir } from 'tmp-promise'
import * as BurnType from 'shared/constants/BurnType'
import { burnFolder } from '../utils/cd'
import path from 'path'
import fs from 'fs-extra'

const burnToDisk = async (event, args) => {
  const {
    downloads
  } = args

  const {
    path: tmpPath,
    cleanup: tmpCleanup
  } = await createTmpDir({
    unsafeCleanup: true
  })

  for (const download of downloads) {
    const { downloadPath } = download

    const tmpFilePath = path.resolve(
      tmpPath,
      path.basename(downloadPath)
    )

    await fs.copy(downloadPath, tmpFilePath)
  }

  await burnFolder({
    folderName: tmpPath
  })

  await tmpCleanup()
}

// TODO: BurnType.USB
createSendAndWait(Channel.BURN, async (event, args) => {
  if (args.type === BurnType.DISK) {
    return burnToDisk(event, args)
  }

  return null
})
