import Analytics from 'electron-google-analytics'
import config from 'shared/config'

const analytics = new Analytics(config.GA_TRACKING_ID)

let _clientId = null

export const setUid = uid => {
  analytics.set('uid', uid)
}

export const initialize = async () => {
  const { clientId } = await analytics.pageview('https://tunepack.desktop.io', '/', 'Tunepack Desktop')
  _clientId = clientId
}

export const sendEvent = ({
  category,
  action,
  label: evLabel,
  value: evValue
}) => {
  analytics.event(category, action, {
    evLabel,
    evValue,
    clientId: _clientId
  })
}
