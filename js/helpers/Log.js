"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Chalk = require("chalk");
class Log {
    constructor() {
        this._cLog = console.log;
        this._cErr = console.error;
        this._ctrace = console.trace;
        this._errorStyle = Chalk.red;
        this._sucessStyle = Chalk.green;
        this._infoStyle = Chalk.yellow;
        this._boldStyle = Chalk.bold;
    }
    error(message) {
        return this._cErr(this._errorStyle(message));
    }
    errorTrace(message) {
        return this._ctrace(message);
    }
    success(message) {
        return this._cLog(this._sucessStyle(message));
    }
    info(message) {
        return this._cLog(this._infoStyle(message));
    }
    log(message) {
        return this._cLog(message);
    }
    bold(message) {
        return this._cLog(this._boldStyle(message));
    }
}
exports.default = Log;
