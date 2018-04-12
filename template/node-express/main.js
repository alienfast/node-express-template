// ESM syntax is supported.
import handler from './function/handler'
import createServer from '@alienfast/faas/express/createServer'

createServer(handler)
