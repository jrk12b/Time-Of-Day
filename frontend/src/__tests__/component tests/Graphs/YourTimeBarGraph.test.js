import React from 'react';
import { render, screen } from '@testing-library/react';
import { testIds } from '../../../testIds';
import { AppContext } from '../../../context/contextActivities';
import YourTimeBarGraph from '../../../components/Graphs/YourTimeGraphs/YourTimeBarGraph';

describe('YourTimeBarGraph', () => {
	it('Validate YourTimeBarGraph renders', () => {
		const mockContextValue = {
			hours: 24,
			activities: [
				{ name: 'mock_test1', hour: 2 },
				{ name: 'mock_test2', hour: 1 },
			],
		};

		render(
			<AppContext.Provider value={mockContextValue}>
				<YourTimeBarGraph />
			</AppContext.Provider>
		);

		const yourTimeBarGraph = screen.getByTestId(testIds.yourTimeBarGraph);
		expect(yourTimeBarGraph).toBeInTheDocument();
		expect(yourTimeBarGraph).toBeVisible();
	});
});
