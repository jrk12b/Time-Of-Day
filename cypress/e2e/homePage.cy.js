import { testIds } from '../../src/testData/testIds';
import { textContent } from '../../src/textContent';

describe('Testing Home Page Elements', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('Validate Home Page Content', () => {
		cy.getByTestId(testIds.app).should('exist');
		cy.getByTestId(testIds.app).should('be.visible');
		cy.getByTestId(testIds.home.homeDiv).should('be.visible');
		cy.getByTestId(testIds.home.welcomeBanner).should('be.visible');
		cy.getByTestId(testIds.home.homeHeader).should('be.visible');
		cy.getByTestId(testIds.home.homeHeader).contains(textContent.home.homeHeader);
		cy.getByTestId(testIds.home.motivation).should('be.visible');
		cy.getByTestId(testIds.home.motivation).contains(textContent.home.motivation);
		cy.getByTestId(testIds.home.details).should('be.visible');
		cy.getByTestId(testIds.home.details).contains(textContent.home.details);
		cy.getByTestId(testIds.home.instructions).should('be.visible');
		cy.getByTestId(testIds.home.instructions).contains(textContent.home.instructionsHeader);
		cy.getByTestId(testIds.home.instructions).contains(textContent.home.instructions1);
		cy.getByTestId(testIds.home.instructions).contains(textContent.home.instructions2);
		cy.getByTestId(testIds.home.instructions).contains(textContent.home.instructions3);
		cy.getByTestId(testIds.home.instructions).contains(textContent.home.instructions4);
	});
});
