const { createSendAndWait } = require('../utils/handlers')
const Channel = require('../constants/Channel')
const slsk = require('../utils/slsk')
const settings = require('../utils/settings')

createSendAndWait(Channel.INITIALIZE, async () => {
  const username = settings.getSoulseekUsername()
  const password = settings.getSoulseekPassword()

  await slsk.connect({
    username,
    password
  })

  return {
    settings: settings.getRendererSettings()
  }
})
