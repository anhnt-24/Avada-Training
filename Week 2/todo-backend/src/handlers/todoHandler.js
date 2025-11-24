import todoRepository from '../database/todoRepository.js'

async function getTodoes (ctx) {
    try {
        const todoes = todoRepository.findAll()

        ctx.body = {
            success: true,
            data: todoes
        }
    } catch (e) {
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        }
    }
}

async function getTodo (ctx) {
    try {
        const { id } = ctx.params

        const todo = todoRepository.findById(id,)

        ctx.body = {
            success: true,
            data: todo,
        }
    } catch (e) {
        ctx.status = 500
        ctx.body = {
            success: false,
            error: e.message,
        }
    }
}

async function createTodo (ctx) {
    try {
        const postData = ctx.request.body
        const newTodo = todoRepository.create(postData)

        ctx.status = 201
        ctx.body = {
            success: true,
            data: newTodo
        }
    } catch (e) {
        ctx.status = 500
        ctx.body = {
            success: false,
            error: e.message
        }
    }
}

async function updateTodo (ctx) {
    try {
        const data = {
            ...ctx.request.body,
            id: ctx.params.id
        }

        const updatedTodo = todoRepository.updateOne(data)

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

async function deleteTodo (ctx) {
    try {
        const { id } = ctx.params
        const deleted = todoRepository.deleteOne(id)

        if (!deleted) {
            throw new Error('Todo not found or already deleted')
        }

        ctx.body = {
            success: true,
            message: 'Todo deleted successfully'
        }
    } catch (e) {
        ctx.status = 500
        ctx.body = {
            success: false,
            error: e.message
        }
    }
}

export async function deleteManyTodos (ctx) {
    try {
        const { ids } = ctx.request.body
        todoRepository.deleteMany(ids)

        ctx.body = {
            success: true,
            message: `Deleted todos successfully.`,
        }
    } catch (error) {
        console.error('Error deleting todos:', error)
        ctx.status = 500
        ctx.body = { success: false, error: error.message }
    }
}

export async function updateManyTodos (ctx) {
    try {
        const { ids, updateFields } = ctx.request.body

        todoRepository.updateMany(ids, updateFields)

        ctx.body = {
            success: true,
            message: `Updated todos successfully.`,
        }
    } catch (error) {
        console.error('Error updating todos:', error)
        ctx.status = 500
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
    updateManyTodos
}
