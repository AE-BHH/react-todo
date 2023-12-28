import React from 'react'

function TodoListItem({ listItem, onRemoveTodo }) {
	console.log(listItem)
	return (
		<li>
			{listItem.title}
			<button type='button' onClick={() => onRemoveTodo(listItem.id)}>
				Remove
			</button>
		</li>
	)
}

export default TodoListItem
