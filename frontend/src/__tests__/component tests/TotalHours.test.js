import React from 'react';
import { render, screen } from '@testing-library/react';
import { testIds } from '../../testIds';
import TotalHours from '../../components/Activity/ActivityTotalHours';
import { AppContext } from '../../context/contextActivities';

describe('TimeBudget', () => {
	it('Validate TimeBudget div renders', () => {
		const mockContextValue = {
			activities: [
				{ name: 'mock_test1', hour: 2 },
				{ name: 'mock_test2', hour: 1 },
			],
		};

		render(
			<AppContext.Provider value={mockContextValue}>
				<TotalHours />
			</AppContext.Provider>
		);

		const totalHoursDiv = screen.getByTestId(testIds.totalHours.totalHoursDiv);
		expect(totalHoursDiv).toBeInTheDocument();
		expect(totalHoursDiv).toBeVisible();
		expect(totalHoursDiv).toHaveTextContent('Hours Spent So Far: 3');
	});
});
