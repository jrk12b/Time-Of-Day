import React from 'react';
import { render, screen } from '@testing-library/react';
import { testIds } from '../../../testData/testIds';
import { mockActivitiesHours } from '../../../testData/mockData';
import { AppContext } from '../../../context/contextActivities';
import TodaysTimeGraph from '../../../components/Graphs/TodaysTimeGraphs/TodaysTimeGraph';

describe('TodaysTimeGraph', () => {
	it('Validate TodaysTimeGraph renders', () => {
		render(
			<AppContext.Provider value={mockActivitiesHours}>
				<TodaysTimeGraph />
			</AppContext.Provider>
		);

		const todaysTimeGraph = screen.getByTestId(testIds.todaysTimeGraph);
		expect(todaysTimeGraph).toBeInTheDocument();
		expect(todaysTimeGraph).toBeVisible();
	});
});
