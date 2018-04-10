const handler = require('./function/handler').default
const createServer = require('@alienfast/faas/express/createServer').default

createServer(handler)
