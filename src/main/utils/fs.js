const fs = require('fs')
const { promisify } = require('util')
const stat = promisify(fs.stat)

export const getDoesFileExist = async path => {
  try {
    await stat(path)
    return true
  } catch (e) {
    return false
  }
}

export const copyFile = promisify(fs.copyFile)
export const unlink = promisify(fs.unlink)
