import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TodoList from './components/TodoList'
import AddTodoForm from './components/AddTodoForm'
import style from './components/TodoListItem.module.css'

function App() {
	const [todoList, setTodoList] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [sortedField, setSortedField] = useState('title')
	const [sortDirection, setSortedDirection] = useState('asc')

	const fetchData = async () => {
		const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}?view=Grid%20view&sort[0][field]=title&sort[0][direction]=${sortDirection}`

		const options = {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
			},
		}

		try {
			const response = await fetch(url, options)

			if (!response.ok) {
				const message = `Error has ocurred: ${response.status}`
				throw new Error(message)
			}
			const data = await response.json()

			data.records.sort((objA, objB) => {
				if (sortDirection === 'asc') {
					return objA[sortedField] < objB[sortedField] ? -1 : 1
				} else {
					return objA[sortedField] > objB[sortedField] ? -1 : 1
				}
			})

			const todos = data.records.map((todo) => {
				const newTodo = {
					id: todo.id,
					title: todo.fields.title,
					createdTime: todo.createdTime,
				}

				return newTodo
			})

			setTodoList([...todos])
			setIsLoading(false)
		} catch (error) {
			console.log(`Something went wrong: ${error}`)
		}
	}

	const postTodo = async (newTodo) => {
		try {
			const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`
			const options = {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					fields: {
						title: newTodo.title,
					},
				}),
			}

			const response = await fetch(url, options)

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`)
			}
			const data = await response.json()

			setTodoList([...todoList, { id: data.id, title: data.fields.title }])
		} catch (error) {
			console.error('Error adding todo:', error)
		}
	}

	useEffect(() => {
		fetchData()
	}, [sortedField, sortDirection])

	useEffect(() => {
		if (!isLoading) {
			localStorage.setItem('savedTodoList', JSON.stringify(todoList))
		}
	}, [todoList, isLoading])

	const removeTodo = async (id) => {
		try {
			const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}/${id}`
			const options = {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
				},
			}

			const response = await fetch(url, options)
			if (!response.ok) {
				throw new Error(`Error deleting todo: ${response.status}`)
			}

			setTodoList(todoList.filter((todo) => todo.id !== id))
		} catch (error) {
			console.error('Error deleting todo:', error)
		}
	}

	function addTodo(newTodo) {
		postTodo(newTodo)
	}

	function toggleSortDirection() {
		setSortedDirection(sortDirection === 'asc' ? 'desc' : 'asc')
	}

	function toggleSortField(field) {
		setSortedField(field)
	}

	return (
		<div className={style.container}>
			<BrowserRouter>
				<Routes>
					<Route
						path='/'
						element={
							<>
								<div className={style.navigation}>
									<label className={style.label}>sort by: </label>

									<button
										className={style.sortBtn}
										onClick={() => toggleSortField('title')}>
										<h3 style={{ fontSize: '1rem', fontWeight: 'bolder' }}>
											Title
										</h3>
									</button>
									<button
										className={style.sortBtn}
										onClick={() => toggleSortField('createdTime')}>
										<h3 style={{ fontSize: '1rem', fontWeight: 'bolder' }}>
											Time
										</h3>
									</button>
									<button
										className={style.sortBtn}
										onClick={toggleSortDirection}>
										{' '}
										<h3 style={{ fontWeight: 'bolder' }}>
											{sortDirection === 'asc' ? 'Ascending' : 'Descending'}
										</h3>
									</button>
								</div>
								<h2 className={`myTodoList ${style.myTodoList}`}>Todo List:</h2>
								<AddTodoForm onAddTodo={addTodo} />
								{isLoading ? (
									<p>Loading...</p>
								) : (
									<div>
										<TodoList todoList={todoList} onRemoveTodo={removeTodo} />
									</div>
								)}
							</>
						}></Route>
					<Route path='/new' element={<h1>New Todo List</h1>}></Route>0
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
