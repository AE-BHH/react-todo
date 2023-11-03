import React from 'react'
import TodoList from './TodoList'
import AddTodoForm from './AddTodoForm'

function App() {
	const [todoList, setTodoList] = React.useState([])

	function addTodo(newTodo) {
		setTodoList([...todoList, newTodo])
	}

	return (
		<>
			<h1>Todo List</h1>
			<TodoList todoList={todoList} />
			<AddTodoForm onAddTodo={addTodo} />
		</>
	)
}

export default App
