import yup from 'yup'

/**
 *
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
const todoInputMiddleware = async (ctx, next) => {
    try {
        const todoData = ctx.request.body

        const schema = yup.object().shape({
            title: yup.string().required(),
        })

        await schema.validate(todoData, { abortEarly: false })

        await next()
    } catch (e) {
        ctx.status = 400
        ctx.body = {
            success: false,
            message: 'Validation failed',
            errors: e.errors,
            errorName: e.name,
        }
    }
}

export default todoInputMiddleware
