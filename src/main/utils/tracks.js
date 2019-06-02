import stringHash from 'string-hash'

export const getTrackId = (track) => {
  const rawId = `${track.user}___${track.file}`
  return stringHash(rawId)
}
