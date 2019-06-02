/* eslint-disable no-console */

import chalk from 'chalk'

export const info = message => { return console.log(chalk.bgCyan(message)) }
export const error = message => { return console.error(chalk.bgRed(message)) }
