import React, { useContext } from 'react';

import { useHistory } from 'react-router-dom';
import Input from '../../../shared/components/FormElements/Input/Input';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../../shared/utils/validators';

import Button from '../../../shared/components/FormElements/Button/Button';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import ImageUpload from '../../../shared/components/FormElements/ImageUpload/ImageUpload';

import { useForm } from '../../../shared/hooks/form-hook';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import { AuthContext } from '../../../shared/context/auth-context';
import '../sharedCSS/PlaceForm.css';

const _formStateInputs = {
	title       : { value: '', isValid: false },
	description : { value: '', isValid: false },
	address     : { value: '', isValid: false },
	image       : { value: null, isValid: false }
};

const NewPlace = (props) => {
	const auth = useContext(AuthContext);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [ formState, inputHandler ] = useForm(_formStateInputs, false);

	const history = useHistory();

	const placeSubmitHandler = async (e) => {
		e.preventDefault();

		console.log('startomg', auth.token);
		//send this to the backend
		try {
			const formData = new FormData();
			formData.append('title', formState.inputs.title.value);
			formData.append('description', formState.inputs.description.value);
			formData.append('address', formState.inputs.address.value);
			formData.append('image', formState.inputs.image.value);
			console.log('Form data', formData);
			await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places`, 'POST', formData, {
				Authorization : 'Bearer ' + auth.token
			});
			history.push('/');
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			<form onSubmit={placeSubmitHandler} className="place-form">
				{isLoading && <LoadingSpinner asOverlay />}
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
				<ImageUpload id="image" onInput={inputHandler} errorText="Please provide an image" />
				<Button type="submit" disabled={!formState.isValid} onClick={placeSubmitHandler}>
					ADD PLACE
				</Button>
			</form>
		</React.Fragment>
	);
};
export default NewPlace;
