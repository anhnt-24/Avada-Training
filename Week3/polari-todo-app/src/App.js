import React, { useState, } from 'react'
import {
    Badge,
    Box,
    Button,
    ButtonGroup,
    Card,
    Checkbox,
    InlineStack,
    Modal,
    Page,
    ResourceItem,
    ResourceList,
    Text
} from '@shopify/polaris'
import '@shopify/polaris/build/esm/styles.css'
import AppLayout from './layout/AppLayout'
import TodoModalForm from './components/TodoForm/TodoForm'
import useFetchTodoes from './hooks/useFetchTodoes'
import todoApi from './helpers/api/todoApi'

export default function App () {
    const { todos, loading, fetched, error, setTodos } = useFetchTodoes()

    const [selectedResources, setSelectedResources] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [todo, setTodo] = useState('')
    const [submitting, setSubmitting] = React.useState(false)
    const addTodo = async text => {
        if (submitting) return
        setSubmitting(true)
        try {
            const newTodo = await todoApi.createTodo({ title: text, completed: false })
            setTodos(prev => [...prev, newTodo.data])
            setSelectedResources([])
            setIsModalOpen(false)
            setTodo('')
        } catch (err) {
            console.error('Failed to add todo:', err)
        } finally {
            setSubmitting(false)
        }
    }
    const toggleCompleteTodo = async todo => {
        try {
            const updated = await todoApi.updateTodo(todo.id, { completed: !todo.completed })
            setTodos(prev => prev.map(t => (t.id === updated.data.id ? updated.data : t)))
        } catch (err) {
            console.error('Failed to complete todo:', err)
        }
    }

    const removeTodo = async todo => {
        try {
            await todoApi.deleteTodo(todo.id)
            setTodos(prev => prev.filter(t => t.id !== todo.id))
            setSelectedResources(prev => prev.filter(i => i !== todo.id))
        } catch (err) {
            console.error('Failed to delete todo:', err)
        }
    }

    const handleSelectionChange = selected => {
        setSelectedResources(selected)
    }

    const allSelected = selectedResources.length === todos.length && todos.length > 0

    const toggleSelectAll = () => {
        if (allSelected) {
            setSelectedResources([])
        } else {
            setSelectedResources(todos.map(t => t.id))
        }
    }

    const deleteManyTodoes = async () => {
        try {
            await todoApi.deleteMany(selectedResources)
            setTodos(prev => prev.filter(t => !selectedResources.includes(t.id)))
            setSelectedResources([])
        } catch (err) {
            console.error('Failed to delete todos:', err)
        }
    }

    const updateManyTodoes = async completed => {
        try {
            await todoApi.updateMany(selectedResources, { completed })
            setTodos(prev => prev.map(t => (selectedResources.includes(t.id) ? { ...t, completed } : t)))
            setSelectedResources([])
        } catch (err) {
            console.error('Failed to update todos:', err)
        }
    }
    return (
        <AppLayout>
            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Create todo"
                primaryAction={{
                    content: 'Add',
                    onAction: () => addTodo(todo),
                }}
                secondaryActions={[{ content: 'Cancel', onAction: () => setIsModalOpen(false) }]}>
                <TodoModalForm value={todo} onChange={setTodo}/>
            </Modal>
            <Page
                title="Todoes"
                primaryAction={{
                    content: 'Create',
                    onAction: () => setIsModalOpen(true),

                }}>
                <ResourceList
                    resourceName={{ singular: 'todo', plural: 'todos' }}
                    items={todos}
                    selectedItems={selectedResources}
                    onSelectionChange={handleSelectionChange}
                    filterControl={
                        <InlineStack blockAlign="center" gap={'200'}>
                            {todos.length > 0 && (
                                <Checkbox
                                    label={selectedResources.length > 0 ? `${selectedResources.length} selected` : ''}
                                    checked={allSelected}
                                    indeterminate={selectedResources.length > 0 && selectedResources.length < todos.length}
                                    onChange={toggleSelectAll}
                                />
                            )}
                        </InlineStack>
                    }
                    renderItem={item => {
                        const { id, title, completed } = item
                        return (
                            <ResourceItem id={id} accessibilityLabel={`Todo: ${title}`}>
                                <InlineStack blockAlign="center" gap={'100'}>
                                    <Checkbox
                                        checked={selectedResources.includes(id)}
                                        onChange={() => {
                                            if (selectedResources.includes(id)) {
                                                setSelectedResources(selectedResources.filter(sid => sid !== id))
                                            } else {
                                                setSelectedResources([...selectedResources, id])
                                            }
                                        }}
                                    />
                                    <div style={{ flex: 1 }}>
                                        <Text variant="headingSm">{title}</Text>
                                    </div>
                                    <Badge
                                        tone={completed ? 'success' : 'warning'}>{completed ? 'Complete' : 'Incomplete'}</Badge>
                                    <Button
                                        size="micro"
                                        onClick={e => {
                                            e.stopPropagation()
                                            toggleCompleteTodo(item)
                                        }}>
                                        {!completed ? 'Complete' : 'Incomplete'}
                                    </Button>
                                    <Button size="micro" tone="critical" onClick={() => removeTodo(item)}>
                                        Delete
                                    </Button>
                                </InlineStack>
                            </ResourceItem>
                        )
                    }}
                />

                {selectedResources.length > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
                        <Card marginTop>
                            <ButtonGroup>
                                <Box background="bg" borderRadius="200">
                                    <Button variant="tertiary" onClick={() => updateManyTodoes(true)}>
                                        Complete
                                    </Button>
                                </Box>
                                <Box background="bg" borderRadius="200">
                                    <Button variant="tertiary" onClick={() => updateManyTodoes(false)}>
                                        Incomplete
                                    </Button>
                                </Box>
                                <Box background="bg" borderRadius="200">
                                    <Button variant="tertiary" tone="critical" onClick={deleteManyTodoes}>
                                        Delete
                                    </Button>
                                </Box>
                            </ButtonGroup>
                        </Card>
                    </div>
                )}
            </Page>
        </AppLayout>
    )
}
