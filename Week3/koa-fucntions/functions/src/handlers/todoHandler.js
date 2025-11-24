import todoRepository from '../repositories/todoRepository.js'

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
async function getTodoes (ctx) {
    try {
        const todoes = await todoRepository.findAll()

        ctx.body = {
            success: true,
            data: todoes,
        }
    } catch (e) {
        ctx.body = {
            success: false,
            data: [],
            error: e.message,
        }
    }
}

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
async function getTodo (ctx) {
    try {
        const { id } = ctx.params

        const todo = await todoRepository.findById(id)

        ctx.body = {
            success: true,
            data: todo,
        }
    } catch (e) {
        ctx.body = {
            success: false,
            error: e.message,
        }
    }
}

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
async function createTodo (ctx) {
    try {
        const postData = ctx.request.body
        const newTodo = await todoRepository.create(postData)
        console.log(postData)
        ctx.status = 201
        ctx.body = {
            success: true,
            data: newTodo,
        }
    } catch (e) {
        ctx.body = {
            success: false,
            error: e.message,
        }
    }
}

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
async function updateTodo (ctx) {
    try {
        const data = {
            ...ctx.request.body,
            id: ctx.params.id,
        }

        const updatedTodo = await todoRepository.updateOne(data)

        ctx.body = {
            success: true,
            data: updatedTodo,
        }
    } catch (e) {
        ctx.body = {
            success: false,
            error: e.message,
        }
    }
}

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
async function deleteTodo (ctx) {
    try {
        const { id } = ctx.params
        const deleted = await todoRepository.deleteOne(id)

        if (!deleted) {
            throw new Error('Todo not found or already deleted')
        }

        ctx.body = {
            success: true,
            message: 'Todo deleted successfully',
        }
    } catch (e) {
        ctx.body = {
            success: false,
            error: e.message,
        }
    }
}

/**
 * @param{Object} ctx
 */
export async function deleteManyTodos (ctx) {
    try {
        const { ids } = ctx.request.body
        await todoRepository.deleteMany(ids)

        ctx.body = {
            success: true,
            message: `Deleted todos successfully.`,
        }
    } catch (error) {
        console.error('Error deleting todos:', error)
        ctx.body = { success: false, error: error.message }
    }
}

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
export async function updateManyTodos (ctx) {
    try {
        const { ids, updateFields } = ctx.request.body

        await todoRepository.updateMany(ids, updateFields)

        ctx.body = {
            success: true,
            message: `Updated todos successfully.`,
        }
    } catch (error) {
        console.error('Error updating todos:', error)
        ctx.body = {
            success: false,
            error: error.message,
        }
    }
}

export default {
    getTodoes,
    getTodo,
    createTodo,
    deleteTodo,
    updateTodo,
    deleteManyTodos,
    updateManyTodos,
}
