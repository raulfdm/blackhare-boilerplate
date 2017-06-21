const chalk = require('chalk')
const cLog = console.log
const cErr = console.error
const ctrace = console.trace

/*Chalk Styles*/
const errorStyle = chalk.red
const sucessStyle = chalk.green
const infoStyle = chalk.yellow
const boldStyle = chalk.bold

const error = message => cErr(errorStyle(message))
const errorTrace = message => ctrace(message)
const success = message => cLog(sucessStyle(message))
const info = message => cLog(infoStyle(message))
const log = message => cLog(message)
const bold = message => cLog(boldStyle(message))

module.exports = {
  error,
  success,
  info,
  log,
  errorTrace,
  bold
}
