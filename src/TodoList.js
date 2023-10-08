import React from 'react'

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
					return <li key={item.id}>{item.title}</li>
				})}
			</ul>
		</>
	)
}

export default TodoList;