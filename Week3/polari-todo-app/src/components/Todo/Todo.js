function Todo({ todo, index, completeTodo, removeTodo }) {
	return (
		<div className='todo' style={{ textDecoration: todo.completed ? 'line-through' : '' }}>
			{todo.title}
			<div>
				{!todo.completed && <button onClick={() => completeTodo(index)}>Complete</button>}

				<button onClick={() => removeTodo(index)}>x</button>
			</div>
		</div>
	);
}
export default Todo;
