import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { testIds } from '../../../testData/testIds';
import {
	mockActivities,
	mockActivitiesNoKey,
	mockActivitiesEmpty,
} from '../../../testData/mockData';
import { AppContext, AppProvider } from '../../../context/contextActivities';
import ActivitySubmit from '../../../components/Activity/ActivitySubmit';

describe('ActivitySubmit', () => {
	it('ActivitySubmit renders', () => {
		render(
			<AppContext.Provider value={mockActivities}>
				<ActivitySubmit />
			</AppContext.Provider>
		);

		const activitySubmit = screen.getByTestId(testIds.todaysTime.activitySubmit);
		expect(activitySubmit).toBeInTheDocument();
		expect(activitySubmit).toBeVisible();
		expect(activitySubmit).toHaveTextContent('Submit All Activities');
	});

	it('handleSubmitActivities called when button is clicked', () => {
		const handleSubmitActivities = jest.fn();

		render(
			<AppProvider>
				<AppContext.Provider value={{ activities: mockActivitiesNoKey }}>
					<ActivitySubmit handleSubmitActivities={handleSubmitActivities} />
				</AppContext.Provider>
			</AppProvider>
		);

		fireEvent.click(screen.getByTestId(testIds.todaysTime.activitySubmitButton));

		expect(handleSubmitActivities).toHaveBeenCalledWith(mockActivitiesNoKey);
	});

	it('handleSubmitActivities not called when there are no activities', () => {
		const handleSubmitActivities = jest.fn();

		render(
			<AppProvider>
				<AppContext.Provider value={{ activities: mockActivitiesEmpty }}>
					<ActivitySubmit handleSubmitActivities={handleSubmitActivities} />
				</AppContext.Provider>
			</AppProvider>
		);

		fireEvent.click(screen.getByTestId(testIds.todaysTime.activitySubmitButton));

		expect(handleSubmitActivities).not.toHaveBeenCalledWith(mockActivitiesEmpty);
	});
});
