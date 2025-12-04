/**
 *
 * @param metaobject
 * @returns {{id: *, handle: *, type: *}}
 */
export default function normalizeMetaobject (metaobject) {
  const result = {}

  metaobject.fields.forEach(field => {
    let val = field.value
    try {
      val = JSON.parse(field.value)
    } catch (e) {
    }
    result[field.key] = val
  })

  return {
    id: metaobject.id,
    handle: metaobject.handle,
    type: metaobject.type,
    updatedAt: metaobject.updatedAt,
    isPublished: metaobject.capabilities.publishable?.status !== 'DRAFT',
    displayName: metaobject.displayName,
    ...result
  }
}
