import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import './MainNavigation.css';
import SideDrawer from '../SideDrawer/SideDrawer';
import NavLinks from '../NavLinks/NavLinks';
import Backdrop from '../../UIElements/Backdrop/Backdrop';
import MainHeader from '../MainHeader/MainHeader';
import HamburgerIcon from '../../../icons/hamburgerIcon';

const MainNavigation = (props) => {
	const [ drawerIsOpen, setDrawerIsOpen ] = useState(false);

	const closeDrawer = () => {
		setDrawerIsOpen(false);
	};

	const sideDrawer = (
		<SideDrawer onClick={closeDrawer} show={drawerIsOpen}>
			<nav className="main-navigation__drawer-nav">
				<NavLinks />
			</nav>
		</SideDrawer>
	);

	return (
		<React.Fragment>
			{drawerIsOpen && <Backdrop onClick={closeDrawer} />}

			{sideDrawer}

			<MainHeader>
				<h1 className="main-navigation_title">
					<Link to="/">Places</Link>
				</h1>
				<nav>
					<NavLinks />
				</nav>

				<button onClick={() => setDrawerIsOpen(true)} className="main-navigation_menu-btn">
					{HamburgerIcon}
				</button>
			</MainHeader>
		</React.Fragment>
	);
};

export default MainNavigation;
