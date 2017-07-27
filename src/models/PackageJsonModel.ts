
import path = require('path')
import { beautifyJSON } from '../helpers/BeautifyJs'


export default class PackageJsonModel {
  private _main: string = 'index.js'
  private _scripts: object

  constructor(
    private _name: string,
    private _version: string,
    private _dependencies: object,
    private _devDependencies: object) {

  }

  public pathFile(pathFile: string) {
    return path.join(pathFile, 'package.json')
  }

  get getFormated() {
    return beautifyJSON({

    })
  }
}
