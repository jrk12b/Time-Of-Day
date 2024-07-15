import React from 'react';
import { render, screen } from '@testing-library/react';
import { testIds } from '../../../testData/testIds';
import { mockHours } from '../../../testData/mockData';
import TimeBudget from '../../../components/Activity/ActivityTimeBudget';
import { AppContext } from '../../../context/contextActivities';

describe('TimeBudget', () => {
	it('Validate TimeBudget renders', () => {
		render(
			<AppContext.Provider value={mockHours}>
				<TimeBudget />
			</AppContext.Provider>
		);

		const timeBudget = screen.getByTestId(testIds.timeBudget);
		expect(timeBudget).toBeInTheDocument();
		expect(timeBudget).toBeVisible();
		expect(timeBudget).toHaveTextContent('24 Hours');
	});
});
