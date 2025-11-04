import yup from 'yup';

const productInputMiddleware = async (ctx, next) => {
    try {
        const postData = ctx.request.body;

        const schema = yup.object().shape({
            name: yup.string().required('Product name is required').min(3),
            price: yup.number().required('Price is required').positive(),
            description: yup.string().required('Description is required'),
            product: yup.string().required('Product type is required'),
            color: yup.string().required('Color is required'),
            image: yup.string().url('Image must be a valid URL').required(),
        });

        await schema.validate(postData, { abortEarly: false });

        await next();

    } catch (e) {
        ctx.status = 400;
        ctx.body = {
            success: false,
            message: 'Validation failed',
            errors: e.errors,
            errorName: e.name,
        };
    }
}

export default productInputMiddleware;
