import './App.css';
import { Routes, Route } from 'react-router-dom';
import TodoPage from './pages/TodoPage/TodoPage';
import AppLayout from './layouts/AppLayout';
function App() {
	return (
		<div>
			<AppLayout>
				<Routes>
					<Route path='/todoes' element={<TodoPage />} />
				</Routes>
			</AppLayout>
		</div>
	);
}

export default App;
