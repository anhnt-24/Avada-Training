import productRepository from "../database/productRepository.js";

async function getProducts(ctx) {
    try {
        const query = ctx.query || {};
        const products = productRepository.find(query);

       return  ctx.body = {
            success: true,
            data: products
        };
    } catch (e) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        };
    }
}

async function getProduct(ctx) {
    try {
        const { id } = ctx.params;
        const fields = ctx.query.fields ? ctx.query.fields.split(',') : [];

        const product = productRepository.findById(id, fields);

        ctx.body = {
            success: true,
            data: product,
        };
    } catch (e) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            error: e.message,
        };
    }
}


async function createProduct(ctx) {
    try {
        const postData = ctx.request.body;
        const newProduct = productRepository.create(postData);

        ctx.status = 201;
        return ctx.body = {
            success: true,
            data: newProduct
        };
    } catch (e) {
        ctx.status = 400;
        return  ctx.body = {
            success: false,
            error: e.message
        };
    }
}

async function updateProduct(ctx) {
    try {
        const data = { ...ctx.request.body, id:  Number(ctx.params.id) };
        const updated = productRepository.updateOne(data);

        if (!updated) {
            throw new Error("Product not found or update failed");
        }

        ctx.body = {
            success: true,
            data: updated
        };
    } catch (e) {
        ctx.status = 400;
        ctx.body = {
            success: false,
            error: e.message
        };
    }
}

async function deleteProduct(ctx) {
    try {
        const { id } = ctx.params;
        const deleted = productRepository.deleteOne(id);

        if (!deleted) {
            throw new Error("Product not found or already deleted");
        }

        ctx.body = {
            success: true,
            message: "Product deleted successfully"
        };
    } catch (e) {
        ctx.status = 400;
        ctx.body = {
            success: false,
            error: e.message
        };
    }
}

export default  {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
};
