import React from 'react';
import { render, screen } from '@testing-library/react';
import { testIds } from '../../../testData/testIds';
import { mockActivitiesHours } from '../../../testData/mockData';
import { AppContext } from '../../../context/contextActivities';
import YourTimeComposedGraph from '../../../components/Graphs/YourTimeGraphs/YourTimeComposedGraph';

describe('YourTimeComposedGraph', () => {
	it('Validate YourTimeComposedGraph renders', () => {
		render(
			<AppContext.Provider value={mockActivitiesHours}>
				<YourTimeComposedGraph />
			</AppContext.Provider>
		);

		const yourTimeComposedGraph = screen.getByTestId(testIds.yourTimeComposedGraph);
		expect(yourTimeComposedGraph).toBeInTheDocument();
		expect(yourTimeComposedGraph).toBeVisible();
	});
});
