import path from 'path'

export const rootPath = path.resolve(__dirname, '../../')
export const srcPath = path.resolve(rootPath, 'src')
export const rendererPath = path.resolve(srcPath, 'renderer')
export const mainPath = path.resolve(srcPath, 'main')
export const sharedPath = path.resolve(srcPath, 'shared')
export const buildPath = path.resolve(rootPath, 'build')
export const iconsPath = path.resolve(rendererPath, 'icons')
