import React, { useReducer, useEffect } from 'react';
import { validate } from '../../../utils/validators';
import './Input.css';

const inputReducer = (state, action) => {
	switch (action.type) {
		case 'CHANGE':
			return {
				...state,
				value   : action.val,
				isValid : validate(action.val, action.validators)
			};
		case 'TOUCH':
			return {
				...state,
				isTouched : true
			};
		default:
			return state;
	}
};

const Input = (props) => {
	const { element, id, placeholder, columns, label, type, errorText, validators, onInput } = props;

	const [ inputState, dispatch ] = useReducer(inputReducer, {
		value     : props.value || '',
		isTouched : false,
		isValid   : props.valid || false
	});

	// const { value, isValid } = inputState;

	const changeHandler = (event) => {
		dispatch({
			type       : 'CHANGE',
			val        : event.target.value,
			validators : validators
		});
	};

	const touchHandler = () => {
		dispatch({
			type : 'TOUCH'
		});
	};

	const errorTextContent = <div className="error">{errorText}</div>;

	const inputElement =
		element === 'input' ? (
			<input
				id={id}
				placeholder={placeholder}
				type={type}
				onBlur={touchHandler}
				onChange={changeHandler}
				value={inputState.value}
			/>
		) : (
			<textarea
				name=""
				id={id}
				placeholder={placeholder}
				cols={columns || 30}
				onBlur={touchHandler}
				onChange={changeHandler}
				value={inputState.value}
			/>
		);

	useEffect(
		() => {
			onInput(id, inputState.value, inputState.isValid);
		},
		[ id, inputState.value, inputState.isValid, onInput ]
	);

	return (
		<div className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`}>
			<label htmlFor={id}>{label}</label>
			{inputElement}
			{!inputState.isValid && inputState.isTouched && errorTextContent}
		</div>
	);
};

export default Input;
