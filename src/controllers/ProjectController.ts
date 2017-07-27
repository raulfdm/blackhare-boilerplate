const inquirer = require('inquirer')
const beautify = require('js-beautify')
import Log from '../helpers/Log'
import copyBoilerplate from '../tasks/copyBoilerplate'


export default class PorjectController {
	logs: Log = new Log()


	bootstrap() {
		inquirer
			.prompt(this._initialQuestions())
			.then((projectInfos: any) => {
				this._confirmProjectInfos(projectInfos).then((cb: any) => {
					if (cb.confirmation) {
						copyBoilerplate(projectInfos.project)
					} else {
						process.exit()
					}
				})
			})
	}

	private _initialQuestions(): Array<Object> {

		return [{
			type: 'input',
			name: 'project.name',
			default: 'my-project',
			message: 'Qual o nome do seu projet?',
			validate(input: any) {
				if (input.length < 3) {
					this.logs.error('\nNome precisa ter no mínimo 3 caracteres!')
				} else {
					return true
				}
			},
			filter(projectName: any) {
				return projectName
					.toLowerCase()
					.replace(/s/g, '-')
			}
		}, {
			type: 'input',
			name: 'project.version',
			default: '0.0.1',
			message: 'Informe a versão:',
			validate(input: any) {
				if (/\d\.\d\.\d/g.test(input)) {
					return true
				} else {
					this.logs.error('Máscara de versão incorreta! Tente x.x.x')
				}
			}
		}, {
			type: 'list',
			name: 'project.package_manager',
			message: 'Escolha o gerenciador de dependencias',
			default: 'yarn',
			choices: [
				'npm', 'yarn'
			],
		}]
	}

	private _confirmProjectInfos = (projectInfos: any) => {
		this.logs.info(this._formatProjectInfos(projectInfos))

		const question = [{
			type: 'confirm',
			name: 'confirmation',
			default: 'Y',
			message: 'As informações acima estão corretas?'
		}]
		return inquirer.prompt(question)
	}

	private _formatProjectInfos = (json: JSON) => `\n${beautify(JSON.stringify(json))}\n`
}
