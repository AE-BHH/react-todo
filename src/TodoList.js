import React from 'react'
import TodoListItem from './TodoListItem'

const todoList = [
	{
		id: '1',
		title: 'Family call',
	},
	{
		id: '2',
		title: 'Shopping groceries',
	},
	{
		id: '3',
		title: 'CTD assignment due 10/3',
	},
]

const TodoList = () => {
	return (
		<>
			<ul>
				{todoList.map((item) => {
					return <TodoListItem key={item.id}
					props={item} />
					
				})}
			</ul>
		</>
	)
}

export default TodoList
