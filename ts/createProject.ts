import * as inquirer from 'inquirer'

import {
	error,
	info
} from './helpers/logs'
import copyBoilerplate from './tasks/copyBoilerplate'
import {ProjectInfomation, Questions} from './models/index'

const questions = new Questions()

const createProject = () => {

	inquirer
		.prompt(questions.getThemAll())
		.then((projectInfos: any) => {
			const projectInfo = new ProjectInfomation(projectInfos.name, projectInfos.version, projectInfos.package_manager)

			confirmProjectInfos(projectInfo)
				.then(cb => {
					if (cb.confirmation) {
						copyBoilerplate(projectInfo)
					} else {
						process.exit()
					}
				})
		})
}



const confirmProjectInfos = (projectInfo: ProjectInfomation): Promise<any> => {
	info(projectInfo.format())


	return inquirer.prompt([questions._projectConfirmation])
}




export default createProject
