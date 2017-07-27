import * as Chalk from "chalk";

export default class Log {
  private _cLog = console.log
  private _cErr = console.error
  private _ctrace = console.trace

  private _errorStyle = Chalk.red
  private _sucessStyle = Chalk.green
  private _infoStyle = Chalk.yellow
  private _boldStyle = Chalk.bold

  public error(message: any) {
    return this._cErr(this._errorStyle(message))
  }
  public errorTrace(message: string) {
    return this._ctrace(message)
  }
  public success(message: string) {
    return this._cLog(this._sucessStyle(message))
  }
  public info(message: string) {
    return this._cLog(this._infoStyle(message))
  }
  public log(message: string) {
    return this._cLog(message)
  }
  public bold(message: string) {
    return this._cLog(this._boldStyle(message))
  }

}

