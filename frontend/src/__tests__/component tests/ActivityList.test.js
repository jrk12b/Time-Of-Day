import React from 'react';
import { render, screen } from '@testing-library/react';
import { testIds } from '../../testIds';
import { AppContext } from '../../context/contextActivities';
import ActivityList from '../../components/Activity/ActivityList';

describe('TimeBudget', () => {
	it('Validate TimeBudget div renders', () => {
		const mockContextValue = {
			activities: [
				{ key: '12345', id: '12345', name: 'mock_test1', hour: 1 },
				{ key: '12346', id: '123456', name: 'mock_test2', hour: 2 },
			],
		};

		render(
			<AppContext.Provider value={mockContextValue}>
				<ActivityList />
			</AppContext.Provider>
		);

		const activityList = screen.getByTestId(testIds.activityList.activityList);
		expect(activityList).toBeInTheDocument();
		expect(activityList).toBeVisible();
		expect(activityList).toHaveTextContent('mock_test1');
		expect(activityList).toHaveTextContent('1 Hour(s)');
		expect(activityList).toHaveTextContent('mock_test2');
		expect(activityList).toHaveTextContent('2 Hour(s)');
	});
});
