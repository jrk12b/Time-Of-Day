/// <reference types="cypress" />
import { waitForPageLoad } from '../support/helpers';
import data from '../support/data.js';

describe('Validing certifications section elements', () => {
	beforeEach(() => {
		cy.visit('https://www.justinkurdila.com/');
		waitForPageLoad();
	});

	it('validate certifications header exists', () => {
		cy.contains('h2', 'CERTIFICATIONS').scrollIntoView().should('be.visible');
		cy.contains('h2', 'CERTIFICATIONS')
			.should('have.css', 'font-size', '20px')
			.and('have.css', 'color', 'rgb(24, 33, 83)');
	});

	it('validate all certifications are visible and have correct css', () => {
		cy.wrap(data.certifications).each((certification) => {
			cy.contains('p', certification).scrollIntoView().should('be.visible');
			cy.contains('p', certification)
				.should('have.css', 'font-size', '20px')
				.and('have.css', 'color', 'rgb(24, 33, 83)');
		});
	});

	it('validate istqb foundation cert details are visible and have correct css', () => {
		cy.wrap(data.istq_foundation_cert_details).each((detail) => {
			cy.contains('p', detail).scrollIntoView().should('be.visible');
			cy.contains('p', detail)
				.should('have.css', 'font-size', '16px')
				.and('have.css', 'color', 'rgb(24, 33, 83)');
		});
	});

	it('validate aws cert details are visible and have correct css', () => {
		cy.wrap(data.aws_cert_details).each((detail) => {
			cy.contains('p', detail).scrollIntoView().should('be.visible');
			cy.contains('p', detail)
				.should('have.css', 'font-size', '16px')
				.and('have.css', 'color', 'rgb(24, 33, 83)');
		});
	});

	it('validate istqb advanced details are visible and have correct css', () => {
		cy.wrap(data.istqb_advanced_cert_details).each((detail) => {
			cy.contains('p', detail).scrollIntoView().should('be.visible');
			cy.contains('p', detail)
				.should('have.css', 'font-size', '16px')
				.and('have.css', 'color', 'rgb(24, 33, 83)');
		});
	});
});
