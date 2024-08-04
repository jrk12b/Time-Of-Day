import React from 'react';
import { render, screen } from '@testing-library/react';
import { testIds } from '../../../testData/testIds';
import { mockActivitiesHours } from '../../../testData/mockData';
import RemainingHours from '../../../components/Activity/ActivityRemainingHours';
import { AppContext } from '../../../context/contextActivities';

describe('RemainingHours', () => {
	it('Validate RemainingHours renders', () => {
		render(
			<AppContext.Provider value={mockActivitiesHours}>
				<RemainingHours />
			</AppContext.Provider>
		);

		const remainingHours = screen.getByTestId(testIds.todaysTime.remainingHours);
		expect(remainingHours).toBeInTheDocument();
		expect(remainingHours).toBeVisible();
		expect(remainingHours).toHaveTextContent('Hours Remaining: 21');
	});
});
