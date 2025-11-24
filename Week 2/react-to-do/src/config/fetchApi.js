const BASE_URL = 'http://localhost:5000/api'

/**
 *
 * @param pathname
 * @param method
 * @param data
 * @param headers
 * @returns {Promise<any>}
 */
async function fetchApi ({ pathname, method = 'GET', data = null, headers = {} }) {
    const url = `${BASE_URL.replace(/\/$/, '')}/${pathname.replace(/^\//, '')}`

    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
    }

    if (data) {
        options.body = JSON.stringify(data)
    }

    try {
        const response = await fetch(url, options)

        if (!response.ok) {
            throw new Error(`HTTP Error ${response.status}: ${response.statusText}`)
        }

        const result = await response.json()
        return result
    } catch (error) {
        throw error
    }
}

export default fetchApi
