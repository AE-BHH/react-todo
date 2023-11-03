import React from 'react'
import TodoListItem from './TodoListItem'

function TodoList({ todoList }) {
	return (
		<>
			<ul>
				{todoList.map((todo) => {
					return <TodoListItem key={todo.id} listItem={todo} />
				})}
			</ul>
		</>
	)
}

export default TodoList
