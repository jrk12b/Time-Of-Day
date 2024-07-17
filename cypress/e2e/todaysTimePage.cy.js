import { testIds } from '../../src/testData/testIds';
import { textContent } from '../../src/textContent';

describe('Testing HeaderNav', () => {
	beforeEach(() => {
		cy.visit('/TodaysTime');
	});

	it('Validate Home Page Content', () => {
		cy.getByTestId(testIds.app).should('exist');
		cy.getByTestId(testIds.app).should('be.visible');
	});
});
