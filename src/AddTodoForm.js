import React from 'react'

const AddTodoForm = (props) => {
	function handleAddTodo(event) {
		event.preventDefault()
		console.log(event)

		const todoTitle = event.target.title.value
		props.onAddTodo(todoTitle)
		event.target.reset()
	}

	return (
		<>
			<form onSubmit={handleAddTodo}>
				<label htmlFor='todoTitle'>Title</label>
				<input type='text' id='todoTitle' name='title'></input>
				<button type='submit'>Submit</button>
			</form>
		</>
	)
}

export default AddTodoForm
