import React from 'react'
import style from './TodoListItem.module.css'
import PropTypes from 'prop-types'

TodoListItem.propTypes = {
	listItem: PropTypes.string.isRequired,
	onRemoveTodo: PropTypes.func.isRequired,
}
function TodoListItem({ listItem, onRemoveTodo }) {
	console.log(listItem)
	return (
		<li className={style.ListItem}>
			{listItem.title}
			<button
				className={`btn ${style.btn}`}
				type='button'
				onClick={() => onRemoveTodo(listItem.id)}>
				Remove
			</button>
		</li>
	)
}

export default TodoListItem
