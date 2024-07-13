import React from 'react';
import { render, screen } from '@testing-library/react';
import { testIds } from '../../../testIds';
import YourTime from '../../../pages/YourTimePage';

describe('YourTime', () => {
	it('Validate YourTime renders', () => {
		render(<YourTime />);
		const yourTime = screen.getByTestId(testIds.yourTime);
		expect(yourTime).toBeInTheDocument();
		expect(yourTime).toBeVisible();
	});

	it('Validate YourTimeActivityList renders', () => {
		render(<YourTime />);
		const yourTimeActivityList = screen.getByTestId(testIds.yourTimeActivityList);
		expect(yourTimeActivityList).toBeInTheDocument();
		expect(yourTimeActivityList).toBeVisible();
	});

	it('Validate YourTimeBarGraph renders', () => {
		render(<YourTime />);
		const yourTimeBarGraph = screen.getByTestId(testIds.yourTimeBarGraph);
		expect(yourTimeBarGraph).toBeInTheDocument();
		expect(yourTimeBarGraph).toBeVisible();
	});

	it('Validate YourTimePieGraph renders', () => {
		render(<YourTime />);
		const yourTimePieGraph = screen.getByTestId(testIds.yourTimePieGraph);
		expect(yourTimePieGraph).toBeInTheDocument();
		expect(yourTimePieGraph).toBeVisible();
	});

	it('Validate YourTimeComposedGraph renders', () => {
		render(<YourTime />);
		const yourTimeComposedGraph = screen.getByTestId(testIds.yourTimeComposedGraph);
		expect(yourTimeComposedGraph).toBeInTheDocument();
		expect(yourTimeComposedGraph).toBeVisible();
	});

	it('Validate YourTimeLineGraph renders', () => {
		render(<YourTime />);
		const yourTimeLineGraph = screen.getByTestId(testIds.yourTimeLineGraph);
		expect(yourTimeLineGraph).toBeInTheDocument();
		expect(yourTimeLineGraph).toBeVisible();
	});
});
