module.exports = api => {
  const isElectron = process.env.IS_ELECTRON

  const development = api.env([
    'development',
    'test'
  ])

  let plugins = [
    '@babel/syntax-dynamic-import',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-default-from',
    'lodash'
  ]

  if (isElectron) {
    if (development) {
      plugins.push(
        require('react-hot-loader/babel')
      )
    } else {
      plugins.push(
        require('babel-plugin-dev-expression'),

        // babel-preset-react-optimize
        require('@babel/plugin-transform-react-constant-elements'),
        require('@babel/plugin-transform-react-inline-elements'),
        require('babel-plugin-transform-react-remove-prop-types')
      )
    }
  }

  return {
    'presets': [
      [
        require('@babel/preset-env'),
        {
          targets: {
            electron: require('electron/package.json').version
          },
          useBuiltIns: 'usage',
          corejs: '3.0.1'
        }
      ],
      [
        require('@babel/preset-react'),
        {
          development
        }
      ]
    ],
    plugins
  }
}
