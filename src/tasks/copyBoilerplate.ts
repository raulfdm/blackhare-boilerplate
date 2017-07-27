const fs = require('fs-extra')
const path = require('path')
import packageJson from './package.json.js'
import { installDependencies } from './buildTasks'
import Log from '../helpers/Log'
import Spinner from '../helpers/Spinner'

const UX_TIME_WAIT = 600

const copyBoilerplate = (projectInfos: any) => {
	const logs = new Log()
	const completeProjectInfos = getPaths(projectInfos)

	copyFolder(completeProjectInfos)
		.then(generatePackageJson)
		.then(installDependencies)
		.then(() => {
			logs.success('Projeto criado com sucesso!')
			logs.log(finalInstructions(projectInfos))
		})
		.catch(err => {
			logs.errorTrace(err)
			removeFolder(projectInfos.projectRoot)
		})
}

const finalInstructions = (infos: any) => {
	return `Siga as seguintes instruções:
1. Navegue para a pasta do projeto: $ cd ${infos.name}
2. Suba o servidor com o comando: $ ${infos.package_manager.toLowerCase() == 'npm' ? 'npm run' : infos.package_manager} server`
}

const getPaths = (projectInformations: any) => {
	let newInfos = Object.assign({}, projectInformations)

	newInfos.mirrorPath = path.join(__dirname,'../../boilerplate')
	newInfos.projectRoot =
		`${process.cwd()}/${projectInformations.name}`

	return newInfos
}

const removeFolder = (path: string) => {
	fs.remove(path)
}

const copyFolder = (projectInfos: any) => {
	const spin = new Spinner({
		startMessage: 'Gerando os arquivos...',
		successMessage: 'Arquivos gerados com sucesso!',
		failureMessage: 'Erro ao gerar os arquivos!'
	})
	spin.start()

	return new Promise((resolve, reject) => {
		fs
			.copy(projectInfos.mirrorPath, projectInfos.projectRoot)
			.then(() => {
				setTimeout(() => {
					spin.done()
					resolve(projectInfos)
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

const generatePackageJson = (projectInfos: any) => {
	const spin = new Spinner({
		startMessage: 'Gerando o package.json...',
		successMessage: 'Package.json gerado com sucesso!',
		failureMessage: 'Erro ao gerar o package.json'
	})

	spin.start()

	return new Promise((resolve, reject) => {
		packageJson(projectInfos)
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
