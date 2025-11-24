const BASE_URL = 'http://127.0.0.1:5001/todokoajs/us-central1/default/api'

/**
 *
 * @param pathname
 * @param method
 * @param data
 * @param headers
 * @returns {Promise<any>}
 */
async function fetchApi ({ pathname, method = 'GET', data = null, headers = {} }) {
    const url = `${BASE_URL}${pathname}`

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
