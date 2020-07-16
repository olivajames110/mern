import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './NavLinks.css';
import { AuthContext } from '../../../context/auth-context';
// import MainHeader from '../MainHeader/MainHeader';

const NavLinks = (props) => {
	const auth = useContext(AuthContext);

	const logoutHandler = () => {
		auth.logout();
	};
	const loggedInLinks = (
		<React.Fragment>
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
				<button onClick={auth.logout}>LOGOUT</button>
			</li>
		</React.Fragment>
	);
	return (
		<ul className="nav-links">
			<li>
				<NavLink activeClassName="nav-link__active" to="/" exact>
					ALL USERS
				</NavLink>
			</li>
			{auth.isLoggedIn && loggedInLinks}
			{!auth.isLoggedIn && (
				<li>
					<NavLink activeClassName="nav-link__active" to="/auth">
						LOGIN
					</NavLink>
				</li>
			)}
		</ul>
	);
};

export default NavLinks;
