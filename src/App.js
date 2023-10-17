import React from 'react'
import TodoList from './TodoList'
import AddTodoForm from './AddTodoForm'

function App() {
	const [newTodo, setNewTodo] = React.useState('')
	return (
		<>
			<h1>Todo List</h1>
			<TodoList />
			<AddTodoForm onAddTodo={setNewTodo} />
			<p>Here is: {newTodo}</p>
		</>
	)
}

export default App
