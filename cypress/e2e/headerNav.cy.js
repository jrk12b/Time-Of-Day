import { testIds } from '../../src/testData/testIds';
import { textContent } from '../../src/textContent';

describe('Testing HeaderNav', () => {
	it('Validate HeaderNav elements on homePage', () => {
		cy.visit('/');
		cy.validateHeaderNav();
	});

	it('Validate HeaderNav elements on todaysTimePage', () => {
		cy.visit('/TodaysTime');
		cy.validateHeaderNav();
	});

	it('Validate HeaderNav elements on yourTimePage', () => {
		cy.visit('/YourTime');
		cy.validateHeaderNav();
	});
});
