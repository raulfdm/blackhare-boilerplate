const exec = require('child_process').exec
import Spinner from '../helpers/Spinner'

export const installDependencies = (projectInfos: any) => {
  const spinn = new Spinner({
    startMessage: 'Instalando as dependencias. Pode levar alguns minutos...',
    successMessage: 'Dependencias instaladas com sucesso!',
    failureMessage: 'Erro ao instalar as dependencias!'
  })

  const commands = {
    downFolder: `cd ${projectInfos.name}`,
    install: `${projectInfos.package_manager} install`,
  }

  return new Promise((resolve, reject) => {
    spinn.start()

    exec(commands.downFolder + ' && ' + commands.install, (err: any, stdout: any) => {
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
