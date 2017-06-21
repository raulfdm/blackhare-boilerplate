const chalk = require('chalk')
const cLog = console.log
const cErr = console.error
const ctrace = console.trace

/*Chalk Styles*/
const errorStyle = chalk.red
const sucessStyle = chalk.green
const infoStyle = chalk.yellow
const boldStyle = chalk.bold

export const error = message => cErr(errorStyle(message))
export const errorTrace = message => ctrace(message)
export const success = message => cLog(sucessStyle(message))
export const info = message => cLog(infoStyle(message))
export const log = message => cLog(message)
export const bold = message => cLog(boldStyle(message))


