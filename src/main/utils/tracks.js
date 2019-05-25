const stringHash = require('string-hash')

const getTrackId = (track) => {
  const rawId = `${track.user}___${track.file}`
  return stringHash(rawId)
}

module.exports = {
  getTrackId
}
