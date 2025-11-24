import saveData from '../helpers/saveData.js'
import todos from './todoes.json' with { type: 'json' }
import { v4 as uuidv4 } from 'uuid'

const TODOS_DATA_PATH = './src/database/todoes.json'

/**
 * @param {object} data
 * @returns {object}
 */
function create (data) {
    const newTodo = {
        id: uuidv4(),
        title: data.title,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }

    const newTodos = [...todos, newTodo]
    saveData(newTodos, TODOS_DATA_PATH)
    return newTodo
}

/**
 * @returns {array}
 */
function findAll () {
    return todos
}

/**
 * @param {string} id
 * @returns {object|null}
 */
function findById (id) {
    const todo = todos.find(t => t.id === id)
    if (!todo) return null
    return todo
}

/**
 * @param {object} data
 * @returns {object|null}
 */
function updateOne (data) {
    const index = todos.findIndex(t => t.id === data.id)
    if (index === -1) return null

    const updatedTodo = {
        ...todos[index],
        ...data,
        updatedAt: new Date().toISOString(),
    }

    const newTodos = [
        ...todos.slice(0, index),
        updatedTodo,
        ...todos.slice(index + 1)
    ]

    saveData(newTodos, TODOS_DATA_PATH)

    return updatedTodo
}

/**
 * @param {string} id
 * @returns {boolean}
 */
function deleteOne (id) {
    const index = todos.findIndex(t => t.id === id)

    if (index === -1) {
        return false
    }

    todos.splice(index, 1)
    saveData(todos, TODOS_DATA_PATH)
    return true
}

/**
 * @param {string} ids
 * @returns {boolean}
 */
function deleteMany (ids) {
    const idsToDelete = new Set(ids)
    const newTodos = todos.filter(todo => !idsToDelete.has(todo.id))

    saveData(newTodos, TODOS_DATA_PATH)
    return true
}

/**/
function updateMany (ids, updateFields) {
    const idsToUpdate = new Set(ids)
    let updatedCount = 0
    const { completed } = updateFields
    const updatedTodos = todos.map(todo => {
        if (idsToUpdate.has(todo.id)) {
            updatedCount++
            return { ...todo, completed }
        }
        return todo
    })

    saveData(updatedTodos, TODOS_DATA_PATH)
    return updatedCount
}

export default {
    create,
    findAll,
    findById,
    deleteOne,
    updateOne,
    deleteMany,
    updateMany,
}
