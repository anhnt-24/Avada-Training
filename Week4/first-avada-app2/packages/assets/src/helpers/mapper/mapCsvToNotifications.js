/**
 *
 * @param rows
 * @returns {*}
 */
export const mapCsvToNotifications = (rows) => {
  return rows.map(row => ({
    city: row.city || '',
    country: row.country || '',
    firstName: row.firstName || '',
    productHandle: row.productHandle || '',
    productId: row.productId || '',
    productImage: row.productImage || '',
    productName: row.productName || ''
  }))
}
