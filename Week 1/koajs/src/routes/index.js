import Router from 'koa-router';
import productRoutes from './productRoutes.js';

const router = new Router();

router.use(productRoutes.routes());

export default router;
