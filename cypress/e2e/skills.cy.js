/// <reference types="cypress" />
import { waitForPageLoad } from '../support/helpers';
import data from '../support/data.js';

describe('Validating skills section elements', () => {
	beforeEach(() => {
		cy.visit('https://www.justinkurdila.com/');
		waitForPageLoad();
	});

	it('validate skills header exists', () => {
		cy.contains('h2', 'SKILLS').scrollIntoView().should('be.visible');
		cy.contains('h2', 'SKILLS')
			.should('have.css', 'font-size', '20px')
			.and('have.css', 'color', 'rgb(24, 33, 83)');
	});

	it('validate all skills are visible and have correct css', () => {
		cy.wrap(data.skills).each((skill) => {
			cy.contains('p', skill).scrollIntoView().should('be.visible');
			cy.contains('p', skill)
				.should('have.css', 'font-size', '14px')
				.and('have.css', 'color', 'rgb(24, 33, 83)');
		});
	});
});
