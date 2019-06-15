import _ from 'lodash'
import prettyBytes from 'pretty-bytes'
import fileExtension from 'file-extension'

import * as Channel from 'shared/constants/Channel'
import * as AudioFileExtension from 'shared/constants/AudioFileExtension'
import { createSendAndWait } from '../utils/handlers'
import * as slsk from '../utils/slsk'
import { getTrackId } from '../utils/tracks'
import { searches } from '../utils/searches'
import { ipcMain } from 'electron'

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

const getFilteredResults = results => {
  const {
    searchFileExtensions,
    searchHasOnlyHighBitrate
  } = settings.getRendererSettings()

  results = results
    .sort((a, b) => {
      return (a.size / a.speed) - (b.size / b.speed)
    })
    .filter(r => {
      return searchFileExtensions.includes(getTrackFileExtension(r))
    })
    .map((r) => { return formatTrack(r) })

  if (results.length > 5) {
    results = results.filter(r => {
      return r.slots
    })
  }

  if (searchHasOnlyHighBitrate) {
    results = results.filter(r => {
      const fileExtension = getTrackFileExtension(r)

      if (fileExtension !== AudioFileExtension.MP3) {
        return true
      }

      return r.bitrate === 320
    })
  }

  return getUniqueArray(results, 'id')
}

const search = (event, args) => new Promise(async (resolve) => {
  let isResolved = false

  const { query } = args
  const searchDuration = settings.getSearchDuration()

  searches[query] = {
    startedOn: ~new Date(),
    resultCount: 0,
    isDone: false,
    results: []
  }

  const handleOnStop = (event, queryKey) => {
    searches[queryKey].isDone = true
    const results = getFilteredResults(searches[queryKey].results)
    isResolved = true
    resolve(results)
  }

  ipcMain.once(Channel.SEARCH_STOP, handleOnStop)

  const throttledFound = _.throttle(track => {
    const searchCache = searches[query]

    event.reply(Channel.SEARCH_FOUND, {
      track,
      resultCount: searchCache.resultCount
    })
  }, FOUND_INTERVAL)

  const handleFound = (track) => {
    if (isResolved) {
      return
    }

    searches[query].resultCount++
    searches[query].results.push(track)
    throttledFound(track)
  }

  const searchRes = await slsk.search({
    query,
    duration: searchDuration,
    onFound: handleFound
  })

  if (isResolved) {
    return
  }

  searches[query].isDone = true

  const results = getFilteredResults(searchRes)
  resolve(results)
})

createSendAndWait(Channel.SEARCH, async (event, args) => {
  const results = await search(event, args)

  return {
    results
  }
})
