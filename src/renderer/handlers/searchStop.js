import * as Channel from 'constants/Channel'
import { ipcRenderer } from 'electron'

export default (args) => {
  ipcRenderer.send(Channel.SEARCH_STOP, args)
}
