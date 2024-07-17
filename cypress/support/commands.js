import { testIds } from '../../src/testData/testIds';
import { textContent } from '../../src/textContent';

Cypress.Commands.add('getByTestId', (testId) => {
	return cy.get(`[data-testid="${testId}"]`);
});

Cypress.Commands.add('validateHeaderNav', () => {
	cy.getByTestId(testIds.headerNav.navContainer).should('be.visible');
	cy.getByTestId(testIds.headerNav.headerNav).should('be.visible');

	cy.getByTestId(testIds.headerNav.timeOfDayNavLink).should('be.visible');
	cy.getByTestId(testIds.headerNav.timeOfDayNavLink).contains(textContent.headerNav.timeOfDay);
	cy.getByTestId(testIds.headerNav.timeOfDayNavLink)
		.should('have.attr', 'href')
		.and('include', '/');

	cy.getByTestId(testIds.headerNav.homeNavLink).should('be.visible');
	cy.getByTestId(testIds.headerNav.homeNavLink).contains(textContent.headerNav.home);
	cy.getByTestId(testIds.headerNav.homeNavLink).should('have.attr', 'href').and('include', '/');

	cy.getByTestId(testIds.headerNav.todaysTimeNavLink).should('be.visible');
	cy.getByTestId(testIds.headerNav.todaysTimeNavLink).contains(textContent.headerNav.todaysTime);
	cy.getByTestId(testIds.headerNav.todaysTimeNavLink)
		.should('have.attr', 'href')
		.and('include', '/TodaysTime');

	cy.getByTestId(testIds.headerNav.yourTimeNavLink).should('be.visible');
	cy.getByTestId(testIds.headerNav.yourTimeNavLink).contains(textContent.headerNav.yourTime);
	cy.getByTestId(testIds.headerNav.yourTimeNavLink)
		.should('have.attr', 'href')
		.and('include', '/YourTime');
});
