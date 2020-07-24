import React, { useState, useEffect } from 'react';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import { useParams } from 'react-router-dom';
import PlaceList from '../../../places/components/PlaceList/PlaceList';

const UserPlaces = () => {
	const [ loadedPlaces, setLoadedPlaces ] = useState([  ]);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	const userId = useParams().userId;

	useEffect(
		() => {
			const fetchPlaces = async () => {
				try {
					const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`);
					setLoadedPlaces(responseData.places);
				} catch (err) {}
			};
			fetchPlaces();
		},
		[ sendRequest, userId ]
	);

	const placeDeletedHandler = (deletedPlaceId) => {
		setLoadedPlaces((prevPlaces) => prevPlaces.filter((place) => place.id !== deletedPlaceId));
	};

	return (
		<React.Fragment>
			
			{isLoading && (
				<div className="center">
					<LoadingSpinner />
				</div>
			)}
			{!isLoading && loadedPlaces && <PlaceList onDeletePlace={placeDeletedHandler} items={loadedPlaces} />}
		</React.Fragment>
	);
};

export default UserPlaces;
