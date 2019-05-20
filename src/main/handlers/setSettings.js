const Channel = require('../constants/Channel')
const { createSendAndWait } = require('../utils/handlers')
const settings = require('../utils/settings')

createSendAndWait(Channel.SET_SETTINGS, async (event, args) => {
  return {
    settings: settings.setRendererSettings(args.settings)
  }
})
