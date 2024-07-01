import selectors from './selectors';
import data from '../support/data.js';

export function waitForPageLoad() {
	cy.get(selectors.site_header, { timeout: 15000 }).should('exist');
	cy.get(selectors.slide_show_gallery, { timeout: 15000 }).should('be.visible');
	cy.get(selectors.big_container, { timeout: 15000 }).should('be.visible');
}

export function waitForPageLoadPictures() {
	cy.get(selectors.site_header, { timeout: 15000 }).should('exist');
	cy.get(selectors.slide_show_gallery, { timeout: 15000 }).should('be.visible');
}

export function validateLandingPageLoad() {
	waitForPageLoad();
	cy.get(selectors.wix_navigation_menu).should('be.visible');
	cy.wrap(data.navTabs).each((tab) => {
		cy.get(selectors.wix_navigation_menu).find('li').contains(tab).should('be.visible');
	});
	cy.get(selectors.slide_show_gallery_items, { timeout: 10000 }).should('be.visible');
	cy.get('h1', { timeout: 10000 })
		.contains('Justin Kurdila, MSIT')
		.then(($header_text) => {
			cy.get($header_text).should('be.visible');
			cy.get($header_text).should('have.css', 'font-size', '30px');
		});
	cy.get('p').contains('Senior QA Engineer').should('be.visible');
	cy.contains('Email:').should('be.visible');
	cy.contains('justinkurdila@gmail.com').should('be.visible');
	cy.contains('Address:').should('be.visible');
	cy.contains('Atlanta, GA').should('be.visible');
	cy.get('img[alt="LinkedIn"]').should('be.visible');
	cy.get('h2').contains("Hello! I'm Justin").should('be.visible');
	cy.get('p').contains(data.header_content).should('be.visible');
	cy.contains('h2', 'CERTIFICATIONS').scrollIntoView().should('be.visible');
	cy.contains('h2', 'CONTACT ME').scrollIntoView().should('be.visible');
	cy.contains('h2', 'EDUCATION').scrollIntoView().should('be.visible');
	cy.contains('h2', 'EXPERIENCE').scrollIntoView().should('be.visible');
	cy.contains('h2', 'SKILLS').scrollIntoView().should('be.visible');
	cy.contains('h2', 'INTERESTS AND HOBBIES').scrollIntoView().should('be.visible');
	cy.get(selectors.contact_form).should('exist');
	cy.contains('label', 'First Name').should('be.visible');
	cy.contains('label', 'Last Name').should('be.visible');
	cy.contains('label', 'Email').should('be.visible');
	cy.contains('label', 'Type your message here...').should('be.visible');
	cy.contains('button', 'Submit').should('be.visible');
}
