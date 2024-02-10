import React from 'react'
import { useRef, useEffect } from 'react'
import style from './TodoListItem.module.css'
import PropTypes from 'prop-types'

InputWithLabel.propTypes = {
	todoTitle: PropTypes.string.isRequired,
	handleTitleChange: PropTypes.func.isRequired,
	children: PropTypes.node
}

function InputWithLabel({ todoTitle, handleTitleChange, children }) {
	const inputRef = useRef()

	useEffect(() => {
		inputRef.current.focus()
	})

	return (
		<>
			<label htmlFor='todoTitle'>{children}</label>
			<input
				className={`inputField ${style.inputField}`}
				ref={inputRef}
				type='text'
				id='todoTitle'
				name='title'
				value={todoTitle}
				placeholder='Type your todo list...'
				onChange={handleTitleChange}></input>
		</>
	)
}

export default InputWithLabel
