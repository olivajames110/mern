import React, { useState, useEffect } from 'react';
import UsersList from '../components/UsersList/UsersList';
// import MapOfWorld from '../../shared/components/UIElements/MapOfWorld/MapOfWorld';
import ErrorModal from '../../shared/components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const Users = (props) => {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [ loadedUsers, setLoadedUsers ] = useState(false);

	useEffect(
		() => {
			const fetchUsers = async () => {
				try {
					const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/users`);
					setLoadedUsers(responseData.users);
				} catch (err) {
					console.log(err.message);
				}
			};
			fetchUsers();
		},
		[ sendRequest ]
	);

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && <LoadingSpinner asOverlay />}
			{!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
		</React.Fragment>
	);
};
// <MapOfWorld />
export default Users;
