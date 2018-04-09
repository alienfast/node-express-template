import FunctionContext from '@alienfast/faas/express/FunctionContext'
import FunctionEvent from '@alienfast/faas/express/FunctionEvent'

module.exports = (event: FunctionEvent, context: FunctionContext) => {
    const result = '<html><h2>Hi, from your typescript function!</h2></html>'

    context
        .status(200)
        .headers({ 'Content-Type': 'text/html' })
        .succeed(result)
}
