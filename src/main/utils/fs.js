const fs = require('fs')
const { promisify } = require('util')
const stat = promisify(fs.stat)

const getDoesFileExist = async path => {
  try {
    await stat(path)
    return true
  } catch (e) {
    return false
  }
}

const unlink = promisify(fs.unlink)

module.exports = {
  unlink,
  getDoesFileExist
}