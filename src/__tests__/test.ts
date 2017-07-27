import ProjectInfosModel from '../models/ProjectInfosModel'

describe('ProjectInfos Test', () => {
  const name = "meu-projeto"
  const version = "0.0.1"
  const packageManager = "yarn"
  const projectPath = __dirname

  const infos = new ProjectInfosModel(name, version, packageManager)
  infos.projectPath = projectPath

  test('Should return a JSON', () => {
    expect(typeof infos.basicInfoToJson()).toBe('string')
  })

  test('Should the same name', () => {
    expect(infos.name).toBe(name)
  })
  test('Should the same version', () => {
    expect(infos.version).toBe(version)
  })
  test('Should the same package manager', () => {
    expect(infos.packageManager).toBe(packageManager)
  })
  test('Should the same path', () => {
    expect(infos.projectPath).toBe(projectPath)
  })
})
