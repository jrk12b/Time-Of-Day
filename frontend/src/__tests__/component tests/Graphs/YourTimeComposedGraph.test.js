import React from 'react';
import { render, screen } from '@testing-library/react';
import { testIds } from '../../../testIds';
import { AppContext } from '../../../context/contextActivities';
import YourTimeComposedGraph from '../../../components/Graphs/YourTimeGraphs/YourTimeComposedGraph';

describe('YourTimeComposedGraph', () => {
	it('Validate YourTimeComposedGraph renders', () => {
		const mockContextValue = {
			hours: 24,
			activities: [
				{ name: 'mock_test1', hour: 2 },
				{ name: 'mock_test2', hour: 1 },
			],
		};

		render(
			<AppContext.Provider value={mockContextValue}>
				<YourTimeComposedGraph />
			</AppContext.Provider>
		);

		const yourTimeComposedGraph = screen.getByTestId(testIds.yourTimeComposedGraph);
		expect(yourTimeComposedGraph).toBeInTheDocument();
		expect(yourTimeComposedGraph).toBeVisible();
	});
});
