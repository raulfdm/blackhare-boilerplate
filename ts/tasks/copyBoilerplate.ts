const fs = require('fs-extra')
import packageJson from './package.json.js'
import {
	installDependencies
} from './buildTasks'
import {
	success,
	error,
	log,
	errorTrace
} from '../helpers/logs'
import Spinner from '../helpers/Spinner'
import { ProjectInfomation } from '../models/ProjectInfo';

const UX_TIME_WAIT = 600

const copyBoilerplate = (projectInfo: ProjectInfomation) => {

	copyFolder(projectInfo)
		.then(generatePackageJson)
		.then(installDependencies)
		.then(() => {
			success('Projeto criado com sucesso!')
			log(finalInstructions(projectInfo))
		})
		.catch(err => {
			errorTrace(err)
			removeFolder(projectInfo.projectPath)
		})
}

const finalInstructions = (infos: any): string => {
	return `Siga as seguintes instruções:
1. Navegue para a pasta do projeto: $ cd ${infos.name}
2. Suba o servidor com o comando: $ ${infos.package_manager.toLowerCase() == 'npm' ? 'npm run' : infos.package_manager } server`
}

const removeFolder = (path: string): void => {
	fs.remove(path)
}

const copyFolder = (projectInfo: ProjectInfomation): Promise<any> => {

	const spin = new Spinner({
		startMessage: 'Gerando os arquivos...',
		successMessage: 'Arquivos gerados com sucesso!',
		failureMessage: 'Erro ao gerar os arquivos!'
	})
	spin.start()

	return new Promise((resolve, reject) => {
		const boilerplateFolder = `${__dirname}/../boilerplate/`
		fs
			.copy(boilerplateFolder, projectInfo.projectPath)
			.then(() => {
				setTimeout(() => {
					spin.done()
					resolve(projectInfo)
				}, UX_TIME_WAIT)
			})
			.catch((err: any) => {
				setTimeout(() => {
					spin.fail()
					reject(err)
				}, UX_TIME_WAIT)
			})
	})
}

const generatePackageJson = (projectInfo: ProjectInfomation) => {
	const spin = new Spinner({
		startMessage: 'Gerando o package.json...',
		successMessage: 'Package.json gerado com sucesso!',
		failureMessage: 'Erro ao gerar o package.json'
	})

	spin.start()

	return new Promise((resolve, reject) => {
		packageJson(projectInfo)
			.then(newInfos => {
				setTimeout(() => {
					spin.done()
					resolve(newInfos)
				}, UX_TIME_WAIT)
			})
			.catch(err => {
				setTimeout(() => {
					spin.fail()
					reject(err)
				}, UX_TIME_WAIT)
			})
	})
}

export default copyBoilerplate
