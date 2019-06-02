import { ipcMain } from 'electron'

export const createSendAndWait = (channel, handler) => {
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
      event.reply(responseChannel, {
        success: false,
        error: error.message || 'unknown-error'
      })

      if (process.env.NODE_ENV === 'development') {
        throw error
      }
    }
  }

  ipcMain.on(receiverChannel, handleResponse)
}
