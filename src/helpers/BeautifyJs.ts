import Beautify = require('js-beautify')
const beautify = Beautify.js_beautify

export const beautifyJS = (js: string) => {
  return beautify(js)
}

export const beautifyJSON = (json: object) => {
  return beautify(JSON.stringify(json))
}
