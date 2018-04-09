import FunctionContext from '@alienfast/faas/express/FunctionContext'
import FunctionEvent from '@alienfast/faas/express/FunctionEvent'

module.exports = (event: FunctionEvent, context: FunctionContext) => {
    const result = `<html><h2>Hi, from your seed typescript function! ${new Date()}</h2></html>`

    context
        .setStatus(200)
        .setHeaders({ 'Content-Type': 'text/html' })
        .succeed(result)
}
