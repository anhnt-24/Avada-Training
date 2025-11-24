import { useEffect, useState } from 'react'
import todoApi from '../helpers/api/todoApi'

export default function useFetchTodoes () {
    const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(false)
    const [fetched, setFetched] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const loadTodoes = async () => {
            try {
                setLoading(true)
                setError(null)

                const todoesList = await todoApi.getTodos()
                setTodos(todoesList.data)
                setFetched(true)
            } catch (err) {
                console.error('Failed to load todos:', err)
                setError(err.message || 'Failed to fetch todos')
            } finally {
                setLoading(false)
            }
        }
        loadTodoes()
    }, [])

    return {
        todos,
        loading,
        fetched,
        error,
        setTodos,
    }
}
