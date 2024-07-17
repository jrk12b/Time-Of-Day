import { testIds } from '../../src/testData/testIds';

describe('Testing Your Time Activities', () => {
	beforeEach(() => {
		cy.visit('/YourTime');
	});

	after(() => {});

	it('Validate Your Time Activities: Cancel Edit Activities', () => {
		cy.visit('/TodaysTime');
		cy.addActivity('Test Activity', '1');
		cy.getByTestId(testIds.todaysTime.activitySubmitButton).click();
		cy.contains('Activities submitted successfully').should('be.visible');
		cy.visit('/YourTime');
		cy.getByTestId(testIds.yourTime.yourTimeActivityEntry)
			.contains('Test Activity')
			.last()
			.as('createdActivity');
		cy.get('@createdActivity').within(() => {
			cy.get('.activity-button').contains('Edit').click();
		});
		cy.get('.activity-button').contains('Cancel').click();
		cy.get('@createdActivity').should('be.visible');
		cy.deleteActivity('Test Activity', '1');
	});

	it('Validate Your Time Activities: Edit Activity Name', () => {
		cy.visit('/TodaysTime');
		cy.addActivity('Test Activity', '1');
		cy.getByTestId(testIds.todaysTime.activitySubmitButton).click();
		cy.contains('Activities submitted successfully').should('be.visible');
		cy.visit('/YourTime');
		cy.getByTestId(testIds.yourTime.yourTimeActivityEntry)
			.contains('Test Activity')
			.last()
			.as('createdActivity');
		cy.get('@createdActivity').within(() => {
			cy.get('.activity-button').contains('Edit').click();
		});
		cy.get('input[value="Test Activity"]').clear().type('Updated Activity');
		cy.get('.activity-button').contains('Save').click();
		cy.getByTestId(testIds.yourTime.yourTimeActivityEntry)
			.contains('Updated Activity: 1 hours')
			.first()
			.should('be.visible');
		cy.deleteActivity('Updated Activity', '1');
	});

	it('Validate Your Time Activities: Edit Activity Hours', () => {
		cy.visit('/TodaysTime');
		cy.addActivity('Test Activity', '1');
		cy.getByTestId(testIds.todaysTime.activitySubmitButton).click();
		cy.contains('Activities submitted successfully').should('be.visible');
		cy.visit('/YourTime');
		cy.getByTestId(testIds.yourTime.yourTimeActivityEntry)
			.contains('Test Activity')
			.last()
			.as('createdActivity');
		cy.get('@createdActivity').within(() => {
			cy.get('.activity-button').contains('Edit').click();
		});
		cy.get('input[value="1"]').clear().type('2');
		cy.get('.activity-button').contains('Save').click();
		cy.getByTestId(testIds.yourTime.yourTimeActivityEntry)
			.contains('Test Activity: 2 hours')
			.first()
			.should('be.visible');
		cy.deleteActivity('Test Activity', '2');
	});
});
