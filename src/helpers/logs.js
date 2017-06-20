const chalk = require('chalk')
const cLog = console.log
const cErr = console.error

/*Chalk Styles*/
const errorStyle = chalk.bold.red
const sucessStyle = chalk.bold.green
const infoStyle = chalk.bold.blue

const error = message => cErr(errorStyle(message))
const success = message => cLog(sucessStyle(message))
const info = message => cLog(infoStyle(message))

module.exports = {
	error,
	success,
	info
}
