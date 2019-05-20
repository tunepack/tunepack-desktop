/* eslint-disable no-console */

const chalk = require('chalk')

const info = message => { return console.log(chalk.bgCyan(message)) }
const error = message => { return console.error(chalk.bgRed(message)) }

module.exports = {
  info,
  error
}
