import React from 'react';
import { render, screen } from '@testing-library/react';
import { testIds } from '../../../testIds';
import RemainingHours from '../../../components/Activity/ActivityRemainingHours';
import { AppContext } from '../../../context/contextActivities';

describe('RemainingHours', () => {
	it('Validate RemainingHours div renders', () => {
		const mockContextValue = {
			hours: 24,
			activities: [
				{ name: 'mock_test1', hour: 2 },
				{ name: 'mock_test2', hour: 1 },
			],
		};

		render(
			<AppContext.Provider value={mockContextValue}>
				<RemainingHours />
			</AppContext.Provider>
		);

		const remainingHours = screen.getByTestId(testIds.remainingHours);
		expect(remainingHours).toBeInTheDocument();
		expect(remainingHours).toBeVisible();
		expect(remainingHours).toHaveTextContent('Hours Remaining: 21');
	});
});
