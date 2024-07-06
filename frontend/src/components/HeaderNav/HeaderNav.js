import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IoClose, IoMenu } from 'react-icons/io5';
import { useMediaQuery } from 'react-responsive';
import '../../css/HeaderNav.css';

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
			<ul className={listClassName}>
				<li>
					<NavLink to="/" className={linkClassName} onClick={closeMobileMenu}>
						HomePage
					</NavLink>
				</li>
				<li>
					<NavLink to="/ItemsPage" className={linkClassName} onClick={closeMobileMenu}>
						ItemsPage
					</NavLink>
				</li>
				<li>
					<NavLink to="/TimeGraphPage" className={linkClassName} onClick={closeMobileMenu}>
						TimeGraphPage
					</NavLink>
				</li>
			</ul>
		);
	};

	return (
		<header className="header">
			<nav className="nav container">
				<NavLink to="/" className="nav__logo">
					Navigation Bar
				</NavLink>

				{isMobile && (
					<div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
						<IoMenu />
					</div>
				)}

				{isMobile ? (
					<div className={`nav__menu  ${isMenuOpen ? 'show-menu' : ''}`} id="nav-menu">
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
