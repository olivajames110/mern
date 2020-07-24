import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';

import MainNavigation from './shared/components/Navigation/MainNavigation/MainNavigation';
import Users from './user/pages/Users';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner/LoadingSpinner';

const Auth = React.lazy(() => import('./user/pages/Auth'));
const UserPlaces = React.lazy(() => import('./places/pages/UserPlaces/UserPlaces'));
const NewPlace = React.lazy(() => import('./places/pages/NewPlace/NewPlace'));
const UpdatePlace = React.lazy(() => import('./places/pages/UpdatePlace/UpdatePlace'));

const App = () => {
	let { token, login, logout, userId } = useAuth();

	let routes;

	if (token) {
		routes = (
			<Switch>
				<Route path="/" exact>
					<Users />
				</Route>
				<Route path="/:userId/places" exact>
					<UserPlaces />
				</Route>
				<Route path="/places/new" exact>
					<NewPlace />
				</Route>
				<Route path="/places/:placeId" exact>
					<UpdatePlace />
				</Route>
				<Redirect to="/" />
			</Switch>
		);
	} else {
		routes = (
			<Switch>
				<Route path="/" exact>
					<Users />
				</Route>
				<Route path="/:userId/places" exact>
					<UserPlaces />
				</Route>
				<Route path="/auth" exact>
					<Auth />
				</Route>
				<Redirect to="/auth" />
			</Switch>
		);
	}

	const loadingSpinner = (
		<div className="center">
			<LoadingSpinner />
		</div>
	);

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn : !!token,
				token      : token,
				userId     : userId,
				login      : login,
				logout     : logout
			}}
		>
			<Router>
				<MainNavigation />
				<main>
					<Suspense fallback={loadingSpinner}>{routes}</Suspense>
				</main>
			</Router>
		</AuthContext.Provider>
	);
};

export default App;
