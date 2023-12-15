import React from 'react'
import InputWithLabel from './InputWithLabel'

function AddTodoForm(props) {
	const { onAddTodo } = props
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
			<InputWithLabel
				todoTitle={todoTitle}
				handleTitleChange={handleTitleChange}
			>Title</InputWithLabel>
			<form onSubmit={handleAddTodo}>
				<button type='submit'>Submit</button>
			</form>
		</>
	)
}

export default AddTodoForm
