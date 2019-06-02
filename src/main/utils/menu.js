import { APP_NAME } from 'shared/config'

export function getMenuTemplate () {
  const isMac = process.platform === 'darwin'

  return isMac ? [{
    label: APP_NAME,
    submenu: [{
      role: 'about'
    }, {
      role: 'quit'
    }]
  }, {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'selectAll' }
    ]
  }] : []
}
