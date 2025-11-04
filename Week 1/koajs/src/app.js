import Koa from 'koa';
import koaBody from 'koa-body';
import apiRoutes from './routes/index.js';
const app = new Koa();

app.use(koaBody());

app.use(apiRoutes.routes());
app.use(apiRoutes.allowedMethods());

app.listen(5000, () => {
    console.log('Server running at http://localhost:5000');
});
