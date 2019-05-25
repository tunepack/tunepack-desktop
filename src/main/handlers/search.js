const { createSendAndWait } = require('../utils/handlers')
const Channel = require('../constants/Channel')
const AudioFileExtension = require('../constants/AudioFileExtension')
const slsk = require('../utils/slsk')
const { getTrackId } = require('../utils/tracks')
const prettyBytes = require('pretty-bytes')
const fileExtension = require('file-extension')
const _ = require('lodash')
const searches = require('../utils/searches')

const FOUND_INTERVAL = 16

const getTrackFileExtension = (track) => {
  return fileExtension(track.file)
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

const settings = require('../utils/settings')

const formatTrack = r => {
  return {
    ...r,
    id: getTrackId(r),
    fileSize: prettyBytes(r.size),
    bitrate: r.bitrate || null,
    fileExtension: getTrackFileExtension(r),
    fileName: getFileName(r),
    folderName: getFolderName(r)
  }
}

const getUniqueArray = (array, key) => {
  return array
    .map(i => { return i[key] })
    .map((e, i, final) => { return final.indexOf(e) === i && i })
    .filter(e => { return array[e] }).map(e => { return array[e] })
}

createSendAndWait(Channel.SEARCH, async (event, args) => {
  const { query } = args

  const {
    searchFileExtensions,
    searchHasOnlyHighBitrate
  } = settings.getRendererSettings()

  const searchDuration = settings.getSearchDuration()

  searches[query] = {
    startedOn: ~new Date(),
    resultCount: 0,
    isDone: false,
    results: []
  }

  const throttledFound = _.throttle(track => {
    const searchCache = searches[query]

    event.reply(Channel.SEARCH_FOUND, {
      track,
      resultCount: searchCache.resultCount
    })
  }, FOUND_INTERVAL)

  const handleFound = (track) => {
    searches[query].resultCount++
    searches[query].results.push(track)
    throttledFound(track)
  }

  const searchRes = await slsk.search({
    query,
    duration: searchDuration,
    onFound: handleFound
  })

  searches[query].isDone = true

  let results = searchRes
    .sort((a, b) => {
      return (a.size / a.speed) - (b.size / b.speed)
    })
    .filter(r => {
      return r.slots
    })
    .filter(r => {
      return searchFileExtensions.includes(getTrackFileExtension(r))
    })
    .map((r) => { return formatTrack(r) })

  if (searchHasOnlyHighBitrate) {
    results = results.filter(r => {
      const fileExtension = getTrackFileExtension(r)

      if (fileExtension !== AudioFileExtension.MP3) {
        return true
      }

      return r.bitrate === 320
    })
  }

  results = getUniqueArray(results, 'id')

  return {
    results
  }
})
