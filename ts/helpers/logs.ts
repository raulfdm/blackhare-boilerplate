const chalk = require('chalk')
const cLog = console.log
const cErr = console.error
const ctrace = console.trace

/*Chalk Styles*/
const errorStyle = chalk.red
const sucessStyle = chalk.green
const infoStyle = chalk.yellow
const boldStyle = chalk.bold

export const error = (message: string)  => cErr(errorStyle(message))
export const errorTrace = (message: string) => ctrace(message)
export const success = (message: string) => cLog(sucessStyle(message))
export const info = (message: string) => cLog(infoStyle(message))
export const log = (message: string) => cLog(message)
export const bold = (message: string) => cLog(boldStyle(message))


