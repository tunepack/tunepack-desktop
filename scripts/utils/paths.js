const path = require('path')

const rootPath = path.resolve(__dirname, '../../')
const srcPath = path.resolve(rootPath, 'src')
const rendererPath = path.resolve(srcPath, 'renderer')
const mainPath = path.resolve(srcPath, 'main')
const sharedPath = path.resolve(srcPath, 'shared')
const buildPath = path.resolve(rootPath, 'build')
const iconsPath = path.resolve(rendererPath, 'icons')

module.exports = {
  rootPath,
  srcPath,
  rendererPath,
  mainPath,
  buildPath,
  sharedPath,
  iconsPath
}
