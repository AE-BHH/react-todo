import React, { useState, useEffect } from 'react'
import TodoList from './TodoList'
import AddTodoForm from './AddTodoForm'

function App() {
	const [todoList, setTodoList] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	const fetchData = async () => {
		const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`
		console.log(url)

		const options = {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
			},
		}
		try {
			const response = await fetch(url, options)
			console.log(response)
			if (!response.ok) {
				const message = `Error has ocurred: ${response.status}`
				throw new Error(message)
			}
			const data = await response.json()

			const todos = data.records.map((todo) => {
				const newTodo = {
					id: todo.id,
					title: todo.fields.title,
				}

				return newTodo
			})
			setTodoList([...todos])
			setIsLoading(false)
		} catch (error) {
			console.log(`Something went wrong: ${error}`)
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	useEffect(() => {
		if (!isLoading) {
			localStorage.setItem('savedTodoList', JSON.stringify(todoList))
		}
	}, [todoList, isLoading])
	console.log(todoList)

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
