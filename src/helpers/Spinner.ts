import ora = require('ora')

export default class Spinner {
  private startMessage: any
  private successMessage: any
  private failureMessage: any
  private spinner: any

  constructor(options: any) {
    this.startMessage = options.startMessage || 'No start message'
    this.successMessage = options.successMessage || 'No success message'
    this.failureMessage = options.failureMessage || 'No failure message'
    this.spinner = ora()
  }

  public start() {
    this
      .spinner
      .start(this.startMessage)
  }

  public stop() {
    this
      .spinner
      .stop(this.failureMessage)
  }

  public done() {
    this.spinner.succeed(this.successMessage)
  }

  public fail() {
    this
      .spinner
      .fail(this.failureMessage)
  }

  set initalMessage(newMessage: any) {
    this.startMessage = newMessage
  }

  set doneMessage(newMessage: any) {
    this.successMessage = newMessage
  }

  set errorMessage(newMessage: any) {
    this.failureMessage = newMessage
  }
}

