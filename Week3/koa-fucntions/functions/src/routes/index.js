import Router from 'koa-router'
import todoRoutes from './todoRoutes.js'

const router = new Router()

router.use(todoRoutes.routes())

export default router
