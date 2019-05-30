import * as Channel from 'src/shared/constants/Channel'
import { ipcRenderer } from 'electron'

export default (args) => {
  ipcRenderer.send(Channel.SEARCH_STOP, args)
}
