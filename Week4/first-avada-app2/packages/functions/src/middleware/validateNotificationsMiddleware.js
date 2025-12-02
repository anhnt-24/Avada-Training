import * as Yup from 'yup'

/**
 *
 * @type {ObjectSchema<_<TypeFromShape<{city: StringSchema<NonNullable<string | undefined>, AnyObject, undefined, ''>, country: StringSchema<NonNullable<string | undefined>, AnyObject, undefined, ''>, firstName: StringSchema<NonNullable<string | undefined>, AnyObject, undefined, ''>, productHandle: StringSchema<NonNullable<string | undefined>, AnyObject, undefined, ''>, productId: StringSchema<NonNullable<string | undefined>, AnyObject, undefined, ''>, productImage: StringSchema<NonNullable<string | undefined>, AnyObject, undefined, ''>, productName: StringSchema<NonNullable<string | undefined>, AnyObject, undefined, ''>}, AnyObject>>, AnyObject, _<DefaultFromShape<{city: StringSchema<NonNullable<string | undefined>, AnyObject, undefined, ''>, country: StringSchema<NonNullable<string | undefined>, AnyObject, undefined, ''>, firstName: StringSchema<NonNullable<string | undefined>, AnyObject, undefined, ''>, productHandle: StringSchema<NonNullable<string | undefined>, AnyObject, undefined, ''>, productId: StringSchema<NonNullable<string | undefined>, AnyObject, undefined, ''>, productImage: StringSchema<NonNullable<string | undefined>, AnyObject, undefined, ''>, productName: StringSchema<NonNullable<string | undefined>, AnyObject, undefined, ''>}>>, ''>}
 */
const notificationSchema = Yup.object({
  city: Yup.string().required('City is required'),
  country: Yup.string().required('Country is required'),
  firstName: Yup.string().required('First name is required'),
  productHandle: Yup.string().required('Product handle is required'),
  productId: Yup.string().required('Product ID is required'),
  productImage: Yup.string().url('Product image must be a valid URL').required('Product image is required'),
  productName: Yup.string().required('Product name is required')
})

/**
 *
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
export const validateNotificationsMiddlware = async (ctx, next) => {
  const rows = ctx.req.body

  if (!Array.isArray(rows)) {
    ctx.status = 400
    ctx.body = { error: 'Data must be an array' }
    return
  }

  if (rows.length > 45) {
    ctx.status = 400
    ctx.body = { error: `You can upload a maximum of 45 records. Found ${rows.length}.` }
    return
  }
  for (let i = 0; i < rows.length; i++) {
    try {
      await notificationSchema.validate(rows[i], { abortEarly: false })
    } catch (err) {
      ctx.status = 400
      ctx.body = { error: `Row ${i + 1} validation failed: ${err.errors?.join(', ') || err.message}` }
      return
    }
  }
  ctx.state.validRows = rows
  await next()
}
