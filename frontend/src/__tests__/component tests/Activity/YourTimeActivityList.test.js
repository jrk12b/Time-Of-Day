import React from 'react';
import { render, screen } from '@testing-library/react';
import { testIds } from '../../../testData/testIds';
import { mockActivitiesTimestamp, mockYourActivityListProps } from '../../../testData/mockData';
import { AppContext } from '../../../context/contextActivities';
import YourTimeActivityList from '../../../components/Activity/YourTimeActivityList';

describe('YourTimeActivityList', () => {
	it('Validate YourTimeActivityList renders', () => {
		render(
			<AppContext.Provider value={mockActivitiesTimestamp}>
				<YourTimeActivityList
					{...mockYourActivityListProps}
					activities={mockActivitiesTimestamp.activities}
				/>
			</AppContext.Provider>
		);

		const yourTimeActivityList = screen.getByTestId(testIds.yourTimeActivityList);
		expect(yourTimeActivityList).toBeInTheDocument();
		expect(yourTimeActivityList).toBeVisible();
		expect(yourTimeActivityList).toHaveTextContent('Delete Entire Document');
		expect(yourTimeActivityList).toHaveTextContent('Edit');
		expect(yourTimeActivityList).toHaveTextContent('Delete');
		expect(yourTimeActivityList).toHaveTextContent('mock_test1');
		expect(yourTimeActivityList).toHaveTextContent('mock_test2');
		expect(yourTimeActivityList).toHaveTextContent('1 hours');
		expect(yourTimeActivityList).toHaveTextContent('2 hours');
	});
});
