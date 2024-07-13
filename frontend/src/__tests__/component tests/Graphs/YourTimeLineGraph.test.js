import React from 'react';
import { render, screen } from '@testing-library/react';
import { testIds } from '../../../testIds';
import { AppContext } from '../../../context/contextActivities';
import YourTimeLineGraph from '../../../components/Graphs/YourTimeGraphs/YourTimeLineGraph';

describe('YourTimeLineGraph', () => {
	it('Validate YourTimeLineGraph renders', () => {
		const mockContextValue = {
			hours: 24,
			activities: [
				{ name: 'mock_test1', hour: 2 },
				{ name: 'mock_test2', hour: 1 },
			],
		};

		render(
			<AppContext.Provider value={mockContextValue}>
				<YourTimeLineGraph />
			</AppContext.Provider>
		);

		const yourTimeLineGraph = screen.getByTestId(testIds.yourTimeLineGraph);
		expect(yourTimeLineGraph).toBeInTheDocument();
		expect(yourTimeLineGraph).toBeVisible();
	});
});
