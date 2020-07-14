import React from 'react';
import { useParams } from 'react-router-dom';
import PlaceList from '../../../places/components/PlaceList/PlaceList';

const DUMMY_PLACES = [
	{
		id          : 'p1',
		imageUrl    : 'https://media.timeout.com/images/101705309/image.jpg',
		title       : 'Empire State Building',
		description :
			'Iconic, art deco office tower from 1931 with exhibits & observatories on the 86th & 102nd floors.',
		address     : '20 W 34th St, New York, NY 10001',
		creator     : 'u1',
		location    : { lat: 40.7484405, lng: -73.9878531 }
	},
	{
		id          : 'p2',
		imageUrl    : 'https://media.timeout.com/images/101705309/image.jpg',
		title       : 'Empire State ',
		description :
			'Iconic, art deco office tower from 1931 with exhibits & observatories on the 86th & 102nd floors.',
		address     : '20 W 34th St, New York, NY 10001',
		creator     : 'u2',
		location    : { lat: 40.7484405, lng: -73.9878531 }
	}
];

const UserPlaces = () => {
	const userId = useParams().userId;
	const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === userId);
	return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;
