import { testIds } from '../../src/testData/testIds';

describe('Testing Add Activity Form', () => {
	beforeEach(() => {
		cy.visit('/TodaysTime');
	});

	it('Validate Add Activity Form: adding activity', () => {
		cy.addActivity('Test Activity', '1');
		cy.reload();
		cy.getByTestId(testIds.todaysTime.activityItem).should('not.exist');
	});

	it('Validate Add Activity Form: deleting activity', () => {
		cy.addActivity('Test Activity', '1');

		cy.getByTestId(testIds.todaysTime.activityItem).should('be.visible');
		cy.getByTestId(testIds.todaysTime.activityItem).contains('Test Activity | 1 Hour(s)');
		cy.getByTestId(testIds.todaysTime.activityDelete).should('be.visible');
		cy.getByTestId(testIds.todaysTime.activityDelete).click();
		cy.getByTestId(testIds.todaysTime.activityItem).should('not.exist');
	});

	it('Validate Add Activity Form: graph updates', () => {
		cy.addActivity('Test Activity', '1');
		cy.get('.recharts-legend-item-text').contains('Test Activity').should('be.visible');
		cy.get('path[name="Test Activity"]').should('be.visible');
	});

	it('Validate Add Activity Form: Hours Remaining updates', () => {
		cy.addActivity('Test Activity', '1');
		cy.getByTestId(testIds.todaysTime.remainingHours)
			.contains('Hours Remaining: 23')
			.should('be.visible');
	});

	it('Validate Add Activity Form: Hours spent so far updates', () => {
		cy.addActivity('Test Activity', '1');
		cy.getByTestId(testIds.todaysTime.totalHours)
			.contains('Hours Spent So Far: 1')
			.should('be.visible');
	});

	it('Validate Add Activity Form: submit one activity', () => {
		cy.addActivity('Test Activity', '1');

		cy.getByTestId(testIds.todaysTime.activityItem).should('be.visible');
		cy.getByTestId(testIds.todaysTime.activityItem).contains('Test Activity | 1 Hour(s)');
		cy.getByTestId(testIds.todaysTime.activitySubmitButton).click();
		cy.contains('Activities submitted successfully').should('be.visible');
		cy.visit('/YourTime');
		cy.getByTestId(testIds.yourTime.yourTimeActivityEntry)
			.contains('Test Activity: 1 hours')
			.first()
			.should('be.visible');
		// cleaup data
		cy.deleteActivity('Test Activity', '1');
	});

	it.only('Validate Add Activity Form: submit multiple activities', () => {
		cy.addActivity('Test Activity', '1');
		cy.addActivity('Test Activity 2', '2');

		cy.getByTestId(testIds.todaysTime.activityItem).should('be.visible');
		cy.getByTestId(testIds.todaysTime.activityItem).contains('Test Activity | 1 Hour(s)');
		cy.getByTestId(testIds.todaysTime.activityItem).contains('Test Activity 2 | 2 Hour(s)');
		cy.getByTestId(testIds.todaysTime.activitySubmitButton).click();
		cy.contains('Activities submitted successfully').should('be.visible');
		cy.visit('/YourTime');
		cy.getByTestId(testIds.yourTime.yourTimeActivityEntry)
			.contains('Test Activity: 1 hours')
			.first()
			.should('be.visible');
		cy.getByTestId(testIds.yourTime.yourTimeActivityEntry)
			.contains('Test Activity 2: 2 hours')
			.first()
			.should('be.visible');
		// cleaup data
		cy.getByTestId(testIds.yourTime.yourTimeActivityEntry)
			.contains('Test Activity: 1 hours')
			.first()
			.as('createdActivity');
		cy.get('@createdActivity')
			.parents('div.yourTime')
			.find('button.delete-document-button')
			.click();
		cy.contains('Document deleted successfully').should('be.visible');
	});
});
