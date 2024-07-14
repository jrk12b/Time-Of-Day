import axios from 'axios';
import React, { useContext } from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { mockActivitiesNoKey } from '../../testData/mockData';
import {
	fetchActivities,
	AppProvider,
	AppContext,
	handleSubmitActivities,
} from '../../context/contextActivities';

jest.mock('axios');

const TestComponent = () => {
	const { hours, activities, dispatch } = useContext(AppContext);
	return (
		<div>
			<span data-testid="hours">{hours}</span>
			<span data-testid="activities">{activities.map((activity) => activity.name).join(', ')}</span>
			<button
				data-testid="dispatch-add-activity"
				onClick={() => dispatch({ type: 'ADD_ACTIVITY', payload: { id: 1, name: 'New Activity' } })}
			>
				Add Activity
			</button>
			<button
				data-testid="dispatch-delete-activity"
				onClick={() => dispatch({ type: 'DELETE_ACTIVITY', payload: 1 })}
			>
				Delete Activity
			</button>
		</div>
	);
};

describe('test contextActivities', () => {
	const PORT = process.env.PORT || 8000;
	const apiUrl = `http://localhost:${PORT}/api/activities`;

	it('fetchActivities fetches and returns activities data successfully', async () => {
		axios.get.mockResolvedValue({ data: mockActivitiesNoKey });

		const result = await fetchActivities();
		expect(result).toEqual(mockActivitiesNoKey);
		expect(axios.get).toHaveBeenCalledWith(apiUrl);
	});

	it('fetchActivities throws an error when the fetch fails', async () => {
		const mockError = new Error('Network Error');
		axios.get.mockRejectedValue(mockError);

		const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

		await expect(fetchActivities()).rejects.toThrow('Network Error');
		expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching activities', mockError);

		consoleErrorSpy.mockRestore();
	});

	it('AppProvider provides the correct initial context values', () => {
		render(
			<AppProvider>
				<TestComponent />
			</AppProvider>
		);
		expect(screen.getByTestId('hours').textContent).toBe('24');
		expect(screen.getByTestId('activities').textContent).toBe('');
	});

	it('AppProvider updates context values when dispatching actions', () => {
		render(
			<AppProvider>
				<TestComponent />
			</AppProvider>
		);

		fireEvent.click(screen.getByTestId('dispatch-add-activity'));
		expect(screen.getByTestId('activities').textContent).toBe('New Activity');

		fireEvent.click(screen.getByTestId('dispatch-delete-activity'));
		expect(screen.getByTestId('activities').textContent).toBe('');
	});

	it('handleSubmitActivities submits activities and displays a success message', async () => {
		const mockResponse = { data: { message: 'Success' } };

		axios.post.mockResolvedValue(mockResponse);

		const setSuccessMessage = jest.fn();

		await handleSubmitActivities(mockActivitiesNoKey, setSuccessMessage);

		expect(axios.post).toHaveBeenCalledWith(apiUrl, {
			activities: mockActivitiesNoKey,
			timestamp: expect.any(Date),
		});
		expect(setSuccessMessage).toHaveBeenCalledWith('Activities submitted successfully!');
	});

	it('handleSubmitActivities handles submission error', async () => {
		const mockError = new Error('Network Error');

		axios.post.mockRejectedValue(mockError);

		const setSuccessMessage = jest.fn();
		const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

		await handleSubmitActivities(mockActivitiesNoKey, setSuccessMessage);

		expect(consoleErrorSpy).toHaveBeenCalledWith('Error submitting activities', mockError);

		consoleErrorSpy.mockRestore();
	});
});
