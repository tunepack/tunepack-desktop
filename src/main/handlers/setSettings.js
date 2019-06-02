import * as Channel from 'shared/constants/Channel'
import { createSendAndWait } from '../utils/handlers'
import * as settings from '../utils/settings'

createSendAndWait(Channel.SET_SETTINGS, async (event, args) => {
  return {
    settings: settings.setRendererSettings(args.settings)
  }
})
