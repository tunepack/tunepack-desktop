const slsk = require('slsk-client')
const faker = require('faker')

const generateUsername = () => {
  return faker.fake('{{internet.userName}}')
}

const generatePassword = () => {
  return faker.fake('{{internet.password}}')
}

let _client = null

const connect = ({
  username: user,
  password: pass
}) => {
  return new Promise((resolve, reject) => {
    slsk.connect({
      user,
      pass,
      timeout: 10000
    }, (error, client) => {
      if (error) {
        return reject(error)
      }

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
    onFound && _client.on('found', onFound)

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

module.exports = {
  connect,
  search,
  download,
  downloadStream,
  generateUsername,
  generatePassword
}
