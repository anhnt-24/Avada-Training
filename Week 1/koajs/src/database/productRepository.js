import saveData from '../helpers/saveData.js';
import products from './products.json' with { type: 'json' };
import sort from "../helpers/sort.js";
import pick from '../helpers/pick.js';

const PRODUCTS_DATA_PATH = './src/database/products.json';

function create(data) {
    const newProduct = {
        id: products.length ? Number(products[products.length - 1].id) + 1 : 1,
        createdAt: new Date().toISOString(),
        ...data,
    };

    const updatedProducts = [...products, newProduct];
    saveData(updatedProducts,PRODUCTS_DATA_PATH)
    return newProduct;
}


function findById(id, fields) {
    const product = products.find((p) => p.id === Number(id));

    if (!product) return null;

    if (fields && fields.length > 0) {
        return pick(product, fields);
    }

    return product;
}


function find(options) {
    const result = sort(products, options);
    return result;
}

function updateOne(data) {
    const index = products.findIndex((p) => p.id === Number(data.id));
    if (index === -1) return null;

    const updatedProduct = {
        ...products[index],
        ...data,
    };

    const updatedList = [...products];
    updatedList[index] = updatedProduct;
    saveData(updatedList,PRODUCTS_DATA_PATH);

    return updatedProduct;
}

function deleteOne(id) {
    const filtered = products.filter((p) => Number(p.id) !== Number(id));

    if (filtered.length === products.length) {
        return false;
    }

    saveData(filtered,PRODUCTS_DATA_PATH);
    return true;
}

export default {
    create,
    findById,
    find,
    updateOne,
    deleteOne
};


