import fileExtension from 'file-extension'
import prettyBytes from 'pretty-bytes'

const getFileExtension = (r) => {
  return fileExtension(r.file)
}

const getBitrate = (r) => {
  return r.bitrate || null
}

const removeFileExtension = fileName => {
  const lastDotPosition = fileName.lastIndexOf('.')

  if (lastDotPosition === -1) {
    return fileName
  }

  return fileName.substr(0, lastDotPosition)
}

const getFileName = (r, hasFileExtension = false) => {
  const { file } = r
  const match = file.match(/[^\\]+$/)
  const fileName = match[0] ? match[0] : file

  if (!hasFileExtension) {
    return removeFileExtension(fileName)
  }

  return fileName
}

const getFolderName = (r) => {
  const { file } = r
  const [
    fileName,
    folderName
  ] = file
    .split('\\')
    .reverse()

  if (fileName) {
    return folderName
  }

  return file
}

const getFileSize = (r) => {
  return prettyBytes(r.size)
}

export default {
  getFileExtension,
  getBitrate,
  getFileName,
  getFolderName,
  getFileSize
}
