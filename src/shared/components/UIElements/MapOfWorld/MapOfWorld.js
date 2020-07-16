import React from 'react';
import './MapOfWorld.css';
import Map from './Components/Map';

const MapOfWorld = () => {
	const clickHandler = (country) => {
		console.log(country.target);
	};
	return (
		<div class="map-container">
			<Map onClick={clickHandler} backgroundColor={'#222'} hoverColor={'#9e123c'} />
		</div>
	);
};

export default MapOfWorld;
