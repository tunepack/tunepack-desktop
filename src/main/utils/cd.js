const { spawn } = require('child_process')

const isMac = process.platform === 'darwin'

// TODO: onProgress
const burnFolder = ({ folderName }) => new Promise((resolve, reject) => {
  if (!isMac) {
    return reject(new Error('not-mac'))
  }

  const spawnedBurn = spawn('drutil', [
    'burn',
    '-noverify',
    '-eject',
    '-speed',
    '52',
    folderName
  ])

  let isResolved = false

  const formatStderr = data => {
    if (data.indexOf('No device found.') !== -1) {
      isResolved = true
      return reject(new Error('no-device'))
    }

    return reject(new Error('unknown'))
  }

  // TODO: spawnedBurn.stdout.on('data', formatStdout)
  spawnedBurn.stderr.on('data', formatStderr)

  spawnedBurn.once('exit', () => {
    if (isResolved) {
      return
    }

    resolve()
  })
})

module.exports = {
  burnFolder
}
