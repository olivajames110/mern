import React from 'react';

import Card from '../../../shared/components/UIElements/Card/Card';
import PlaceItem from '../PlaceItem/PlaceItem';
import Button from '../../../shared/components/FormElements/Button/Button';
import './PlaceList.css';

const PlaceList = (props) => {
	const noPlaces = (
		<div className="place-list-container">
			<Card>
				<h2>No places found</h2>
				<Button to="/places/new">Share Place</Button>
			</Card>
		</div>
	);


	const places = (
		<ul className="place-list-container">
			{props.items.map((place) => (
				<PlaceItem
					key={place.id}
					id={place.id}
					image={place.image}
					title={place.title}
					description={place.description}
					address={place.address}
					creatorId={place.creator}
					coordinates={place.location}
					onDelete={props.onDeletePlace}
				/>
			))}
		</ul>
	);

	return <React.Fragment>{props.items.length === 0 ? noPlaces : places}</React.Fragment>;
};

export default PlaceList;
