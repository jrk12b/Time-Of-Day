import React from 'react';
import { render, screen } from '@testing-library/react';
import { testIds } from '../../testIds';
import Home from '../../pages/HomePage';

describe('App', () => {
	it('Validate App div renders', () => {
		render(<Home />);
		const homeDiv = screen.getByTestId(testIds.home.homeDiv);
		expect(homeDiv).toBeInTheDocument();
		expect(homeDiv).toBeVisible();
	});

	it('Validate Home div renders', () => {
		render(<Home />);
		const homeDiv = screen.getByTestId(testIds.home.homeDiv);
		expect(homeDiv).toBeInTheDocument();
		expect(homeDiv).toBeVisible();
	});

	it('Validate Welcome Banner renders', () => {
		render(<Home />);
		const homeDiv = screen.getByTestId(testIds.home.welcomeBanner);
		expect(homeDiv).toBeInTheDocument();
		expect(homeDiv).toBeVisible();
	});

	it('Validate Home Header renders', () => {
		render(<Home />);
		const homeDiv = screen.getByTestId(testIds.home.homeHeader);
		expect(homeDiv).toBeInTheDocument();
		expect(homeDiv).toBeVisible();
	});

	it('Validate details renders', () => {
		render(<Home />);
		const homeDiv = screen.getByTestId(testIds.home.details);
		expect(homeDiv).toBeInTheDocument();
		expect(homeDiv).toBeVisible();
	});

	it('Validate instructions renders', () => {
		render(<Home />);
		const homeDiv = screen.getByTestId(testIds.home.instructions);
		expect(homeDiv).toBeInTheDocument();
		expect(homeDiv).toBeVisible();
	});
});
