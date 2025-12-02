import Busboy from 'busboy'

/**
 *
 * @returns {(function(*, *): Promise<*|undefined>)|*}
 */
export default function fileMiddleware () {
  return async function (ctx, next) {
    if (ctx.method !== 'POST') return await next()

    const contentType = ctx.request.headers['content-type'] || ''

    if (
      !contentType.startsWith('multipart/form-data') &&
      !contentType.startsWith('text/plain')
    ) {
      return await next()
    }

    await new Promise((resolve, reject) => {
      const busboy = Busboy({ headers: ctx.req.headers })
      const files = {}
      console.log('kkk', files)
      busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        const chunks = []
        file.on('data', chunk => chunks.push(chunk))
        file.on('end', () => {
          const buffer = Buffer.concat(chunks)
          files[fieldname] = { filename, buffer, mimetype }
        })
        file.on('error', err => reject(err))
      })

      busboy.on('error', err => reject(err))

      busboy.on('finish', () => {
        ctx.files = files
        resolve()
      })

      ctx.req.pipe(busboy)
    })

    await next()
  }
}
