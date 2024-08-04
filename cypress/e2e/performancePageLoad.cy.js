import 'cypress-time-marks';

describe('Validate UI Performance', () => {
	it('Performance: Home Page Timing', () => {
		cy.timeMark('start');

		cy.visit('/');
		cy.validateHomePageLoad();

		cy.timeMark('finish');

		// Page should load faster than 3 seconds
		cy.timeBetween('start', 'finish', 'loading time', 3000, true);
	});

	it('Performance: Todays Time Page Timing', () => {
		cy.timeMark('start');

		cy.visit('/TodaysTime');
		cy.validateTodaysTimePageLoad();

		cy.timeMark('finish');

		// Page should load faster than 3 seconds
		cy.timeBetween('start', 'finish', 'loading time', 3000, true);
	});

	it('Performance: Your Time Page Timing', () => {
		cy.timeMark('start');

		cy.visit('/YourTime');
		cy.validateYourTimePageLoad();

		cy.timeMark('finish');

		// Page should load faster than 3 seconds
		cy.timeBetween('start', 'finish', 'loading time', 3000, true);
	});
});
