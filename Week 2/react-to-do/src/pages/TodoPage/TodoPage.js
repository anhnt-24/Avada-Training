import Todo from '../../components/Todo/Todo';
import TodoForm from '../../components/TodoForm/TodoForm';
import useFetchTodoes from '../../hooks/useFetchTodoes';
import todoApi from '../../helpers/api/todoApi';
import React from 'react';

function TodoPage() {
	const { todos, setTodos, loading, error, fetched } = useFetchTodoes();
	const [submitting, setSubmitting] = React.useState(false);
	const addTodo = async text => {
		if (submitting) return;
		setSubmitting(true);
		try {
			const newTodo = await todoApi.createTodo({ title: text, completed: false });
			setTodos(prev => [...prev, newTodo.data]);
		} catch (err) {
			console.error('Failed to add todo:', err);
		} finally {
			setSubmitting(false);
		}
	};
	const completeTodo = async todo => {
		try {
			const updated = await todoApi.updateTodo(todo.id, { completed: true });
			setTodos(prev => prev.map(t => (t.id === updated.data.id ? updated.data : t)));
		} catch (err) {
			console.error('Failed to complete todo:', err);
		}
	};

	const removeTodo = async todo => {
		try {
			await todoApi.deleteTodo(todo.id);
			setTodos(prev => prev.filter(t => t.id !== todo.id));
		} catch (err) {
			console.error('Failed to delete todo:', err);
		}
	};

	if (loading) return <p>Loading todos...</p>;
	if (error) return <p>Error: {error}</p>;
	if (!fetched) return null;

	return (
		<div className='todo-list'>
			{todos.map((todo, index) => (
				<Todo key={todo.id} index={index} todo={todo} completeTodo={() => completeTodo(todo)} removeTodo={() => removeTodo(todo)} />
			))}
			<TodoForm addTodo={addTodo} />
		</div>
	);
}

export default TodoPage;
