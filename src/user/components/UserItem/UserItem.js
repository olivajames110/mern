import React from 'react';
import { Link } from 'react-router-dom';
import './UserItem.css';

import Avatar from '../../../shared/components/UIElements/Avatar/Avatar';
import Card from '../../../shared/components/UIElements/Card/Card';
import './UserItem.css';

const UserItem = (props) => {
	return (
		<li className="user-item">
			<Link to={`/${props.id}/places`}>
				<Card className="user-item__content">
					<div className="user-item__image">
						<Avatar image={`${process.env.REACT_APP_BACKEND_ASSET_URL}/${props.image}`} alt={props.name} width={70} />
					</div>
					<div className="user-item__info">
						<h2>{props.name}</h2>
						<h3>
							{props.placeCount} {props.placeCount === 1 ? 'Place' : 'Places'}{' '}
						</h3>
					</div>
				</Card>
			</Link>
		</li>
	);
};

export default UserItem;
// <Link to={`/u${props.id}/places/`}>

// <Link to={`/${props.id}/places`}>
