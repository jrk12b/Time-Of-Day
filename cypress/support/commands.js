import { testIds } from '../../src/testData/testIds';
import { textContent } from '../../src/textContent';
import '@cypress-audit/lighthouse/commands';

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

Cypress.Commands.add('validateHeaderNavMobile', () => {
	cy.getByTestId(testIds.headerNav.navContainer).should('be.visible');
	cy.getByTestId(testIds.headerNav.mobileToggle).should('be.visible');
	cy.getByTestId(testIds.headerNav.mobileMenu).should('exist');
	cy.getByTestId(testIds.headerNav.mobileMenu).should('not.be.visible');
	cy.getByTestId(testIds.headerNav.mobileToggle).click();
	cy.getByTestId(testIds.headerNav.mobileMenu).should('be.visible');
	cy.getByTestId(testIds.headerNav.homeNavLink).should('be.visible');
	cy.getByTestId(testIds.headerNav.homeNavLink).should('have.attr', 'href').and('include', '/');
	cy.getByTestId(testIds.headerNav.todaysTimeNavLink).should('be.visible');
	cy.getByTestId(testIds.headerNav.todaysTimeNavLink)
		.should('have.attr', 'href')
		.and('include', '/TodaysTime');
	cy.getByTestId(testIds.headerNav.yourTimeNavLink).should('be.visible');
	cy.getByTestId(testIds.headerNav.yourTimeNavLink)
		.should('have.attr', 'href')
		.and('include', '/YourTime');
	cy.get('.nav__close').click();
	cy.getByTestId(testIds.headerNav.mobileMenu).should('not.be.visible');
});

Cypress.Commands.add('addActivity', (activityName, hours) => {
	cy.getByTestId(testIds.todaysTime.addActivityForm.addActivityFormName).should('be.visible');
	cy.getByTestId(testIds.todaysTime.addActivityForm.addActivityFormName).type(activityName);
	cy.getByTestId(testIds.todaysTime.addActivityForm.addActivityFormHours).type(hours);
	cy.getByTestId(testIds.todaysTime.addActivityForm.addActivitySaveButton).click();

	cy.getByTestId(testIds.todaysTime.activityItem).should('be.visible');
	cy.getByTestId(testIds.todaysTime.activityItem).contains(`${activityName} | ${hours} Hour(s)`);
});

Cypress.Commands.add('deleteActivity', (activityName, hours) => {
	cy.getByTestId(testIds.yourTime.yourTimeActivityEntry)
		.contains(`${activityName}: ${hours} hours`)
		.first()
		.as('createdActivity');
	cy.get('@createdActivity').parents('div.yourTime').find('button.delete-document-button').click();
	cy.contains('Document deleted successfully').should('be.visible');
});

Cypress.Commands.add('validateHomePageLoad', () => {
	cy.getByTestId(testIds.app).should('be.visible');
	cy.validateHeaderNav();
	cy.getByTestId(testIds.home.welcomeBanner).should('be.visible');
	cy.getByTestId(testIds.home.homeHeader).should('be.visible');
	cy.getByTestId(testIds.home.motivation).should('be.visible');
	cy.getByTestId(testIds.home.details).should('be.visible');
	cy.getByTestId(testIds.home.instructions).should('be.visible');
});

Cypress.Commands.add('validateTodaysTimePageLoad', () => {
	cy.getByTestId(testIds.app).should('be.visible');
	cy.validateHeaderNav();
	cy.getByTestId(testIds.todaysTime.todaysTime).should('be.visible');
	cy.getByTestId(testIds.todaysTime.timeBudget).should('be.visible');
	cy.getByTestId(testIds.todaysTime.remainingHours).should('be.visible');
	cy.getByTestId(testIds.todaysTime.totalHours).should('be.visible');
	cy.getByTestId(testIds.todaysTime.todaysTimeGraph).should('be.visible');
	cy.getByTestId(testIds.todaysTime.addActivityForm.addActivityFormHeader).should('be.visible');
	cy.getByTestId(testIds.todaysTime.addActivityForm.addActivityForm).should('be.visible');
	cy.getByTestId(testIds.todaysTime.activitySubmit).should('be.visible');
});

Cypress.Commands.add('validateYourTimePageLoad', () => {
	cy.getByTestId(testIds.app).should('be.visible');
	cy.validateHeaderNav();
	cy.getByTestId(testIds.yourTime.yourTime).should('be.visible');
	cy.getByTestId(testIds.yourTime.yourTimeActivityList).should('be.visible');
	cy.getByTestId(testIds.yourTime.yourTimeBarGraph).should('be.visible');
	cy.getByTestId(testIds.yourTime.yourTimePieGraph).should('be.visible');
	cy.getByTestId(testIds.yourTime.yourTimeComposedGraph).should('be.visible');
	cy.getByTestId(testIds.yourTime.yourTimeLineGraph).should('be.visible');
});
