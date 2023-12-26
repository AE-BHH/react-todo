import React from 'react'
import InputWithLabel from './InputWithLabel'

function AddTodoForm({ onAddTodo }) {
	// const { onAddTodo } = props
	const [todoTitle, setTodoTitle] = React.useState('')

	function handleTitleChange(event) {
		const newTodoTitle = event.target.value
		setTodoTitle(newTodoTitle)
	}

	function handleAddTodo(event) {
		event.preventDefault()

		onAddTodo({ title: todoTitle, id: Date.now() })
		setTodoTitle('')
	}

	return (
		<>
			<form onSubmit={handleAddTodo}>
				<InputWithLabel
					todoTitle={todoTitle}
					handleTitleChange={handleTitleChange}>
					Title
				</InputWithLabel>

				<button type='submit'>Submit</button>
			</form>
		</>
	)
}

export default AddTodoForm
