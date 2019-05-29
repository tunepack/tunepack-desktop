const request = require('request-promise-native')

const getLatestRelease = ({
  owner,
  repo
}) => {
  return request.get({
    url: `https://api.github.com/repos/${owner}/${repo}/releases/latest`,
    headers: {
      'User-Agent': 'request'
    },
    json: true
  })
}

module.exports = getLatestRelease
