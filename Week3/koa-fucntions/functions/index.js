import { logger, setGlobalOptions } from 'firebase-functions'
import { onRequest } from 'firebase-functions/https'
import app from './app.js'

setGlobalOptions({ maxInstances: 10 })

export default onRequest((req, res) => {
    logger.info('Logs!', { structuredData: true })
    app.callback()(req, res)
})
