/// <reference types="cypress" />
import { waitForPageLoadPictures } from '../support/helpers';
import selectors from '../support/selectors';
import data from '../support/data.js';

describe('Validating contact section elements', () => {
	beforeEach(() => {
		cy.visit('https://www.justinkurdila.com/pictures');
		waitForPageLoadPictures();
	});

	it('validate navigation menu contains expected items', () => {
		cy.wrap(data.navTabs).each((tab) => {
			cy.get(selectors.wix_navigation_menu).find('li').contains(tab).should('be.visible');
		});
	});

	it('validate photo galleriies are visible', () => {
		cy.get(selectors.pro_gallery).should('be.visible');
		cy.get(selectors.pro_gallery).should('be.visible');
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

	it('validate footer', () => {
		cy.contains('p', '© 2023 By Justin Kurdila').scrollIntoView().should('be.visible');
	});
});
