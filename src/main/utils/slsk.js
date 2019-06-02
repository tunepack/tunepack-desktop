import faker from 'faker'
import slsk from '../slsk'

export const generateUsername = () => {
  return faker.fake('{{internet.userName}}')
}

export const generatePassword = () => {
  return faker.fake('{{internet.password}}')
}

let _client = null
let _isConnected = false

export const connect = ({
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

export const search = ({
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

export const download = options => {
  return new Promise((resolve, reject) => {
    _client.download(options, (error, res) => {
      if (error) {
        return reject(error)
      }

      resolve(res)
    })
  })
}

export const downloadStream = options => {
  return new Promise((resolve, reject) => {
    _client.downloadStream(options, (error, res) => {
      if (error) {
        return reject(error)
      }

      resolve(res)
    })
  })
}

export const disconnect = () => {
  if (!_isConnected) {
    return
  }

  slsk.disconnect()
  _isConnected = false
}
