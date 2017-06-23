const fs = require('fs-extra')

try {
	fs.copySync('./ts/boilerplate', 'app/boilerplate')
	console.log('Sucess!')
} catch (error) {
	console.error(error)
}
