const fs = require('fs-extra')
const path = require('path')
const getContent = require('../helpers/getContent')

const editorConfig = () => {
    const rootFolder = './'
    const file = `${rootFolder}.editorconfig`
    const configs = [
        '# editorconfig.org',
        'root = true',
        '[*]',
        'charset = utf-8',
        'insert_final_newline = true',
        'trim_trailing_whitespace = true',
        'end_of_line = lf',
        'indent_style = tab',
        'indent_size = 2'
    ]

    const fileContent = getContent(configs)

    fs
        .outputFile(file, fileContent)
        .catch(err => {
            throw new Error(err)
        })

}

module.exports = editorConfig();
editorConfig()