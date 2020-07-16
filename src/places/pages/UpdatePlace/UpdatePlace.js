import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../../shared/components/FormElements/Input/Input';
import Button from '../../../shared/components/FormElements/Button/Button';
import Card from '../../../shared/components/UIElements/Card/Card';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../../shared/utils/validators';
import { useForm } from '../../../shared/hooks/form-hook';

import '../sharedCSS/PlaceForm.css';

const DUMMY_PLACES = [
	{
		id          : 'p1',
		imageUrl    : 'https://media.timeout.com/images/101705309/image.jpg',
		title       : 'P1 Empire State Building',
		description :
			'P1 - Iconic, art deco office tower from 1931 with exhibits & observatories on the 86th & 102nd floors.',
		address     : '20 W 34th St, New York, NY 10001',
		creator     : 'u1',
		location    : { lat: 40.7484405, lng: -73.9878531 }
	},
	{
		id          : 'p2',
		imageUrl    : 'https://media.timeout.com/images/101705309/image.jpg',
		title       : 'P2 Empire State ',
		description :
			'P2 - Iconic, art deco office tower from 1931 with exhibits & observatories on the 86th & 102nd floors.',
		address     : '20 W 34th St, New York, NY 10001',
		creator     : 'u2',
		location    : { lat: 40.7484405, lng: -73.9878531 }
	}
];

const UpdatePlace = (props) => {
	const [ isLoading, setIsLoading ] = useState(true);
	const placeId = useParams().placeId;
	const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);

	const initInputs = {
		title       : { value: '', isValid: false },
		description : { value: '', isValid: false }
	};

	const [ formState, inputHandler, setFormData ] = useForm(initInputs, true);

	useEffect(
		() => {
			if (identifiedPlace) {
				const inputs = {
					title       : { value: identifiedPlace.title, isValid: true },
					description : { value: identifiedPlace.description, isValid: true }
				};
				setFormData(inputs, true);
			}
			setIsLoading(false);
		},
		[ setFormData, identifiedPlace ]
	);

	const placeUpdateSubmitHandler = (e) => {
		e.preventDefault();
		//Send to backend
		console.log(formState.inputs);
	};

	if (!identifiedPlace) {
		return (
			<div className="center">
				<Card>
					<h2>Could'nt find place</h2>
				</Card>
			</div>
		);
	}

	if (!formState.inputs.title.value) {
		return (
			<div className="center">
				<h2>Loading...</h2>
			</div>
		);
	}

	//////////

	const formContent = (
		<form onSubmit={placeUpdateSubmitHandler} className="place-form">
			<Input
				id="title"
				element="text"
				label="Title"
				validators={[ VALIDATOR_REQUIRE() ]}
				errorText="Please enter valid title"
				onInput={inputHandler}
				initialValue={formState.inputs.title.value}
				initialValid={formState.inputs.title.isValid}
			/>
			<Input
				id="description"
				element="textarea"
				label="Description"
				validators={[ VALIDATOR_MINLENGTH(5) ]}
				errorText="Please enter valid description (Min. 5 characters)."
				onInput={inputHandler}
				initialValue={formState.inputs.description.value}
				initialValid={formState.inputs.description.isValid}
			/>
			<Button type="submit" disabled={!formState.isValid}>
				UPDATE PLACE
			</Button>
		</form>
	);
	return formContent;
};

export default UpdatePlace;
