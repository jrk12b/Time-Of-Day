import React from 'react';
import { render, screen } from '@testing-library/react';
import { testIds } from '../../../testIds';
import TotalHours from '../../../components/Activity/ActivityTotalHours';
import { AppContext } from '../../../context/contextActivities';

describe('TotalHours', () => {
	it('Validate TotalHours div renders', () => {
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

		const totalHours = screen.getByTestId(testIds.totalHours);
		expect(totalHours).toBeInTheDocument();
		expect(totalHours).toBeVisible();
		expect(totalHours).toHaveTextContent('Hours Spent So Far: 3');
	});
});
