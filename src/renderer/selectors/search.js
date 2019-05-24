// import searchResultUtils from '../utils/searchResults'
// import * as AudioFileExtension from '../constants/AudioFileExtension'
//
// const getSortedSearchResults = ({
//   searchResults,
//   fileExtensions,
//   hasOnlyHighBitrate
// }) => {
//   const filteredByExtension = searchResults
//     .filter(r => {
//       return fileExtensions.includes(searchResultUtils.getFileExtension(r))
//     })
//
//   if (!hasOnlyHighBitrate) {
//     return filteredByExtension
//   }
//
//   return filteredByExtension.filter(r => {
//     const fileExtension = searchResultUtils.getFileExtension(r)
//
//     if (fileExtension !== AudioFileExtension.MP3) {
//       return true
//     }
//
//     const bitrate = searchResultUtils.getBitrate(r)
//
//     if (!bitrate) {
//       return false
//     }
//
//     return bitrate === 320
//   })
// }

export const getSearchResults = state => {
  return state.search.get('searchResults')
}

export const getIsSearching = state => {
  return state.search.get('isSearching')
}
