import { loadGraphQL } from '@functions/helpers/graphql/graphqlHelpers'
import normalizeMetaobject from '@functions/helpers/normalizeMetaobject'
import buildMetaObjectFields from '@functions/helpers/buildMetaObjectFields'

const METAOBJECT_TYPE = 'announcement_bar_settings'
const METAOBJECT_NAME = 'Announcement Bar Settings'

/**
 *
 * @param shopify
 * @returns {Promise<*>}
 */
export async function getAllAnnouncementBars (shopify) {
  const query = loadGraphQL('/metaobjects/getMetaobjects.graphql')
  const data = await shopify.graphql(query, { type: METAOBJECT_TYPE, first: 10 })
  return data.metaobjects.nodes.map(metaobject => normalizeMetaobject(metaobject))
}

/**
 *
 * @param shopify
 * @param id
 * @returns {Promise<*>}
 */
export async function getAnnouncementBarById (shopify, id) {
  const query = loadGraphQL('/metaobjects/getMetaobject.graphql')
  const data = await shopify.graphql(query, { id })
  return normalizeMetaobject(data.metaobject)
}

/**
 *
 * @param shopify
 * @param id
 * @param config
 * @returns {Promise<*>}
 */
export async function updateAnnouncementBar (shopify, id, config) {
  const mutation = loadGraphQL('/metaobjects/updateMetaobject.graphql')
  const data = await shopify.graphql(mutation, {
    id: id,
    metaobject: {
      fields: buildMetaObjectFields(config)
    }
  })
  return normalizeMetaobject(data.metaobjectUpdate.metaobject)
}

/**
 *
 * @param shopify
 * @param id
 * @returns {Promise<*>}
 */
export async function toggleActive (shopify, id) {
  const mutation = loadGraphQL('/metaobjects/updateMetaobject.graphql')
  const data = await getAnnouncementBarById(shopify, id)
  return await shopify.graphql(mutation, {
    id: id, metaobject: {
      capabilities: {
        publishable: {
          status: data.isPublished ? 'DRAFT' : 'ACTIVE',
        }
      }
    }
  })
}

/**
 *
 * @param shopify
 * @returns {Promise<*>}
 */
export async function createAnnouncementBarDefinition (shopify) {
  const mutation = loadGraphQL('/metaobjects/createMetaobjectDefinition.graphql')
  return await shopify.graphql(mutation, {
    definition: {
      name: METAOBJECT_NAME,
      type: METAOBJECT_TYPE,
      fieldDefinitions: [
        {
          name: 'content',
          key: 'content',
          type: 'json',
          validations: []
        },
        {
          name: 'design',
          key: 'design',
          type: 'json',
          validations: []
        }
        , {
          name: 'placement',
          key: 'placement',
          type: 'json',
          validations: []
        }
      ],
      capabilities: {
        publishable: {
          enabled: true
        }
      }
    }

  })
}

/**
 *
 * @param shopify
 * @param config
 * @returns {Promise<*>}
 */
export async function createAnnouncementBar (shopify, reqData) {
  const { isPublished, ...config } = reqData
  const mutation = loadGraphQL('/metaobjects/createMetaobject.graphql')
  const data = await shopify.graphql(mutation, {
    metaobject: {
      type: METAOBJECT_TYPE,
      fields: buildMetaObjectFields(config),
      capabilities: {
        publishable: {
          status: !isPublished ? 'DRAFT' : 'ACTIVE',
        }
      }
    }

  })
  return normalizeMetaobject(data.metaobjectCreate.metaobject)

}

/**
 *
 * @param shopify
 * @param id
 * @returns {Promise<*>}
 */
export async function deleteAnnouncementBar (shopify, id) {
  const mutation = loadGraphQL('/metaobjects/deleteMetaobject.graphql')
  return await shopify.graphql(mutation, { id })
}

/**
 *
 * @param shopify
 * @param ids
 * @returns {Promise<*>}
 */
export async function bulkDeleteAnnouncementBars (shopify, ids) {
  const mutation = loadGraphQL('/metaobjects/bulkDeleteMetaobject.graphql')
  return await shopify.graphql(mutation, { where: { ids: ids } })
}
