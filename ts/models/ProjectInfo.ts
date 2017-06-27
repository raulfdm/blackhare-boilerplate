import * as beautify from 'js-beautify'

export class ProjectInfomation {

	private _package_json: object;

	constructor(readonly name: string, readonly version: string, readonly package_manager:
		string) {
			console.log(process.cwd())
			console.log(__dirname)
	}

	get projectPath(): string{
		return `${process.cwd()}/${this.name}/`
	}

	set packageJson(json: object){
		this._package_json = json
	}

	get packageJsonFormatted(){
		return JSON.stringify(this._package_json)
	}



	format(): string {
		return `
------Project Informations------
Name: ${this.name}
Version: ${this.version}
Package Manager: ${this.package_manager}
			`
	}
}
