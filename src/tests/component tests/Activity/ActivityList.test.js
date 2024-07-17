import React from 'react';
import { render, screen } from '@testing-library/react';
import { testIds } from '../../../testData/testIds';
import { mockActivities } from '../../../testData/mockData';
import { AppContext } from '../../../context/contextActivities';
import ActivityList from '../../../components/Activity/ActivityList';

describe('ActivityList', () => {
	it('Validate ActivityList renders', () => {
		render(
			<AppContext.Provider value={mockActivities}>
				<ActivityList />
			</AppContext.Provider>
		);

		const activityList = screen.getByTestId(testIds.todaysTime.activityList);
		expect(activityList).toBeInTheDocument();
		expect(activityList).toBeVisible();
		expect(activityList).toHaveTextContent('mock_test1');
		expect(activityList).toHaveTextContent('1 Hour(s)');
		expect(activityList).toHaveTextContent('mock_test2');
		expect(activityList).toHaveTextContent('2 Hour(s)');
	});
});
