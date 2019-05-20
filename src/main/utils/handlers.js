const { ipcMain } = require('electron')

const createSendAndWait = (channel, handler) => {
  const receiverChannel = `${channel}:ping`
  const responseChannel = `${channel}:pong`

  const handleResponse = async (event, args) => {
    try {
      const res = await handler(event, args)

      event.reply(responseChannel, {
        success: true,
        error: null,
        ...res
      })
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        throw error
      }

      event.reply(responseChannel, {
        success: false,
        error
      })
    }
  }

  ipcMain.on(receiverChannel, handleResponse)
}

module.exports = {
  createSendAndWait
}
