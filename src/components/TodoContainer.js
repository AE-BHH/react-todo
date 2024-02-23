import { useState} from 'react'
import TodoList from './TodoList'
import AddTodoForm from './AddTodoForm'
// import PropTypes from 'prop-types'

// const sortByLastModifiedTime =
// 	'?sort[0][field]=completed&sort[0][direction]=asc&sort[1][field]=lastModifiedTime&sort[1][direction]=asc'
const baseUrl = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/`

function TodoContainer() {
	const [todoList, setTodoList] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [currentSortField, setCurrentSortField] = useState('title')

	const fetchData = async () => {
		try {
			setIsLoading(true)
			const options = {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
				},
			}

			const response = await fetch(options)
			if (!response.ok) {
				throw new Error(`Error: ${response.status}`)
			}
			const data = await response.json()
			setIsLoading(false)
			return data
		} catch (error) {
			setIsLoading(false)
			console.log(error)
		}
	}

	const getTodos = async (Default) => {
		try {
			debugger
			const url = `${baseUrl}${Default}?view=Grid%20view`
			const data = await fetchData({ method: 'GET', url })
			debugger
			const todos = data.records.map((todo) => ({
				title: todo.fields.title,
				id: todo.id,
				completeDateTime: todo.fields.completeDateTime,
				createDateTime: todo.fields.createDateTime,
			}))

			setTodoList(todos)
			updateSorts(todos, currentSortField)
		} catch (error) {
			console.log(error)
		}
	}
	// useEffect(() => {
	// 	getTodos(tableName)
	// }, [tableName])

	const addTodo = async (newTodo) => {
		try {
			const url = `${baseUrl}`
			const data = await fetchData({
				method: 'POST',
				url,
				headers: { 'Content-Type': 'application/json' },
				body: { fields: { title: newTodo.title } },
			})

			
		} catch (error) {
			console.log(error)
		}
	}

	const updateTodo = async (newTodo) => {
		try {
			const url = `${baseUrl}/${newTodo.id}`
			const data = await fetchData({
				method: 'PATCH',
				url,
				headers: { 'Content-Type': 'application/json' },
				body: {
					fields: {
						completeDateTime: newTodo.completeDateTime,
						title: newTodo.title,
					},
				},
			})
		
		} catch (error) {
			console.log(error)
		}
	}
	const deleteTodo = async (id) => {
		try {
			const url = `${baseUrl}/${id}`
			const data = await fetchData({
				method: 'DELETE',
				url,
				headers: { 'Content-Type': 'application/json' },
			})

			return data
		} catch (error) {
			console.log(error)
		}
	}

	const removeTodo = (id) => {
		deleteTodo(id)
		const newTodoList = todoList.filter((todo) => todo.id !== id)
		setTodoList(newTodoList)
	}
	const toggleTodoCompletion = (id) => {
		let todo = todoList.find((itemTodo) => itemTodo.id === id)
		todo.completeDateTime = todo.completeDateTime
			? null
			: new Date().toISOString()

		updateTodo(todo)
	}

	const updateNewTitle = (id, newTitle) => {
		let todo = todoList.find((itemTodo) => itemTodo.id === id)
		todo.title = newTitle
		updateTodo(todo)
	}

	const reorderTodo = (newTodoList) => {
		setTodoList(newTodoList)
	}

	const updateSorts = (todos, sortBy) => {
		let sortedTodos = []
		if (sortBy === 'title') {
			sortedTodos = [...todos].sort((objectA, objectB) => {
				const titleA = objectA.title.toUpperCase()
				const titleB = objectB.title.toUpperCase()

				return titleA < titleB ? -1 : titleA === titleB ? 0 : 1
			})
		} else if (sortBy === 'completeDateTime') {
			sortedTodos = [...todoList].sort((objectA, objectB) => {
				const dateA = new Date(objectA.completeDateTime)
				const dateB = new Date(objectB.completeDateTime)

				if (isNaN(dateA)) return -1
				if (isNaN(dateB)) return 1

				return dateA - dateB
			})
		}
		console.log(sortedTodos)
		setTodoList(sortedTodos)
	}

	return (
		<section style={{ position: 'relative' }}>
			<span className='containerTop'>
				<select
					className='right-select'
					onChange={(e) => {
						setCurrentSortField(e.target.value)
						updateSorts(todoList, e.target.value)
					}}>
					<option value='title'>title</option>
					<option value='completeDateTime'>completeDateTime</option>
				</select>
			</span>

			<AddTodoForm onAddTodo={addTodo} />
			{isLoading && <p>Loading...</p>}

			<TodoList
				todoList={todoList}
				onRemoveTodo={removeTodo}
				onToggleCompletion={toggleTodoCompletion}
				onReorderTodo={reorderTodo}
				onUpdateNewTitle={updateNewTitle}
			/>
		</section>
	)
}

export default TodoContainer
