/**
 *
 * @param config
 * @returns {{key: *, value: string}[]}
 */
export default function buildMetaObjectFields (config) {
  if (!config || typeof config !== 'object') {
    throw new Error('Config phải là object')
  }
  const excludeKeys = [
    'id',
    'handle',
    'type',
    'updatedAt',
    'isPublished',
    'displayName'
  ]

  return Object.entries(config)
    .filter(([key]) => !excludeKeys.includes(key))
    .map(([key, value]) => ({
      key,
      value: JSON.stringify(value),
    }))
}
