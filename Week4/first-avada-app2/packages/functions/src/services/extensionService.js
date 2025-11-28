import { initShopify } from '@functions/services/shopifyService'
import { loadGraphQL } from '@functions/helpers/graphql/graphqlHelpers'
import JSON5 from 'json5'

/**
 *
 * @param shopData
 * @returns {Promise<*|null>}
 */
export async function checkActiveStatus (shopData) {
  try {
    const APP_NAME = 'sale-pops-app'
    const shopify = initShopify(shopData)
    const query = loadGraphQL('/getAppThemeConfig.graphql')
    const responseData = await shopify.graphql(query)
    const themes = responseData.themes.edges

    const configs = themes
      .map(edge => {
        const file = edge?.node?.files?.nodes?.[0]
        if (!file?.body?.content) return null

        try {
          const json = JSON5.parse(file.body.content)
          return json?.current?.blocks || null
        } catch {
          return null
        }
      })
      .filter(Boolean)
      .flatMap(blocks => Object.values(blocks))
      .filter(block => block.type?.includes(`/apps/${APP_NAME}/`))

    if (configs.length === 0) return null
    return configs[0].disabled

  } catch (error) {
    throw error
  }
}
