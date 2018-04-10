const handler = require('./function/handler').default
const createServer = require('@alienfast/faaLICENSEs/express/createServer').default

createServer(handler)
