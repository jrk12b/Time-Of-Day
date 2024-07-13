import React from 'react';
import { render, screen } from '@testing-library/react';
import { testIds } from '../../../testIds';
import { AppContext } from '../../../context/contextActivities';
import TodaysTimeGraph from '../../../components/Graphs/TodaysTimeGraphs/TodaysTimeGraph';

describe('TodaysTimeGraph', () => {
	it('Validate TodaysTimeGraph renders', () => {
		const mockContextValue = {
			hours: 24,
			activities: [
				{ name: 'mock_test1', hour: 2 },
				{ name: 'mock_test2', hour: 1 },
			],
		};

		render(
			<AppContext.Provider value={mockContextValue}>
				<TodaysTimeGraph />
			</AppContext.Provider>
		);

		const todaysTimeGraph = screen.getByTestId(testIds.todaysTimeGraph);
		expect(todaysTimeGraph).toBeInTheDocument();
		expect(todaysTimeGraph).toBeVisible();
	});
});
