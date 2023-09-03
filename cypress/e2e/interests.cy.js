/// <reference types="cypress" />
import { waitForPageLoad } from '../support/helpers';
import data from '../support/data.js';

describe('Validating interests section elements', () => {
	beforeEach(() => {
		cy.visit('https://www.justinkurdila.com/');
		waitForPageLoad();
	});

	it('validate interests header exists', () => {
		cy.contains('h2', 'INTERESTS AND HOBBIES').scrollIntoView().should('be.visible');
		cy.contains('h2', 'INTERESTS AND HOBBIES')
			.should('have.css', 'font-size', '20px')
			.and('have.css', 'color', 'rgb(24, 33, 83)');
	});

	it('validate all interests are visible and have correct css', () => {
		cy.wrap(data.interests).each((interest) => {
			cy.contains('h2', interest).scrollIntoView().should('be.visible');
			cy.contains('h2', interest)
				.should('have.css', 'font-size', '18px')
				.and('have.css', 'color', 'rgb(24, 33, 83)');
		});
	});

	it('validate all interest details are visible and have correct css', () => {
		cy.wrap(data.interest_details).each((interest_detail) => {
			cy.contains('p', interest_detail).scrollIntoView().should('be.visible');
			cy.contains('p', interest_detail)
				.should('have.css', 'font-size', '16px')
				.and('have.css', 'color', 'rgb(24, 33, 83)');
		});
	});
});
