module.exports = {
  openExternal,
  openItem,
  showItemInFolder,
  moveItemToTrash
}

const { shell } = require('electron')

function openExternal (url) {
  shell.openExternal(url)
}

function openItem (path) {
  shell.openItem(path)
}

function showItemInFolder (path) {
  shell.showItemInFolder(path)
}

function moveItemToTrash (path) {
  shell.moveItemToTrash(path)
}
