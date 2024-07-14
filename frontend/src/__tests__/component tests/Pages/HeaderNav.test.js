import React from 'react';
import { render, screen } from '@testing-library/react';
import HeaderNav from '../../../components/HeaderNav/HeaderNav';
import { MemoryRouter } from 'react-router-dom';
import { testIds } from '../../../testData/testIds';

// Mock useMediaQuery to control the isMobile state
jest.mock('react-responsive', () => ({
	useMediaQuery: jest.fn(),
}));

describe('HeaderNav', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('Validate header-nav renders', () => {
		render(
			<MemoryRouter>
				<HeaderNav />
			</MemoryRouter>
		);
		const headerNavHome = screen.getByTestId(testIds.headerNav.headerNav);
		expect(headerNavHome).toBeInTheDocument();
		expect(headerNavHome).toBeVisible();
	});

	it('Validate Home link renders', () => {
		render(
			<MemoryRouter>
				<HeaderNav />
			</MemoryRouter>
		);
		const headerNavHomeLink = screen.getByTestId(testIds.headerNav.homeNavLink);
		expect(headerNavHomeLink).toBeInTheDocument();
		expect(headerNavHomeLink).toHaveAttribute('href', '/');
		expect(headerNavHomeLink).toBeVisible();
	});

	it('Validate Todays Time link renders', () => {
		render(
			<MemoryRouter>
				<HeaderNav />
			</MemoryRouter>
		);
		const headerNavTodaysTimeLink = screen.getByTestId(testIds.headerNav.todaysTimeNavLink);
		expect(headerNavTodaysTimeLink).toBeInTheDocument();
		expect(headerNavTodaysTimeLink).toHaveAttribute('href', '/TodaysTime');
		expect(headerNavTodaysTimeLink).toBeVisible();
	});

	it('Validate Your Time link renders', () => {
		render(
			<MemoryRouter>
				<HeaderNav />
			</MemoryRouter>
		);
		const headerNavYourTime = screen.getByTestId(testIds.headerNav.yourTimeNavLink);
		expect(headerNavYourTime).toBeInTheDocument();
		expect(headerNavYourTime).toHaveAttribute('href', '/YourTime');
		expect(headerNavYourTime).toBeVisible();
	});

	it('Validate Time of Day link renders', () => {
		render(
			<MemoryRouter>
				<HeaderNav />
			</MemoryRouter>
		);
		const headerNavHomeLink = screen.getByTestId(testIds.headerNav.timeOfDayNavLink);
		expect(headerNavHomeLink).toBeInTheDocument();
		expect(headerNavHomeLink).toHaveAttribute('href', '/');
		expect(headerNavHomeLink).toBeVisible();
	});

	it('Validate mobile toggle renders', () => {
		const { useMediaQuery } = require('react-responsive');
		useMediaQuery.mockImplementation(() => true);

		render(
			<MemoryRouter>
				<HeaderNav />
			</MemoryRouter>
		);
		const headerNavMobileToggle = screen.getByTestId(testIds.headerNav.mobileToggle);
		expect(headerNavMobileToggle).toBeInTheDocument();
		expect(headerNavMobileToggle).toBeVisible();
	});

	it('Validate mobile toggle does not render', () => {
		const { useMediaQuery } = require('react-responsive');
		useMediaQuery.mockImplementation(() => false);

		render(
			<MemoryRouter>
				<HeaderNav />
			</MemoryRouter>
		);
		const headerNavMobileToggle = screen.queryByTestId(testIds.headerNav.mobileToggle);
		expect(headerNavMobileToggle).not.toBeInTheDocument();
	});
});
