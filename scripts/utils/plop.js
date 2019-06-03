import fs from 'fs'
import path from 'path'
import * as pages from './paths'

const pagesDirs = fs
  .readdirSync(pages.pagesPath)
  .filter(f => fs.statSync(path.join(pages.pagesPath, f)).isDirectory())

const getPages = () => {
  return pagesDirs
    .map(page => {
      return page.replace(pages.pagesPath + '/', '')
    })
    .filter(p => p !== 'index.js')
    .map(page => {
      const name = page.split('/')[0]

      return {
        name
      }
    })
}

export const getPagePrompt = ({
  name,
  message = 'Select a page',
  when
}) => {
  const pages = getPages()

  return {
    name,
    message,
    when,
    type: 'list',
    choices: pages
  }
}
