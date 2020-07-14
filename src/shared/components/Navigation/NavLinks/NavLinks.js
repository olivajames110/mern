import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavLinks.css';

// import MainHeader from '../MainHeader/MainHeader';

const NavLinks = (props) => {
	return (
		<ul className="nav-links">
			<li>
				<NavLink activeClassName="nav-link__active" to="/" exact>
					ALL USERS
				</NavLink>
			</li>
			<li>
				<NavLink activeClassName="nav-link__active" to="/u1/places/">
					MY PLACES
				</NavLink>
			</li>
			<li>
				<NavLink activeClassName="nav-link__active" to="/places/new">
					NEW PLACE
				</NavLink>
			</li>
			<li>
				<NavLink activeClassName="nav-link__active" to="/auth">
					AUTHENTICATE
				</NavLink>
			</li>
		</ul>
	);
};

export default NavLinks;
