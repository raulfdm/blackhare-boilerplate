const exec = require('child_process').exec
const Spinner = require('../helpers/spinners')

const buildTask = (packageManager, path) => {

    return new Promise((resolve, reject) => {
        const commands = {
            downFolder: `cd ${path}`,
            install: `${packageManager} install`,
            server: `${packageManager} run server`,
            full() {
                return `${this.downFolder} && ${this.install} && ${this.server}`
            }
        }

        exec(commands.downFolder + ' && ' + commands.install, (err, stdout, stderr) => {
            const spinner = new Spinner({
                startMessage: 'Installing dependencies and build up the project!',
                successMessage: 'Dependencies installed and project built up!'
            })

            spinner.succeed()
        })

        exec(commands.downFolder + ' && ' + commands.server, (err, stdout, stderr) => {
            const spinner = ora('Starting server...').start()
            spinner
                .stop()
                .succeed()
        })

    })
}

module.exports = buildTask