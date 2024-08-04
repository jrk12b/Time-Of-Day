import React from 'react';
import { render, screen } from '@testing-library/react';
import { testIds } from '../../../testData/testIds';
import { mockActivity } from '../../../testData/mockData';
import { AppContext } from '../../../context/contextActivities';
import ActivityItem from '../../../components/Activity/ActivityItem';

describe('ActivityItem', () => {
	it('Validate ActivityItem renders correctly', () => {
		const mockDispatch = {
			dispatch: jest.fn(),
		};

		render(
			<AppContext.Provider value={mockDispatch}>
				<ActivityItem {...mockActivity} />
			</AppContext.Provider>
		);

		const activityItem = screen.getByTestId(testIds.todaysTime.activityItem);
		expect(activityItem).toBeInTheDocument();
		expect(activityItem).toBeVisible();
		expect(activityItem).toHaveTextContent('mock_test1 | 1 Hour(s)');
	});
});
