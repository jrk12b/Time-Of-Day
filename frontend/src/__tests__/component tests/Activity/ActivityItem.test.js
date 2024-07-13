import React from 'react';
import { render, screen } from '@testing-library/react';
import { testIds } from '../../../testIds';
import { AppContext } from '../../../context/contextActivities';
import ActivityItem from '../../../components/Activity/ActivityItem';

describe('ActivityItem', () => {
	it('Validate ActivityItem renders correctly', () => {
		const mockContextValue = {
			dispatch: jest.fn(),
		};

		const activityProps = {
			name: 'mock_test1',
			hour: 1,
			id: 1,
		};

		render(
			<AppContext.Provider value={mockContextValue}>
				<ActivityItem {...activityProps} />
			</AppContext.Provider>
		);

		const activityItem = screen.getByTestId(testIds.activityItem);
		expect(activityItem).toBeInTheDocument();
		expect(activityItem).toBeVisible();
		expect(activityItem).toHaveTextContent('mock_test1 | 1 Hour(s)');
	});
});
