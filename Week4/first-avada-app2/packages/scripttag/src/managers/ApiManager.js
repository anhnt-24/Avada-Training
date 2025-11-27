import makeRequest from '../helpers/api/makeRequest'

export default class ApiManager {
  getNotifications = async () => {
    return this.getApiData()
  }

  getApiData = async () => {
    const shopifyDomain = window.Shopify.shop
    const res = await makeRequest(
      `http://localhost:3000/clientApi/notifications?shopifyDomain=${shopifyDomain}`,
    )
    const { notifications, settings } = res.data
    return { notifications, settings }
  }
}
