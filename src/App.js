import React, { useState, useEffect } from 'react'
import TodoList from './TodoList'
import AddTodoForm from './AddTodoForm'

function useSemiPersistentState(key, initialState) {
	const savedValue = localStorage.getItem(key) || initialState
	console.log(savedValue)

	const [value, setValue] = useState(JSON.parse(savedValue))

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value))
	}, [key, value])
	return [value, setValue]
}
function App() {
	const [todoList, setTodoList] = useSemiPersistentState('savedTodoList', [])

	function removeTodo(id) {
		const updatedTodoListArr = todoList.filter((item) => item.id !== id)
		setTodoList(updatedTodoListArr)
	}

	function addTodo(newTodo) {
		setTodoList([...todoList, newTodo])
	}

	return (
		<>
			<h1>Todo List</h1>
			<TodoList todoList={todoList} onRemoveTodo={removeTodo} />
			<AddTodoForm onAddTodo={addTodo} />
		</>
	)
}

export default App
