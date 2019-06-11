import path from 'path'
import * as paths from './scripts/utils/paths'
import { getPagePrompt } from './scripts/utils/plop'
import pascalCase from 'pascal-case'

module.exports = plop => {
  plop.setGenerator('component', {
    description: 'create a react component',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'What is the name of the component? (in PascalCase)',
      validate: input => input !== '',
      transformer: input => pascalCase(input)
    }, {
      type: 'checkbox',
      name: 'features',
      message: 'What are the feature of the component?',
      choices: [{
        name: 'Is it a container?',
        value: 'isContainer',
        checked: false
      }, {
        name: 'Page component?',
        value: 'isPage',
        checked: true
      }, {
        name: 'Use styles?',
        value: 'hasStyles',
        checked: true
      }]
    }, getPagePrompt({
      name: 'page',
      when: answers => {
        const { features } = answers
        return features.includes('isPage')
      }
    })],
    actions: answers => {
      const {
        name,
        page,
        features
      } = answers

      const hasStyles = features.includes('hasStyles')
      const isContainer = features.includes('isContainer')

      const actions = []

      const rootDir = page ? path.resolve(paths.pagesPath, page) : paths.rendererPath
      const componentDir = isContainer ? 'containers' : 'components'
      const dir = path.join(rootDir, `/${componentDir}/${name}`)

      if (hasStyles) {
        actions.push({
          type: 'add',
          path: path.join(dir, `${name}.scss`),
          templateFile: './scripts/plop-templates/component/styles.hbs'
        })
      }

      actions.push({
        type: 'add',
        path: path.join(dir, `${name}.js`),
        templateFile: hasStyles
          ? './scripts/plop-templates/component/component-with-styles.hbs'
          : './scripts/plop-templates/component/component.hbs'
      })

      return actions
    }
  })
}
