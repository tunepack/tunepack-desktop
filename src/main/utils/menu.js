const config = require('../config')

function getMenuTemplate () {
  return (process.platform === 'darwin') ? [{
    label: config.APP_NAME,
    submenu: [{
      role: 'about'
    }, {
      role: 'quit'
    }]
  }] : []
}

module.exports = {
  getMenuTemplate
}
