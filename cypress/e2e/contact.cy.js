/// <reference types="cypress" />
import { waitForPageLoad } from '../support/helpers';
import selectors from '../support/selectors';

describe('Validating contact section elements', () => {
	beforeEach(() => {
		cy.visit('https://www.justinkurdila.com/');
		waitForPageLoad();
	});

	it('validate contact header exists', () => {
		cy.contains('h2', 'CONTACT ME').scrollIntoView().should('be.visible');
		cy.contains('h2', 'CONTACT ME')
			.should('have.css', 'font-size', '20px')
			.and('have.css', 'color', 'rgb(24, 33, 83)');
	});

	it('validate contact form exists and is visible', () => {
		cy.get(selectors.contact_form).should('exist');
		cy.contains('label', 'First Name').should('be.visible');
		cy.contains('label', 'Last Name').should('be.visible');
		cy.contains('label', 'Email').should('be.visible');
		cy.contains('label', 'Type your message here...').should('be.visible');
		cy.contains('button', 'Submit').should('be.visible');
	});

	it('validate contact form details', () => {
		cy.get('div[data-mesh-id="SITE_FOOTERinlineContent"]').should('exist');
		cy.get('div[data-mesh-id="SITE_FOOTERinlineContent"]').within(() => {
			cy.contains('p', 'Justin Kurdila').scrollIntoView().should('be.visible');
			cy.contains('p', 'Senior QA Engineer').scrollIntoView().should('be.visible');
			cy.contains('p', 'Email').scrollIntoView().should('be.visible');
			cy.contains('a', 'justinkurdila@gmail.com').scrollIntoView().should('be.visible');
			cy.contains('a', 'justinkurdila@gmail.com').should(
				'have.attr',
				'href',
				'mailto:justinkurdila@gmail.com'
			);
		});
	});

	it('validate footer', () => {
		cy.contains('p', '© 2023 By Justin Kurdila').scrollIntoView().should('be.visible');
	});
});
