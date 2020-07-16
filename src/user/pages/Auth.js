import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Input from '../../shared/components/FormElements/Input/Input';
import Button from '../../shared/components/FormElements/Button/Button';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/utils/validators';
import Card from '../../shared/components/UIElements/Card/Card';
import { useForm } from '../../shared/hooks/form-hook';
import '../../places/pages/sharedCSS/PlaceForm.css';
import { AuthContext } from '../../shared/context/auth-context';
const Auth = (props) => {
	const auth = useContext(AuthContext);
	const [ isLoginMode, setIsLoginMode ] = useState(true);
	const [ formState, inputHandler, setFormData ] = useForm(
		{
			email    : { value: '', isValid: false },
			password : { value: '', isValid: false }
		},
		false
	);

	const authSubmitHandler = (e) => {
		e.preventDefault(e);
		auth.login();
		return <Redirect push to="/" />;
		console.log(formState.inputs);
	};

	const switchModeHandler = (e) => {
		if (!isLoginMode) {
			setFormData(
				{
					...formState.inputs,
					name : undefined
				},
				formState.inputs.email.isValid && formState.inputs.password.isValid
			);
		} else {
			setFormData({ ...formState.inputs, name: { value: '', isValid: false } }, false);
		}

		setIsLoginMode((prevMode) => !prevMode);
	};

	return (
		<Card>
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
	);
};

export default Auth;
