import React, { useCallback, useReducer } from 'react';
import Input from '../../../shared/components/FormElements/Input/Input';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../../shared/utils/validators';
import Button from '../../../shared/components/FormElements/Button/Button';
import '../sharedCSS/PlaceForm.css';

const formReducer = (state, action) => {
	switch (action.type) {
		case 'INPUT_CHANGE':
			let formIsValid = true;
			for (const inputId in state.inputs) {
				// console.log(action);
				if (inputId === action.inputId) {
					formIsValid = formIsValid && action.isValid;
				} else {
					// formIsValid = true;
					formIsValid = formIsValid && state.inputs[inputId].isValid;
				}
			}
			return {
				...state,
				inputs  : {
					...state.inputs,
					[action.inputId]: { value: action.value, isValid: action.isValid }
				},
				isValid : formIsValid
			};
		default:
			return state;
	}
};

const NewPlace = (props) => {
	const [ formState, dispatch ] = useReducer(formReducer, {
		inputs  : {
			title       : { value: '', isValid: false },
			description : { value: '', isValid: false }
		},
		isValid : false
	});

	const inputHandler = useCallback((id, value, isValid) => {
		dispatch({ type: 'INPUT_CHANGE', value: value, isValid: isValid, inputId: id });
	}, []);

	const placeSubmitHandler = (e) => {
		e.preventDefault();

		//send this to the backend
		console.log(formState.inputs);
	};

	return (
		<form action="" className="place-form">
			<Input
				id="title"
				element="input"
				label="Title"
				type="text"
				validators={[ VALIDATOR_REQUIRE() ]}
				onInput={inputHandler}
				errorText="Please enter a valid title"
				value="asdd"
			/>
			<Input
				id="description"
				element="textarea"
				label="Description"
				type="text"
				validators={[ VALIDATOR_MINLENGTH(5) ]}
				onInput={inputHandler}
				errorText="Please enter a valid description atleast 5 characters"
				value="desc"
			/>
			<Input
				id="address"
				element="input"
				label="Address"
				type="text"
				validators={[ VALIDATOR_REQUIRE() ]}
				onInput={inputHandler}
				errorText="Please enter a valid address"
			/>
			<Button type="submit" disabled={!formState.isValid} onClick={placeSubmitHandler}>
				ADD PLACE
			</Button>
		</form>
	);
};
export default NewPlace;
