import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IoClose, IoMenu } from 'react-icons/io5';
import '../../css/HeaderNav.css';
import { testIds } from '../../testData/testIds';

// This component renders a header component with a logo, navigation links, and a mobile menu toggle
const HeaderNavHook = () => {
	const [showMenu, setShowMenu] = useState(false);

	const toggleMenu = () => {
		setShowMenu(!showMenu);
	};

	const closeMenuOnMobile = () => {
		if (window.innerWidth <= 1150) {
			setShowMenu(false);
		}
	};
	return (
		<header className="header">
			<nav className="nav container" data-testid={testIds.headerNav.navContainer}>
				<NavLink to="/" className="nav__logo">
					Time Of Day
				</NavLink>

				<div className={`nav__menu ${showMenu ? 'show-menu' : ''}`} id="nav-menu">
					<ul className="nav__list">
						<li className="nav__item">
							<NavLink
								to="/"
								className="nav__link"
								onClick={closeMenuOnMobile}
								data-testid={testIds.headerNav.homeNavLink}
							>
								Home
							</NavLink>
						</li>
						<li className="nav__item">
							<NavLink
								to="/TodaysTime"
								className="nav__link"
								onClick={closeMenuOnMobile}
								data-testid={testIds.headerNav.todaysTimeNavLink}
							>
								Today's Time
							</NavLink>
						</li>
						<li className="nav__item">
							<NavLink
								to="/YourTime"
								className="nav__link"
								onClick={closeMenuOnMobile}
								data-testid={testIds.headerNav.yourTimeNavLink}
							>
								Your Time
							</NavLink>
						</li>
					</ul>
					<div className="nav__close" id="nav-close" onClick={toggleMenu}>
						<IoClose />
					</div>
				</div>

				<div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
					<IoMenu />
				</div>
			</nav>
		</header>
	);
};

export default HeaderNavHook;
