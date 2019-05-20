const { app } = require('electron')
const path = require('path')
const fs = require('fs-extra')
const sharedConfig = require('../../shared/config')

const defaultDownloadsFolder = path.resolve(app.getPath('music'), sharedConfig.APP_NAME)

const ensureDefaultDownloadsFolder = () => {
  return fs.ensureDir(defaultDownloadsFolder)
}

module.exports = {
  defaultDownloadsFolder,
  ensureDefaultDownloadsFolder
}
