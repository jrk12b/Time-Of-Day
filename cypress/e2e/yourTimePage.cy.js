import { testIds } from '../../src/testData/testIds';

describe('Testing HeaderNav', () => {
	beforeEach(() => {
		cy.visit('/YourTime');
	});

	it('Validate Your Time page is visible', () => {
		cy.getByTestId(testIds.app).should('exist');
		cy.getByTestId(testIds.app).should('be.visible');
		cy.getByTestId(testIds.yourTime.yourTime).should('be.visible');
		cy.getByTestId(testIds.yourTime.yourTime).contains('Your Time');
	});

	it('Validate Your Time Activity List', () => {
		cy.getByTestId(testIds.yourTime.yourTimeActivityList).should('be.visible');
		cy.getByTestId(testIds.yourTime.yourTimeActivityList)
			.find('.yourTime')
			.first()
			.as('yourTimeCard');
		cy.get('@yourTimeCard').should('be.visible');
		cy.get('@yourTimeCard')
			.find('.delete-document-button')
			.should('be.visible')
			.and('have.text', 'Delete Entire Document');
		cy.get('@yourTimeCard').find('.dateText').should('be.visible').and('include.text', 'Date: ');
		cy.get('@yourTimeCard').within(() => {
			cy.getByTestId(testIds.yourTime.yourTimeActivityEntry).should('be.visible');
			cy.getByTestId(testIds.yourTime.yourTimeActivityEntry).should('include.text', 'hours');
			cy.getByTestId(testIds.yourTime.yourTimeActivityEntry)
				.find('.activity-button')
				.first()
				.should('be.visible')
				.and('have.text', 'Edit');
			cy.getByTestId(testIds.yourTime.yourTimeActivityEntry)
				.find('.activity-button')
				.last()
				.should('be.visible')
				.and('have.text', 'Delete');
		});
	});

	it('Validate Your Time Bar Graph is visible', () => {
		cy.getByTestId(testIds.yourTime.yourTimeBarGraph).should('be.visible');
	});

	it('Validate Your Time Pie Graph is visible', () => {
		cy.getByTestId(testIds.yourTime.yourTimePieGraph).should('be.visible');
	});

	it('Validate Your Time Composed Graph is visible', () => {
		cy.getByTestId(testIds.yourTime.yourTimeComposedGraph).should('be.visible');
	});

	it('Validate Your Time Line Graph is visible', () => {
		cy.getByTestId(testIds.yourTime.yourTimeLineGraph).should('be.visible');
	});
});
