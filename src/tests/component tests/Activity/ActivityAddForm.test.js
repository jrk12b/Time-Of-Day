import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { testIds } from '../../../testData/testIds';
import { mockActivitiesEmpty } from '../../../testData/mockData';
import { AppContext } from '../../../context/contextActivities';
import AddActivityForm from '../../../components/Activity/ActivityAddForm';

describe('AddActivityForm', () => {
	it('Validate AddActivityForm renders', () => {
		render(
			<AppContext.Provider value={mockActivitiesEmpty}>
				<AddActivityForm />
			</AppContext.Provider>
		);

		const addActivityForm = screen.getByTestId(testIds.addActivityForm.addActivityForm);
		expect(addActivityForm).toBeInTheDocument();
		expect(addActivityForm).toBeVisible();
		expect(addActivityForm).toHaveTextContent('Name');
		expect(addActivityForm).toHaveTextContent('Hours');
		expect(addActivityForm).toHaveTextContent('Save');

		const addActivityFormName = screen.getByTestId(testIds.addActivityForm.addActivityFormName);
		expect(addActivityFormName).toBeInTheDocument();
		expect(addActivityFormName).toBeVisible();

		const addActivityFormHours = screen.getByTestId(testIds.addActivityForm.addActivityFormHours);
		expect(addActivityFormHours).toBeInTheDocument();
		expect(addActivityFormHours).toBeVisible();
	});

	it('Validate AddActivityForm submits', () => {
		const mockDispatch = jest.fn();

		render(
			<AppContext.Provider value={{ dispatch: mockDispatch }}>
				<AddActivityForm />
			</AppContext.Provider>
		);

		// Fill in the form
		fireEvent.change(screen.getByTestId(testIds.addActivityForm.addActivityFormName), {
			target: { value: 'New Activity' },
		});
		fireEvent.change(screen.getByTestId(testIds.addActivityForm.addActivityFormHours), {
			target: { value: '5' },
		});

		// Submit the form
		fireEvent.click(screen.getByTestId(testIds.addActivityForm.addActivitySaveButton));

		// Check if dispatch was called with correct payload
		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'ADD_ACTIVITY',
			payload: expect.objectContaining({
				name: 'New Activity',
				hour: 5,
			}),
		});
	});
});
