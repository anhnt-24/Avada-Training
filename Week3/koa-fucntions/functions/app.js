import Koa from 'koa'
import cors from '@koa/cors'
import apiRoutes from './src/routes/index.js'
import firebaseBodyMiddleware from './src/middleware/firebaseBodyMiddleware.js'

const app = new Koa()

app.use(firebaseBodyMiddleware)
app.use(cors())
app.use(apiRoutes.routes())
app.use(apiRoutes.allowedMethods())

export default app
