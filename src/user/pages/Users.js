import React from 'react';
import UsersList from '../components/UsersList/UsersList';
import MapOfWorld from '../../shared/components/UIElements/MapOfWorld/MapOfWorld';

const Users = (props) => {
	const USERS = [
		{
			id     : 2,
			name   : 'Jimmy',
			image  : 'https://www.uokpl.rs/fpng/f/550-5508322_profile-image-placeholder.png',
			places : 3
		}
	];

	return (
		<React.Fragment>
			<UsersList items={USERS} />
			<MapOfWorld />
		</React.Fragment>
	);
};

export default Users;
