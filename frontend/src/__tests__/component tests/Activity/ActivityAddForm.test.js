import React from 'react';
import { render, screen } from '@testing-library/react';
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

	// TODO: add submitting form works?
});
