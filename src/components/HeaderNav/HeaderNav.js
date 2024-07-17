import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IoClose, IoMenu } from 'react-icons/io5';
import { useMediaQuery } from 'react-responsive';
import '../../css/HeaderNav.css';
import { testIds } from '../../testData/testIds';

// This component renders a header component with a logo, navigation links, and a mobile menu toggle
const HeaderNav = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const isMobile = useMediaQuery({ maxWidth: '1150px' });

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const closeMobileMenu = () => {
		if (isMobile) {
			setIsMenuOpen(false);
		}
	};

	const renderNavLinks = () => {
		const listClassName = isMobile ? 'nav__list' : 'nav__list__web';
		const linkClassName = 'nav__link';

		return (
			<ul data-testid={testIds.headerNav.headerNav} className={listClassName}>
				<li>
					<NavLink
						data-testid={testIds.headerNav.homeNavLink}
						to="/"
						className={linkClassName}
						onClick={closeMobileMenu}
					>
						Home
					</NavLink>
				</li>
				<li>
					<NavLink
						data-testid={testIds.headerNav.todaysTimeNavLink}
						to="/TodaysTime"
						className={linkClassName}
						onClick={closeMobileMenu}
					>
						Today's Time
					</NavLink>
				</li>
				<li>
					<NavLink
						data-testid={testIds.headerNav.yourTimeNavLink}
						to="/YourTime"
						className={linkClassName}
						onClick={closeMobileMenu}
					>
						Your Time
					</NavLink>
				</li>
			</ul>
		);
	};

	return (
		<header className="header">
			<nav className="nav container" data-testid={testIds.headerNav.navContainer}>
				<NavLink data-testid={testIds.headerNav.timeOfDayNavLink} to="/" className="nav__logo">
					Time Of Day
				</NavLink>

				{isMobile && (
					<div
						data-testid={testIds.headerNav.mobileToggle}
						className="nav__toggle"
						id="nav-toggle"
						onClick={toggleMenu}
					>
						<IoMenu />
					</div>
				)}

				{isMobile ? (
					<div
						data-testid={testIds.headerNav.mobileMenu}
						className={`nav__menu  ${isMenuOpen ? 'show-menu' : ''}`}
						id="nav-menu"
					>
						{renderNavLinks()}
						<div className="nav__close" id="nav-close" onClick={toggleMenu}>
							<IoClose />
						</div>
					</div>
				) : (
					renderNavLinks()
				)}
			</nav>
		</header>
	);
};

export default HeaderNav;
