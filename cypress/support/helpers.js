import selectors from './selectors';

export function waitForPageLoad() {
    cy.get(selectors.site_header, { timeout: 15000 }).should('exist');
	cy.get(selectors.slide_show_gallery, { timeout: 15000 }).should('be.visible');
	cy.get(selectors.big_container, { timeout: 15000 }).should('be.visible');
}