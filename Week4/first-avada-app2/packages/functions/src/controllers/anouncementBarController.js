import {
  createAnnouncementBar,
  deleteAnnouncementBar,
  getAnnouncementBarById,
  getAnnouncementBarsByShop,
  toggleIsPublished,
  updateAnnouncementBar
} from '@functions/repositories/announcementBarRepository'

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
export async function getAll (ctx) {
  try {
    const shopifyDomain = ctx.state.shopify.shop
    const bars = await getAnnouncementBarsByShop(shopifyDomain)
    ctx.body = {
      data: bars,
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
    const bar = await getAnnouncementBarById(id)

    ctx.body = {
      data: bar,
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
    const shopifyDomain = ctx.state.shopify.shop
    const payload = {
      ...ctx.req.body,
      shopifyDomain
    }
    const bar = await createAnnouncementBar(payload)
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
export async function update (ctx) {
  try {
    const { id } = ctx.params
    const bar = await updateAnnouncementBar(id, ctx.req.body)
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
    const bar = await toggleIsPublished(id)

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
    await deleteAnnouncementBar(id)
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
