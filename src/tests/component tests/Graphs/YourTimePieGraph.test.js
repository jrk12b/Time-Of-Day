import React from 'react';
import { render, screen } from '@testing-library/react';
import { testIds } from '../../../testData/testIds';
import { mockActivitiesHours } from '../../../testData/mockData';
import { AppContext } from '../../../context/contextActivities';
import YourTimePieGraph from '../../../components/Graphs/YourTimeGraphs/YourTimePieGraph';

describe('YourTimePieGraph', () => {
	it('Validate YourTimePieGraph renders', () => {
		render(
			<AppContext.Provider value={mockActivitiesHours}>
				<YourTimePieGraph />
			</AppContext.Provider>
		);

		const yourTimePieGraph = screen.getByTestId(testIds.yourTime.yourTimePieGraph);
		expect(yourTimePieGraph).toBeInTheDocument();
		expect(yourTimePieGraph).toBeVisible();
	});
});
