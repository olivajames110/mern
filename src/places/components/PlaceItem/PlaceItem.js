import React, { useState } from 'react';
import './PlaceItem.css';
import Card from '../../../shared/components/UIElements/Card/Card';
import Button from '../../../shared/components/FormElements/Button/Button';
import Modal from '../../../shared/components/UIElements/Modal/Modal';
import Map from '../../../shared/components/UIElements/Map/Map';

const PlaceItem = (props) => {
	const [ showMap, setShowMap ] = useState(false);
	const openMapHandler = () => setShowMap(true);
	const closeMapHandler = () => setShowMap(false);
	return (
		<React.Fragment>
			<Modal
				show={showMap}
				onCancel={closeMapHandler}
				header={props.address}
				contentClass="place-item__modal-content"
				footerClass="place-item__modal-actions"
				footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
			>
				<div className="map-container">
					<Map center={props.coordinates} zoom={16} />
				</div>
			</Modal>
			<li className="place-item">
				<Card className="place-item__content">
					<div className="place-item__image">
						<img src={props.image} alt={props.title} />
					</div>
					<div className="place-item__info">
						<h2 className="place-item__title">{props.title}</h2>
						<h3 className="place-item__address">{props.address}</h3>
						<p className="place-item__description">{props.description}</p>
					</div>
					<div className="place-item__actions">
						<Button onClick={openMapHandler}>VIEW ON MAP</Button>
						<Button to={`/places/${props.id}`}>EDIT</Button>
						<Button>DELETE</Button>
					</div>
				</Card>
			</li>
		</React.Fragment>
	);
};

export default PlaceItem;
