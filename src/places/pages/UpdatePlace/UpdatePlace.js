import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Input from '../../../shared/components/FormElements/Input/Input';
import Button from '../../../shared/components/FormElements/Button/Button';
import Card from '../../../shared/components/UIElements/Card/Card';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';

import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../../shared/utils/validators';
import { useForm } from '../../../shared/hooks/form-hook';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import { AuthContext } from '../../../shared/context/auth-context';

import '../sharedCSS/PlaceForm.css';

const UpdatePlace = (props) => {
	const auth = useContext(AuthContext);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [ loadedPlace, setLoadedPlace ] = useState();
	const placeId = useParams().placeId;
	const history = useHistory();

	const initInputs = {
		title       : { value: '', isValid: false },
		description : { value: '', isValid: false }
	};
	const [ formState, inputHandler, setFormData ] = useForm(initInputs, true);

	useEffect(
		() => {
			const fetchPlace = async () => {
				try {
					const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`);
					setLoadedPlace(responseData.place);
					console.log(responseData.place.title);
					const inputs = {
						title       : { value: responseData.place.title, isValid: true },
						description : { value: responseData.place.description, isValid: true }
					};
					setFormData(inputs, true);
				} catch (err) {}
			};
			fetchPlace();
		},
		[ sendRequest, placeId, setFormData ]
	);

	const placeUpdateSubmitHandler = async (e) => {
		e.preventDefault();
		try {
			await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`,
				'PATCH',
				JSON.stringify({
					title       : formState.inputs.title.value,
					description : formState.inputs.description.value
				}),
				{
					'Content-Type' : 'application/json',
					Authorization  : 'Bearer ' + auth.token
				}
			);
			history.push(`/${auth.userId}/places`);
		} catch (err) {}
		console.log(formState.inputs);
	};

	if (isLoading) {
		return (
			<div className="center">
				<LoadingSpinner asOverlay />
			</div>
		);
	}

	if (!loadedPlace && !error) {
		return (
			<div className="center">
				<Card>
					<h2>Could'nt find place</h2>
				</Card>
			</div>
		);
	}

	//////////

	const formContent = (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			{!isLoading &&
			loadedPlace && (
				<form onSubmit={placeUpdateSubmitHandler} className="place-form">
					<Input
						id="title"
						element="text"
						label="Title"
						validators={[ VALIDATOR_REQUIRE() ]}
						errorText="Please enter valid title"
						onInput={inputHandler}
						initialValue={loadedPlace.title}
						initialValid={true}
					/>
					<Input
						id="description"
						element="textarea"
						label="Description"
						validators={[ VALIDATOR_MINLENGTH(5) ]}
						errorText="Please enter valid description (Min. 5 characters)."
						onInput={inputHandler}
						initialValue={loadedPlace.description}
						initialValid={true}
					/>
					<Button type="submit" disabled={!formState.isValid}>
						UPDATE PLACE
					</Button>
				</form>
			)}
		</React.Fragment>
	);
	return formContent;
};

export default UpdatePlace;
