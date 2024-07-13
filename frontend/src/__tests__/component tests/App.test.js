import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../App';
import { testIds } from '../../testIds';

describe('App', () => {
	it('Validate App div renders', () => {
		render(<App />);
		const app = screen.getByTestId(testIds.app.appDiv);
		expect(app).toBeInTheDocument();
		expect(app).toBeVisible();
	});

	it('Validate HeaderNav renders', () => {
		render(<App />);
		const headerNavHome = screen.getByTestId(testIds.headerNav.headerNav);
		expect(headerNavHome).toBeInTheDocument();
		expect(headerNavHome).toBeVisible();
		const headerNavHomeLink = screen.getByTestId(testIds.headerNav.homeNavLink);
		expect(headerNavHomeLink).toBeInTheDocument();
		expect(headerNavHomeLink).toHaveAttribute('href', '/');
		expect(headerNavHomeLink).toBeVisible();
		const headerNavTodaysTimeLink = screen.getByTestId(testIds.headerNav.todaysTimeNavLink);
		expect(headerNavTodaysTimeLink).toBeInTheDocument();
		expect(headerNavTodaysTimeLink).toHaveAttribute('href', '/TodaysTime');
		expect(headerNavTodaysTimeLink).toBeVisible();
		const headerNavYourTime = screen.getByTestId(testIds.headerNav.yourTimeNavLink);
		expect(headerNavYourTime).toBeInTheDocument();
		expect(headerNavYourTime).toHaveAttribute('href', '/YourTime');
		expect(headerNavYourTime).toBeVisible();
	});

	it('Validate Home div renders', () => {
		render(<App />);
		const homeDiv = screen.getByTestId(testIds.home.homeDiv);
		expect(homeDiv).toBeInTheDocument();
		expect(homeDiv).toBeVisible();
	});

	it('Validate Welcome Banner renders', () => {
		render(<App />);
		const homeDiv = screen.getByTestId(testIds.home.welcomeBanner);
		expect(homeDiv).toBeInTheDocument();
		expect(homeDiv).toBeVisible();
	});

	it('Validate Home Header renders', () => {
		render(<App />);
		const homeDiv = screen.getByTestId(testIds.home.homeHeader);
		expect(homeDiv).toBeInTheDocument();
		expect(homeDiv).toBeVisible();
	});

	it('Validate details renders', () => {
		render(<App />);
		const homeDiv = screen.getByTestId(testIds.home.details);
		expect(homeDiv).toBeInTheDocument();
		expect(homeDiv).toBeVisible();
	});

	it('Validate instructions renders', () => {
		render(<App />);
		const homeDiv = screen.getByTestId(testIds.home.instructions);
		expect(homeDiv).toBeInTheDocument();
		expect(homeDiv).toBeVisible();
	});
});
