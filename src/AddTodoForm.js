import React from 'react'
import InputWithLabel from './InputWithLabel'
import style from './TodoListItem.module.css'

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
					{/* <h4 style={{color: 'white', fontWeight: '900'}}>Title</h4> */}
				</InputWithLabel>

				<button className={`btnSubmit ${style.btnSubmit}`} type='submit'>SUBMIT</button>
			</form>
		</>
	)
}

export default AddTodoForm
