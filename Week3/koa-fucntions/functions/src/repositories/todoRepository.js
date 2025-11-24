import { v4 as uuidv4 } from 'uuid'
import db from '../config/db.js'

const TODOS_COLLECTION = 'todos'
const todosRef = db.collection(TODOS_COLLECTION)

/**
 * @param {object} data
 * @return {object}
 */
async function create (data) {
    const newTodo = {
        id: uuidv4(),
        title: data.title,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }

    await todosRef.doc(newTodo.id).set(newTodo)
    return newTodo
}

/**
 *
 * @returns {Promise<FirebaseFirestore.DocumentData[]>}
 */
async function findAll () {
    const snapshot = await todosRef.get()
    return snapshot.docs.map((doc) => doc.data())
}

/**
 * @param {string} id
 * @return {object|null}
 */
async function findById (id) {
    const doc = await todosRef.doc(id).get()
    return doc.exists ? doc.data() : null
}

/**
 * @param {object} data
 * @return {object|null}
 */
async function updateOne (data) {
    const docRef = todosRef.doc(data.id)
    const doc = await docRef.get()

    if (!doc.exists) return null

    const updatedTodo = {
        ...doc.data(),
        ...data,
        updatedAt: new Date().toISOString(),
    }

    await docRef.set(updatedTodo)
    return updatedTodo
}

/**
 *
 * @param id
 * @returns {Promise<boolean>}
 */
async function deleteOne (id) {
    const docRef = todosRef.doc(id)
    const doc = await docRef.get()

    if (!doc.exists) return false

    await docRef.delete()
    return true
}

/**
 * @param {string[]} ids
 * @return {number}
 */
async function deleteMany (ids) {
    const batch = db.batch()

    ids.forEach((id) => batch.delete(todosRef.doc(id)))

    await batch.commit()
    return ids.length
}

/**
 *
 * @param ids
 * @param updateFields
 * @returns {Promise<*>}
 */
async function updateMany (ids, updateFields) {
    const batch = db.batch()

    ids.forEach((id) =>
        batch.update(todosRef.doc(id), {
            ...updateFields,
            updatedAt: new Date().toISOString(),
        }),
    )

    await batch.commit()
    return ids.length
}

export default {
    create,
    findAll,
    findById,
    updateOne,
    deleteOne,
    deleteMany,
    updateMany,
}
