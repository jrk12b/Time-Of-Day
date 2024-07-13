import React from 'react';
import { render, screen } from '@testing-library/react';
import { testIds } from '../../../testIds';
import TodaysTime from '../../../pages/TodaysTimePage';

describe('TodaysTime', () => {
	it('Validate TodaysTime Renders', () => {
		render(<TodaysTime />);
		const homeDiv = screen.getByTestId(testIds.todaysTime);
		expect(homeDiv).toBeInTheDocument();
		expect(homeDiv).toBeVisible();
	});

	it('Validate TimeBudget Renders', () => {
		render(<TodaysTime />);
		const timeBudget = screen.getByTestId(testIds.timeBudget);
		expect(timeBudget).toBeInTheDocument();
		expect(timeBudget).toBeVisible();
		expect(timeBudget).toHaveTextContent('24 Hours');
	});

	it('Validate RemainingHours Renders', () => {
		render(<TodaysTime />);
		const remainingHours = screen.getByTestId(testIds.remainingHours);
		expect(remainingHours).toBeInTheDocument();
		expect(remainingHours).toBeVisible();
		expect(remainingHours).toHaveTextContent('Hours Remaining:');
	});

	it('Validate TotalHours Renders', () => {
		render(<TodaysTime />);
		const totalHours = screen.getByTestId(testIds.totalHours);
		expect(totalHours).toBeInTheDocument();
		expect(totalHours).toBeVisible();
		expect(totalHours).toHaveTextContent('Hours Spent So Far:');
	});

	it('Validate TodaysTimeGraph Renders', () => {
		render(<TodaysTime />);
		const todaysTimeGraph = screen.getByTestId(testIds.todaysTimeGraph);
		expect(todaysTimeGraph).toBeInTheDocument();
		expect(todaysTimeGraph).toBeVisible();
	});

	it('Validate ActivityAddForm Renders', () => {
		render(<TodaysTime />);
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

	it('Validate ActivityList Renders', () => {
		render(<TodaysTime />);
		const activityList = screen.getByTestId(testIds.activityList);
		expect(activityList).toBeInTheDocument();
		expect(activityList).toBeVisible();
	});

	it('Validate ActivitySubmit Renders', () => {
		render(<TodaysTime />);
		const activitySubmit = screen.getByTestId(testIds.activitySubmit);
		expect(activitySubmit).toBeInTheDocument();
		expect(activitySubmit).toBeVisible();
		expect(activitySubmit).toHaveTextContent('Submit All Activities');
	});
});
