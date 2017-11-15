const { promisify } = require('util')
const parseXML = promisify(require('xml2js').parseString)

