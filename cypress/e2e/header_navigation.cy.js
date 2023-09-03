/// <reference types="cypress" />
import selectors from '../support/selectors.js';
import data from '../support/data.js';

describe('Validating header and navigation elements', () => {
	beforeEach(() => {
		cy.visit('https://www.justinkurdila.com/');
	});

	it('validate header text equals Justin Kurdila', () => {
		cy.get('h3').contains('Justin Kurdila').should('be.visible');
	});

	it('validate navigation menu is visible', () => {
		cy.get(selectors.wix_navigation_menu).should('be.visible');
	});

	it('validate navigation menu contains expected items', () => {
		cy.wrap(data.navTabs).each((tab) => {
			cy.get(selectors.wix_navigation_menu).find('li').contains(tab).should('be.visible');
		});
	});

	it('validate pictures navigation', () => {
		cy.get(selectors.wix_navigation_menu_item).contains('PICTURES').click();
		cy.url().should('eq', 'https://www.justinkurdila.com/pictures');
	});

	it('validate experience navigation', () => {
		cy.get(selectors.data_anchor_experience).find('p').contains('EXPERIENCE').should('exist');
	});

	it('validate education navigation', () => {
		cy.get(selectors.data_anchor_education).find('p').contains('EDUCATION').should('exist');
	});

	it('validate skills navigation', () => {
		cy.get(selectors.data_anchor_skills).find('p').contains('SKILLS').should('exist');
	});

	it('validate certification navigation', () => {
		cy.get(selectors.data_anchor_certifications)
			.find('p')
			.contains('CERTIFICATIONS')
			.should('exist');
	});

	it('validate interests navigation', () => {
		cy.get(selectors.data_anchor_interests)
			.find('p')
			.contains('INTERESTS AND HOBBIES')
			.should('exist');
	});
});
