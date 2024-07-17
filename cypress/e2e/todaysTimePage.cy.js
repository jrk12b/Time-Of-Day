import { testIds } from '../../src/testData/testIds';

describe('Testing HeaderNav', () => {
	beforeEach(() => {
		cy.visit('/TodaysTime');
	});

	it('Validate Todays Time page is visible', () => {
		cy.getByTestId(testIds.app).should('exist');
		cy.getByTestId(testIds.app).should('be.visible');
		cy.getByTestId(testIds.todaysTime.todaysTime).should('be.visible');
	});

	it('Validate Time Budget is visible', () => {
		cy.getByTestId(testIds.todaysTime.timeBudget).should('be.visible');
		cy.getByTestId(testIds.todaysTime.timeBudget).contains('24 Hours');
		cy.getByTestId(testIds.todaysTime.timeBudget).should('have.class', 'alert alert-success');
	});

	it('Validate Remaining Hours is visible', () => {
		cy.getByTestId(testIds.todaysTime.remainingHours).should('be.visible');
		cy.getByTestId(testIds.todaysTime.remainingHours).contains('Hours Remaining: 24');
		cy.getByTestId(testIds.todaysTime.remainingHours).should('have.class', 'alert alert-secondary');
	});

	it('Validate Total Hours is visible', () => {
		cy.getByTestId(testIds.todaysTime.totalHours).should('be.visible');
		cy.getByTestId(testIds.todaysTime.totalHours).contains('Hours Spent So Far: 0');
		cy.getByTestId(testIds.todaysTime.totalHours).should('have.class', 'alert alert-primary');
	});

	it('Validate Todays Time Graph is visible', () => {
		cy.getByTestId(testIds.todaysTime.todaysTimeGraph).should('be.visible');
	});

	it('Validate Add Activity Form is visible', () => {
		cy.getByTestId(testIds.todaysTime.addActivityForm.addActivityFormHeader).should('be.visible');
		cy.getByTestId(testIds.todaysTime.addActivityForm.addActivityFormHeader).contains(
			'Add Activity'
		);

		cy.getByTestId(testIds.todaysTime.addActivityForm.addActivityForm).should('be.visible');
		cy.getByTestId(testIds.todaysTime.addActivityForm.addActivityFormName).should('be.visible');
		cy.getByTestId(testIds.todaysTime.addActivityForm.addActivityFormHours).should('be.visible');
		cy.getByTestId(testIds.todaysTime.addActivityForm.addActivitySaveButton).should('be.visible');
		cy.getByTestId(testIds.todaysTime.addActivityForm.addActivitySaveButton).contains('Save');
	});

	it('Validate Activity List Exists', () => {
		cy.getByTestId(testIds.todaysTime.activityList).should('exist');
	});

	it('Validate Submit Activities Button is visible', () => {
		cy.getByTestId(testIds.todaysTime.activitySubmit).should('be.visible');
		cy.getByTestId(testIds.todaysTime.activitySubmitButton).should('be.visible');
		cy.getByTestId(testIds.todaysTime.activitySubmitButton).contains('Submit All Activities');
	});
});
