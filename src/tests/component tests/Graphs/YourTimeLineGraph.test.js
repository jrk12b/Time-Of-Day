import React from 'react';
import { render, screen } from '@testing-library/react';
import { testIds } from '../../../testData/testIds';
import { mockActivitiesHours } from '../../../testData/mockData';
import { AppContext } from '../../../context/contextActivities';
import YourTimeLineGraph from '../../../components/Graphs/YourTimeGraphs/YourTimeLineGraph';

describe('YourTimeLineGraph', () => {
	it('Validate YourTimeLineGraph renders', () => {
		render(
			<AppContext.Provider value={mockActivitiesHours}>
				<YourTimeLineGraph />
			</AppContext.Provider>
		);

		const yourTimeLineGraph = screen.getByTestId(testIds.yourTimeLineGraph);
		expect(yourTimeLineGraph).toBeInTheDocument();
		expect(yourTimeLineGraph).toBeVisible();
	});
});
