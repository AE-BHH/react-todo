import React, { useState, useEffect } from 'react'
import TodoList from './TodoList'
import AddTodoForm from './AddTodoForm'

function App() {
	const [todoList, setTodoList] = useState(
		JSON.parse(localStorage.getItem('savedTodoList') || [])
	)
	const [isLoading, setIsLoading] = useState(true)
	console.log(isLoading)
	useEffect(() => {
		new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve({
					data: {
						todoList: JSON.parse(localStorage.getItem('savedTodoList') || []),
					},
				})
			}, 2000)
		})
			.then((result) => {
				console.log(result)
				console.log(result.data.todoList)
				setTodoList(result.data.todoList)
				setIsLoading(false)
			})
			.catch((error) => {
				console.log(error)
			})
	}, [])

	useEffect(() => {
		if (!isLoading) {
			localStorage.setItem('savedTodoList', JSON.stringify(todoList))
		}
	}, [todoList, isLoading])

	function removeTodo(id) {
		const updatedTodoList = todoList.filter((item) => item.id !== id)
		setTodoList(updatedTodoList)
	}

	function addTodo(newTodo) {
		setTodoList([...todoList, newTodo])
	}

	return (
		<>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<div>
					<h2> Todo List:</h2>
					<TodoList todoList={todoList} onRemoveTodo={removeTodo} />
				</div>
			)}

			<AddTodoForm onAddTodo={addTodo} />
		</>
	)
}

export default App
