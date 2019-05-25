const { createSendAndWait } = require('../utils/handlers')
const Channel = require('../constants/Channel')
const slsk = require('../utils/slsk')
const settings = require('../utils/settings')

createSendAndWait(Channel.INITIALIZE, async () => {
  const username = settings.getSoulseekUsername()
  const password = settings.getSoulseekPassword()

  try {
    await slsk.connect({
      username,
      password,
      timeout: 10000
    })
  } catch (e) {
    const isNoConnectionError = e.message.includes('ENOTFOUND')

    if (isNoConnectionError) {
      throw new Error('no-connection')
    }

    const isTimeoutError = e.message.includes('timeout')

    if (isTimeoutError) {
      throw new Error('timeout')
    }

    throw e
  }

  return {
    settings: settings.getRendererSettings()
  }
})
