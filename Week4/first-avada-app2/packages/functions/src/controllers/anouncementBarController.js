import { getCurrentShopData } from '@functions/helpers/auth'
import { initShopify } from '@functions/services/shopifyService'
import {
  bulkDeleteAnnouncementBars,
  createAnnouncementBar,
  deleteAnnouncementBar,
  getAllAnnouncementBars,
  getAnnouncementBarById,
  toggleActive,
  updateAnnouncementBar
} from '@functions/services/announcementBarSettingsService'

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
export async function getAll (ctx) {
  try {
    const shopData = getCurrentShopData(ctx)
    const shopify = initShopify(shopData)
    const data = await getAllAnnouncementBars(shopify)
    ctx.body = {
      data: data,
      success: true,
    }
  } catch (e) {
    ctx.body = {
      data: [],
      success: false,
      message: e.message || 'Internal server error',
    }
  }
}

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
export async function getById (ctx) {
  try {
    const { id } = ctx.params
    const shopData = getCurrentShopData(ctx)
    const shopify = initShopify(shopData)
    const data = await getAnnouncementBarById(shopify, id)
    ctx.body = {
      data,
      success: true,
    }
  } catch (e) {
    ctx.body = {
      data: null,
      success: false,
      message: e.message || 'Internal server error',
    }
  }
}

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
export async function create (ctx) {
  try {
    const shopData = getCurrentShopData(ctx)
    const shopify = initShopify(shopData)
    const bar = await createAnnouncementBar(shopify, ctx.req.body)
    ctx.body = {
      data: bar,
      success: true
    }
  } catch (e) {
    console.log(e)
    ctx.body = {
      data: null,
      success: false,
      message: e.message || 'Internal server error'
    }
  }
}

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
export async function update (ctx) {
  try {
    const { id } = ctx.params
    const shopData = getCurrentShopData(ctx)
    const shopify = initShopify(shopData)
    const bar = await updateAnnouncementBar(shopify, id, ctx.req.body)
    ctx.body = {
      data: bar,
      success: true
    }
  } catch (e) {
    ctx.body = {
      data: null,
      success: false,
      message: e.message || 'Internal server error'
    }
  }
}

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
export async function togglePublished (ctx) {
  try {
    const { id } = ctx.params
    const shopData = getCurrentShopData(ctx)
    const shopify = initShopify(shopData)
    const bar = await toggleActive(shopify, id)
    ctx.body = {
      data: bar,
      success: true
    }
  } catch (e) {
    ctx.body = {
      data: null,
      success: false,
      message: e.message || 'Internal server error'
    }
  }
}

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
export async function remove (ctx) {
  try {
    const { id } = ctx.params
    const shopData = getCurrentShopData(ctx)
    const shopify = initShopify(shopData)
    await deleteAnnouncementBar(shopify, id)
    ctx.body = {
      data: null,
      success: true
    }
  } catch (e) {
    ctx.body = {
      data: null,
      success: false,
      message: e.message || 'Internal server error'
    }
  }
}

export async function deleteMany (ctx) {
  try {
    const shopData = getCurrentShopData(ctx)
    const shopify = initShopify(shopData)
    await bulkDeleteAnnouncementBars(shopify, ctx.req.body)
    ctx.body = {
      data: null,
      success: true
    }
  } catch (e) {
    ctx.body = {
      data: null,
      success: false,
      message: e.message || 'Internal server error'
    }
  }
}
