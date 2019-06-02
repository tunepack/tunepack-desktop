export {
  productName as APP_NAME,
  version as APP_VERSION
} from '../../package.json'

export const REPO_OWNER = 'tunepack'
export const REPO_NAME = 'tunepack-desktop'
export const GA_TRACKING_ID = process.env.GA_TRACKING_ID
export const DEBUG_PROD = process.env.DEBUG_PROD === 'true' || false
export const UPGRADE_EXTENSIONS = process.env.UPGRADE_EXTENSIONS === 'true' || false
export const START_MINIMIZED = process.env.START_MINIMIZED === 'true' || false
