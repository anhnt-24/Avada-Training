/**
 * @param {Object} ctx
 * @param {function} next
 */
async function firebaseBodyMiddleware (ctx, next) {
    if (ctx.req.body) {
        ctx.request.body = ctx.req.body
    }
    await next()
}

export default firebaseBodyMiddleware
