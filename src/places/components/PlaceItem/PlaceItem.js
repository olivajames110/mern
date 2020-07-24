import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../shared/context/auth-context';

import Card from '../../../shared/components/UIElements/Card/Card';
import Button from '../../../shared/components/FormElements/Button/Button';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import Modal from '../../../shared/components/UIElements/Modal/Modal';
import Map from '../../../shared/components/UIElements/Map/Map';

import { useHttpClient } from '../../../shared/hooks/http-hook';

import './PlaceItem.css';

const PlaceItem = (props) => {
	const auth = useContext(AuthContext);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	const [ showMap, setShowMap ] = useState(false);
	const [ showConfirmModal, setShowConfirmModal ] = useState(false);
	//map handlers
	const openMapHandler = () => setShowMap(true);
	const closeMapHandler = () => setShowMap(false);
	//confirm delete modal handlers
	const showDeleteWarningHandler = () => setShowConfirmModal(true);
	const cancelDeleteWarningHandler = () => setShowConfirmModal(false);
	const confirmDeleteHandler = async () => {
		setShowConfirmModal(false);
		try {
			await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/${props.id}`, 'DELETE', null, {
				Authorization : 'Bearer ' + auth.token
			});
			props.onDelete(props.id);
		} catch (err) {}
	};

	const loggedInButtons = (
		<React.Fragment>
			<Button to={`/places/${props.id}`}>EDIT</Button>
			<Button className="inverse" onClick={showDeleteWarningHandler}>
				DELETE
			</Button>
		</React.Fragment>
	);
	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
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

			<Modal
				show={showConfirmModal}
				onCancel={cancelDeleteWarningHandler}
				header="Are you sure?"
				footer={
					<React.Fragment>
						<Button onClick={cancelDeleteWarningHandler}>Cancel</Button>
						<Button onClick={confirmDeleteHandler}>Delete</Button>
					</React.Fragment>
				}
			>
				<p>Do you want to proceed?</p>
			</Modal>
			<li className="place-item">
				<Card className="place-item__content">
					{isLoading && <LoadingSpinner asOverlay />}
					<div className="place-item__image">
						<img src={`${process.env.REACT_APP_BACKEND_ASSET_URL}/${props.image}`} alt={props.title} />
					</div>
					<div className="place-item__info">
						<h2 className="place-item__title">{props.title}</h2>
						<h3 className="place-item__address">{props.address}</h3>
						<p className="place-item__description">{props.description}</p>
					</div>
					<div className="place-item__actions">
						<Button className="inverse" onClick={openMapHandler}>
							VIEW ON MAP
						</Button>
						{auth.userId === props.creatorId && loggedInButtons}
					</div>
				</Card>
			</li>
		</React.Fragment>
	);
};

export default PlaceItem;
