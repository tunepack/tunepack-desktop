import { app } from 'electron'
import path from 'path'
import fs from 'fs-extra'
import * as config from 'shared/config'

export const defaultDownloadsFolder = path.resolve(app.getPath('music'), config.APP_NAME)

export const ensureDefaultDownloadsFolder = () => {
  return fs.ensureDir(defaultDownloadsFolder)
}
