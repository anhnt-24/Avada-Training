export default function generateShopifyEditorDeepLink ({ shopDomain, template = 'index', handle = 'avada-embed' }) {
  const apiKey = import.meta.env.VITE_SHOPIFY_API_KEY
  const url = new URL(`https://${shopDomain}/admin/themes/current/editor`)
  url.searchParams.set('context', 'apps')
  url.searchParams.set('template', template)
  url.searchParams.set('activateAppId', `${apiKey}`)

  return url.toString() + `/${handle}`
}
