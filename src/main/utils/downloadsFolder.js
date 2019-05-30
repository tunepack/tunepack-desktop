const { app } = require('electron')
const path = require('path')
const fs = require('fs-extra')
const config = require('../../config')

const defaultDownloadsFolder = path.resolve(app.getPath('music'), config.APP_NAME)

const ensureDefaultDownloadsFolder = () => {
  return fs.ensureDir(defaultDownloadsFolder)
}

module.exports = {
  defaultDownloadsFolder,
  ensureDefaultDownloadsFolder
}
