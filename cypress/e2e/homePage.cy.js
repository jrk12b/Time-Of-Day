/* eslint-disable cypress/unsafe-to-chain-command */
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
	});

	it('Validate Video Background', () => {
		cy.getByTestId(testIds.home.videoBackground).should('exist');
		cy.getByTestId(testIds.home.videoBackground).should('have.attr', 'autoplay');
		cy.getByTestId(testIds.home.videoBackgroundSource).should('exist');
		cy.getByTestId(testIds.home.videoBackgroundSource)
			.should('have.attr', 'src', '/clock.mp4')
			.and('have.attr', 'type', 'video/mp4');
	});

	it('Validate Welcome section is visible', () => {
		cy.getByTestId(testIds.home.welcomeBanner).should('be.visible');
		cy.getByTestId(testIds.home.homeHeader).should('be.visible');
		cy.getByTestId(testIds.home.homeHeader).contains(textContent.home.homeHeader);
		cy.getByTestId(testIds.home.motivation).should('be.visible');
		cy.getByTestId(testIds.home.motivation).contains(textContent.home.motivation);
	});

	it('Validate Details section is visible', () => {
		cy.getByTestId(testIds.home.details).as('details');
		cy.get('@details').scrollIntoView().should('be.visible');
		cy.get('@details').scrollIntoView().contains(textContent.home.details);
	});

	it('Validate Instructions section is visible', () => {
		cy.getByTestId(testIds.home.instructions).as('instructions');
		cy.get('@instructions').scrollIntoView().should('be.visible');
		cy.get('@instructions').scrollIntoView().contains(textContent.home.instructionsHeader);
		cy.get('@instructions').scrollIntoView().contains(textContent.home.instructions1);
		cy.get('@instructions').scrollIntoView().contains(textContent.home.instructions2);
		cy.get('@instructions').scrollIntoView().contains(textContent.home.instructions3);
		cy.get('@instructions').scrollIntoView().contains(textContent.home.instructions4);
	});
});
