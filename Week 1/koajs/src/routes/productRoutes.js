import Router from 'koa-router';
import productHandler from '../handlers/productHandler.js';
import productInputMiddleware from "../middleware/productInputMiddleware.js";

const router = new Router({
    prefix: '/api/products',
});

router.get('/', productHandler.getProducts);
router.get('/:id', productHandler.getProduct);
router.post('/',productInputMiddleware, productHandler.createProduct);
router.put('/:id',productInputMiddleware, productHandler.updateProduct);
router.delete('/:id', productHandler.deleteProduct);

export default router;
