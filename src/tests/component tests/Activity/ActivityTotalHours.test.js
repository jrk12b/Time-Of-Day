import React from 'react';
import { render, screen } from '@testing-library/react';
import { testIds } from '../../../testData/testIds';
import { mockActivities } from '../../../testData/mockData';
import TotalHours from '../../../components/Activity/ActivityTotalHours';
import { AppContext } from '../../../context/contextActivities';

describe('TotalHours', () => {
	it('Validate TotalHours renders', () => {
		render(
			<AppContext.Provider value={mockActivities}>
				<TotalHours />
			</AppContext.Provider>
		);

		const totalHours = screen.getByTestId(testIds.todaysTime.totalHours);
		expect(totalHours).toBeInTheDocument();
		expect(totalHours).toBeVisible();
		expect(totalHours).toHaveTextContent('Hours Spent So Far: 3');
	});
});
