import React from 'react';
import { render, screen } from '@testing-library/react';
import { testIds } from '../../../testData/testIds';
import { mockActivitiesHours } from '../../../testData/mockData';
import { AppContext } from '../../../context/contextActivities';
import YourTimeBarGraph from '../../../components/Graphs/YourTimeGraphs/YourTimeBarGraph';

describe('YourTimeBarGraph', () => {
	it('Validate YourTimeBarGraph renders', () => {
		render(
			<AppContext.Provider value={mockActivitiesHours}>
				<YourTimeBarGraph />
			</AppContext.Provider>
		);

		const yourTimeBarGraph = screen.getByTestId(testIds.yourTimeBarGraph);
		expect(yourTimeBarGraph).toBeInTheDocument();
		expect(yourTimeBarGraph).toBeVisible();
	});
});
