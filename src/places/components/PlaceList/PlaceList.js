import React from 'react';

import Card from '../../../shared/components/UIElements/Card/Card';
import PlaceItem from '../PlaceItem/PlaceItem';
import './PlaceList.css';

const PlaceList = (props) => {
	if (props.items.length === 0) {
		return (
			<div className="place-list-container">
				<Card>
					<h2>No places found</h2>
					<button>Share Place</button>
				</Card>
			</div>
		);
	}

	return (
		<ul className="place-list-container">
			{props.items.map((place) => (
				<PlaceItem
					key={place.id}
					id={place.id}
					image={place.imageUrl}
					title={place.title}
					description={place.description}
					address={place.address}
					creatorId={place.creator}
					coordinates={place.location}
				/>
			))}
		</ul>
	);
};

export default PlaceList;