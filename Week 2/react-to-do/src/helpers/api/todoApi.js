import fetchApi from '../../config/fetchApi'

const todoApi = {
    getTodos () {
        return fetchApi({
            pathname: '/todoes'
        })
    },

    getTodo (id) {
        return fetchApi({
            pathname: `/todoes/${id}`
        })
    },

    createTodo (data) {
        return fetchApi({
            pathname: '/todoes',
            method: 'POST',
            data
        })
    },

    updateTodo (id, data) {
        return fetchApi({
            pathname: `/todoes/${id}`,
            method: 'PUT',
            data
        })
    },

    deleteTodo (id) {
        return fetchApi({
            pathname: `/todoes/${id}`,
            method: 'DELETE'
        })
    },

    updateMany (ids, updateFields) {
        return fetchApi(
            {
                pathname: '/todoes/update-many',
                method: 'PUT',
                data: { ids, updateFields }
            }
        )
    },

    deleteMany (ids) {
        return fetchApi({
            pathname: '/todoes/delete-many',
            method: 'POST',
            data: { ids }
        })
    },
}

export default todoApi
