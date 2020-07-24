import React, { useState, useContext } from 'react';

import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/utils/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

import ErrorModal from '../../shared/components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import Card from '../../shared/components/UIElements/Card/Card';
import Input from '../../shared/components/FormElements/Input/Input';
import Button from '../../shared/components/FormElements/Button/Button';
import ImageUpload from '../../shared/components/FormElements/ImageUpload/ImageUpload';
import '../../places/pages/sharedCSS/PlaceForm.css';

const Auth = (props) => {
	const auth = useContext(AuthContext);
	const [ isLoginMode, setIsLoginMode ] = useState(true);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [ formState, inputHandler, setFormData ] = useForm(
		{
			email    : { value: '', isValid: false },
			password : { value: '', isValid: false }
		},
		false
	);

	const authSubmitHandler = async (e) => {
		e.preventDefault(e);
		// console.log(formState.inputs);
		if (isLoginMode) {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/users/login`,
					'POST',
					JSON.stringify({
						email    : formState.inputs.email.value,
						password : formState.inputs.password.value
					}),
					{
						'Content-Type' : 'application/json'
					}
				);
				auth.login(responseData.userId, responseData.token);
			} catch (err) {
				console.log(err);
			}
		} else {
			try {
				const formData = new FormData();
				formData.append('email', formState.inputs.email.value);
				formData.append('name', formState.inputs.name.value);
				formData.append('password', formState.inputs.password.value);
				formData.append('image', formState.inputs.image.value);
				const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/users/signup`, 'POST', formData);
				auth.login(responseData.userId, responseData.token);
			} catch (err) {
				console.log(err);
			}
		}
	};

	const switchModeHandler = (e) => {
		if (!isLoginMode) {
			setFormData(
				{
					...formState.inputs,
					name  : undefined,
					image : undefined
				},
				formState.inputs.email.isValid && formState.inputs.password.isValid
			);
		} else {
			setFormData(
				{
					...formState.inputs,
					name  : { value: '', isValid: false },
					image : { value: null, isValid: false }
				},
				false
			);
		}

		setIsLoginMode((prevMode) => !prevMode);
	};

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />

			<Card>
				{isLoading && <LoadingSpinner asOverlay />}
				<h2>{isLoginMode ? 'Login' : 'Sign Up'} </h2>
				<form onSubmit={authSubmitHandler}>
					{!isLoginMode && (
						<Input
							element="input"
							id="name"
							type="text"
							label="Your Name"
							validators={[ VALIDATOR_REQUIRE() ]}
							errorText="Please enter name"
							onInput={inputHandler}
						/>
					)}
					{!isLoginMode && (
						<ImageUpload center id="image" onInput={inputHandler} errorText="Please provide an image" />
					)}
					<Input
						element="input"
						onInput={inputHandler}
						type="text"
						id="email"
						label="Email Address"
						errorText="Please enter a valid email address"
						validators={[ VALIDATOR_EMAIL() ]}
					/>
					<Input
						element="input"
						onInput={inputHandler}
						type="password"
						id="password"
						label="Passowrd"
						errorText="Please enter 6 digit password"
						validators={[ VALIDATOR_MINLENGTH(6) ]}
					/>
					<Button type="submit" disabled={!formState.isValid}>
						{isLoginMode ? 'Login' : 'SIGNUP'}
					</Button>
					<Button className="inverse" onClick={switchModeHandler}>
						Switch to {isLoginMode ? 'SIGNUP' : 'LOG IN'}
					</Button>
				</form>
			</Card>
		</React.Fragment>
	);
};

export default Auth;
