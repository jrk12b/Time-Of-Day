import React from 'react';
import { render, screen } from '@testing-library/react';
import { testIds } from '../../../testIds';
import { AppContext } from '../../../context/contextActivities';
import YourTimePieGraph from '../../../components/Graphs/YourTimeGraphs/YourTimePieGraph';

describe('YourTimePieGraph', () => {
	it('Validate YourTimePieGraph renders', () => {
		const mockContextValue = {
			hours: 24,
			activities: [
				{ name: 'mock_test1', hour: 2 },
				{ name: 'mock_test2', hour: 1 },
			],
		};

		render(
			<AppContext.Provider value={mockContextValue}>
				<YourTimePieGraph />
			</AppContext.Provider>
		);

		const yourTimePieGraph = screen.getByTestId(testIds.yourTimePieGraph);
		expect(yourTimePieGraph).toBeInTheDocument();
		expect(yourTimePieGraph).toBeVisible();
	});
});
