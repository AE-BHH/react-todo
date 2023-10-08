import React from 'react'

const AddTodoForm = () => {
	return (
		<>
			<form>
				<label htmlFor='todoTitle'>Title</label>
				<input type='text' id='todoTitle'></input>
			</form>
			<button type='submit'>Submit</button>
		</>
	)
}

export default AddTodoForm
