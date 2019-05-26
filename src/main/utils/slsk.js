const slsk = require('slsk-client')
const faker = require('faker')

const generateUsername = () => {
  return faker.fake('{{internet.userName}}')
}

const generatePassword = () => {
  return faker.fake('{{internet.password}}')
}

let _client = null
let _isConnected = false

const connect = ({
  username: user,
  password: pass,
  timeout
}) => {
  return new Promise((resolve, reject) => {
    if (_isConnected) {
      return resolve(_client)
    }

    slsk.connect({
      user,
      pass,
      timeout
    }, (error, client) => {
      if (error) {
        return reject(error)
      }

      _isConnected = true
      _client = client
      resolve(client)
    })
  })
}

const search = ({
  query,
  duration,
  onFound
}) => {
  return new Promise((resolve, reject) => {
    onFound && _client.on(`found:${query}`, onFound)

    _client.search({
      req: query,
      timeout: duration
    }, (error, res) => {
      if (error) {
        return reject(error)
      }

      resolve(res)
    })
  })
}

const download = options => {
  return new Promise((resolve, reject) => {
    _client.download(options, (error, res) => {
      if (error) {
        return reject(error)
      }

      resolve(res)
    })
  })
}

const downloadStream = options => {
  return new Promise((resolve, reject) => {
    _client.downloadStream(options, (error, res) => {
      if (error) {
        return reject(error)
      }

      resolve(res)
    })
  })
}

const disconnect = () => {
  if (!_isConnected) {
    return
  }

  slsk.disconnect()
  _isConnected = false
}

module.exports = {
  connect,
  search,
  download,
  downloadStream,
  generateUsername,
  generatePassword,
  disconnect
}
