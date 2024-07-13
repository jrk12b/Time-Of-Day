import React from 'react';
import { render, screen } from '@testing-library/react';
import { testIds } from '../../../testIds';
import TimeBudget from '../../../components/Activity/ActivityTimeBudget';
import { AppContext } from '../../../context/contextActivities';

describe('TimeBudget', () => {
	it('Validate TimeBudget div renders', () => {
		const mockContextValue = {
			hours: 24,
		};

		render(
			<AppContext.Provider value={mockContextValue}>
				<TimeBudget />
			</AppContext.Provider>
		);

		const timeBudget = screen.getByTestId(testIds.timeBudget);
		expect(timeBudget).toBeInTheDocument();
		expect(timeBudget).toBeVisible();
		expect(timeBudget).toHaveTextContent('24 Hours');
	});
});
