import React from 'react'
import TodoListItem from './TodoListItem'
import PropTypes from 'prop-types'

TodoListItem.propTypes = {
	todoList: PropTypes.string.isRequired,
	onRemoveTodo: PropTypes.func.isRequired
}

function TodoList({ todoList, onRemoveTodo }) {
	return (
		<>
			<ul>
				{todoList.map((todo) => {
					return (
						<TodoListItem
							key={todo.id}
							listItem={todo}
							onRemoveTodo={onRemoveTodo}
						/>
					)
				})}
			</ul>
		</>
	)
}

export default TodoList
