import React from 'react'
import { useRef, useEffect } from 'react'

function InputWithLabel({ todoTitle, handleTitleChange, children }) {
	const inputRef = useRef()

	useEffect(() => {
		inputRef.current.focus()
	})
	return (
		<>
			<label htmlFor='todoTitle'>{children}</label>
			<input
				ref={inputRef}
				type='text'
				id='todoTitle'
				name='title'
				value={todoTitle}
				onChange={handleTitleChange}></input>
		</>
	)
}

export default InputWithLabel
