const  ora = require('ora')

export default class Spinner {
	private _startMessage: string
	private _successMessage: string
	private _failureMessage: string
	private _spinner: any

	constructor(options: SpinnerOption) {
		this._startMessage = options.startMessage || 'No start message'
		this._successMessage = options.successMessage || 'No success message'
		this._failureMessage = options.failureMessage || 'No failure message'
		this._spinner = ora()
	}

	start() {
		this
			._spinner
			.start(this._startMessage)
	}

	stop() {
		this
			._spinner
			.stop(this._failureMessage)
	}

	done() {
		this._spinner.succeed(this._successMessage)
	}

	fail() {
		this
			._spinner
			.fail(this._failureMessage)
	}

	set initalMessage(newMessage: string) {
		this._startMessage = newMessage
	}

	set doneMessage(newMessage: string){
		this._successMessage = newMessage
	}

	set errorMessage(newMessage: string) {
		this._failureMessage = newMessage
	}
}

export interface SpinnerOption{
	startMessage: string,
	successMessage: string,
	failureMessage: string
}
