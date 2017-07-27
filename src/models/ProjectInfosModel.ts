import { beautifyJSON } from '../helpers/BeautifyJs'
import path = require('path')

export default class ProjectInfosModel {
  private _projectPath: string
  private _mirrorPath: string
  private _packageJsonContent: JSON

  constructor(private _name: string, private _version: string, private _packageManager: string) {

  }

  get name() {
    return this._name
  }

  get version() {
    return this._version
  }

  get packageManager() {
    return this._packageManager
  }

  get projectPath() {
    return this._projectPath
  }

  set projectPath(projectPath: string) {
    this._projectPath = projectPath
  }

  get mirrorPath() {
    return this._mirrorPath
  }

  set mirrorPath(folder: string) {
    this._mirrorPath = path.join(this._projectPath, folder)
  }

  get packageJsonContent() {
    return this._packageJsonContent
  }

  set packageJsonContent(jsonContent: JSON) {
    this._packageJsonContent = jsonContent
  }

  public basicInfoToJson() {
    return beautifyJSON({
      name: this._name,
      package_manager: this._packageManager,
      version: this._version,
    })
  }
}
