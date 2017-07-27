"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ora = require('ora');
class Spinner {
    constructor(options) {
        this.startMessage = options.startMessage || 'No start message';
        this.successMessage = options.successMessage || 'No success message';
        this.failureMessage = options.failureMessage || 'No failure message';
        this.spinner = ora();
    }
    start() {
        this
            .spinner
            .start(this.startMessage);
    }
    stop() {
        this
            .spinner
            .stop(this.failureMessage);
    }
    done() {
        this.spinner.succeed(this.successMessage);
    }
    fail() {
        this
            .spinner
            .fail(this.failureMessage);
    }
    set initalMessage(newMessage) {
        this.startMessage = newMessage;
    }
    set doneMessage(newMessage) {
        this.successMessage = newMessage;
    }
    set errorMessage(newMessage) {
        this.failureMessage = newMessage;
    }
}
exports.default = Spinner;
