import App from 'koa'
import router from '@functions/routes/webhook'

const api = new App()
api.proxy = true
api.use(router.allowedMethods())
api.use(router.routes())
api.on('error', error => {})
export default api
