import React from 'react';
import Input from '../../../shared/components/FormElements/Input/Input';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../../shared/utils/validators';
import Button from '../../../shared/components/FormElements/Button/Button';
import '../sharedCSS/PlaceForm.css';
import { useForm } from '../../../shared/hooks/form-hook';

const inputs = {
	title       : { value: '', isValid: false },
	description : { value: '', isValid: false },
	address     : { value: '', isValid: false }
};

const NewPlace = (props) => {
	const [ formState, inputHandler ] = useForm(inputs, false);

	const placeSubmitHandler = (e) => {
		e.preventDefault();

		//send this to the backend
		console.log(formState.inputs);
	};

	return (
		<form onSubmit={placeSubmitHandler} className="place-form">
			<Input
				id="title"
				element="input"
				label="Title"
				type="text"
				validators={[ VALIDATOR_REQUIRE() ]}
				onInput={inputHandler}
				errorText="Please enter a valid title"
			/>
			<Input
				id="description"
				element="textarea"
				label="Description"
				type="text"
				validators={[ VALIDATOR_MINLENGTH(5) ]}
				onInput={inputHandler}
				errorText="Please enter a valid description atleast 5 characters"
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
