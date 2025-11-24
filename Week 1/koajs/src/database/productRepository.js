import saveData from '../helpers/saveData.js'
import products from './products.json' with { type: 'json' }
import sort from '../helpers/sort.js'
import pick from '../helpers/pick.js'
import { v4 as uuidv4 } from 'uuid'

const PRODUCTS_DATA_PATH = './src/repositories/todoes.json'

function create (data) {
    const newProduct = {
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        ...data,
    }

    const updatedProducts = [...products, newProduct]
    saveData(updatedProducts, PRODUCTS_DATA_PATH)
    return newProduct
}

function findById (id, fields) {
    const product = products.find((p) => p.id === id)

    if (!product) return null

    if (fields && fields.length > 0) {
        return pick(product, fields)
    }

    return product
}

function find ({ limit, order }) {

    let res = [...products]
    if (order) res = sort(res, order)
    if (limit) res = limit(res, limit)
    return res
}

function updateOne (data) {
    const index = products.findIndex((p) => p.id === data.id)
    if (index === -1) return null

    const updatedProduct = {
        ...products[index],
        ...data,
    }

    const updatedList = [...products]
    updatedList[index] = updatedProduct
    saveData(updatedList, PRODUCTS_DATA_PATH)

    return updatedProduct
}

function deleteOne (id) {
    const index = products.findIndex((p) => p.id === id)

    if (index === -1) return false

    products.splice(index, 1)
    saveData(products, PRODUCTS_DATA_PATH)
    return true
}

export default {
    create,
    findById,
    find,
    updateOne,
    deleteOne
}


