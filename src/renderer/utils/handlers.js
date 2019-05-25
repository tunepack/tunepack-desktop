import { ipcRenderer } from 'electron'

export const sendAndWait = (channel, args) => {
  return new Promise((resolve, reject) => {
    const receiverChannel = `${channel}:ping`
    const responseChannel = `${channel}:pong`

    ipcRenderer.once(responseChannel, (event, args) => {
      if (args.success === true) {
        return resolve(args)
      }

      reject(args)
    })

    ipcRenderer.send(receiverChannel, args)
  })
}
