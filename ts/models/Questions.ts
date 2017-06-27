import {
	error,
	info
} from '../helpers/logs'

export class Questions {
	readonly _projectName = {
		type: 'input',
		name: 'name',
		default: 'my-project',
		message: 'Qual o nome do seu projet?',
		validate(input: string) {
			if (input.length < 3) {
				error('\nNome precisa ter no mínimo 3 caracteres!')
			} else {
				return true
			}
		},
		filter(projectName: string) {

			 const fixedName = this.handleProjectName(projectName)
			return fixedName
		}
	}

	readonly _projectVersion = {
		type: 'input',
		name: 'version',
		default: '0.0.1',
		message: 'Informe a versão:',
		validate(input: string) {
			if (/\d\.\d\.\d/g.test(input)) {
				return true
			} else {
				error('Máscara de versão incorreta! Tente x.x.x')
			}
		}
	}

	readonly _projectPackageManager = {
		type: 'list',
		name: 'package_manager',
		message: 'Escolha o gerenciador de dependencias',
		default: 'yarn',
		choices: [
			'npm', 'yarn'
		],
	}

	readonly _projectConfirmation = {
		type: 'confirm',
		name: 'confirmation',
		default: 'Y',
		message: 'As informações acima estão corretas?'
	}

	private handleProjectName = (name: string): string => {
		return name
			.toLowerCase()
			.replace(/s/g, '-')
	}

	getThemAll() {
		return [
			this._projectName,
			this._projectVersion,
			this._projectPackageManager
		]
	}

}
