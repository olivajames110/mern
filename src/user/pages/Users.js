import React from 'react';
import UsersList from '../components/UsersList/UsersList';

const Users = (props) => {
	const USERS = [
		{
			id     : 1,
			name   : 'Jimmy',
			image  : 'https://www.uokpl.rs/fpng/f/550-5508322_profile-image-placeholder.png',
			places : 3
		}
	];

	return <UsersList items={USERS} />;
};

export default Users;
