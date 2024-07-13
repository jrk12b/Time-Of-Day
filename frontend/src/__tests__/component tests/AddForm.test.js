import React from 'react';
import { render, screen } from '@testing-library/react';
import { testIds } from '../../testIds';
import { AppContext } from '../../context/contextActivities';
import AddActivityForm from '../../components/Activity/ActivityAddForm';

describe('TimeBudget', () => {
	it('Validate TimeBudget div renders', () => {
		const mockContextValue = {};

		render(
			<AppContext.Provider value={mockContextValue}>
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
});
