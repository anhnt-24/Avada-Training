export default function mapOrderToNotification (order, shopifyDomain) {
  const lineItem = order?.lineItems?.nodes?.[0] || null
  const product = lineItem?.product || null

  return {
    firstName: order?.billingAddress?.firstName || '',
    city: order?.shippingAddress?.city || '',
    productName: lineItem?.name || '',
    country: order?.shippingAddress?.country || '',
    productId: product?.id,
    productHandle: product?.handle || '',
    timestamp: order?.createdAt ? new Date(order.createdAt) : null,
    productImage: product?.featuredImage?.url || '',
    shopifyDomain
  }
}
