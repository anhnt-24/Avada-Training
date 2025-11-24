import Router from 'koa-router'
import todoHandler from '../handlers/todoHandler.js'
import todoInputMiddleware from '../middleware/todoInputMiddleware.js'

const router = new Router({
    prefix: '/api/todoes',
})

router.get('/', todoHandler.getTodoes)
router.put('/update-many', todoHandler.updateManyTodos)
router.post('/delete-many', todoHandler.deleteManyTodos)
router.get('/:id', todoHandler.getTodo)
router.post('/', todoInputMiddleware, todoHandler.createTodo)
router.put('/:id', todoHandler.updateTodo)
router.delete('/:id', todoHandler.deleteTodo)

export default router
