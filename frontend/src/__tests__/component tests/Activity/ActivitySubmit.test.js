import React from 'react';
import { render, screen } from '@testing-library/react';
import { testIds } from '../../../testIds';
import { AppContext } from '../../../context/contextActivities';
import ActivitySubmit from '../../../components/Activity/ActivitySubmit';

describe('ActivitySubmit', () => {
	it('Validate ActivitySubmit div renders', () => {
		const mockContextValue = {
			activities: [
				{ key: '12345', id: '12345', name: 'mock_test1', hour: 1 },
				{ key: '12346', id: '123456', name: 'mock_test2', hour: 2 },
			],
		};

		render(
			<AppContext.Provider value={mockContextValue}>
				<ActivitySubmit />
			</AppContext.Provider>
		);

		const activitySubmit = screen.getByTestId(testIds.activitySubmit);
		expect(activitySubmit).toBeInTheDocument();
		expect(activitySubmit).toBeVisible();
		expect(activitySubmit).toHaveTextContent('Submit All Activities');
	});
});
