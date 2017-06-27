const exec = require('child_process').exec
import Spinner from '../helpers/Spinner'
import { ProjectInfomation } from '../models/ProjectInfo';

export const installDependencies = (projectInfo: ProjectInfomation) => {
  const spinn = new Spinner({
    startMessage: 'Instalando as dependencias. Pode levar alguns minutos...',
    successMessage: 'Dependencias instaladas com sucesso!',
    failureMessage: 'Erro ao instalar as dependencias!'
  })

  const commands = {
    downFolder: `cd ${projectInfo.name}`,
    install: `${projectInfo.package_manager} install`,
  }

  return new Promise((resolve, reject) => {
    spinn.start()

    exec(`${commands.downFolder} && ${commands.install}`, (err: any, stdout: any) => {
      if (err) {
        spinn.fail()
        reject(err)
      } else {
        spinn.done()
        resolve(stdout)
      }

    })
  })
}
