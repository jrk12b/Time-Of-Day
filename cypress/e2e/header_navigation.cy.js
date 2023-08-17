/// <reference types="cypress" />
import selectors from '../support/selectors.js';

describe('Validing header and navigation elements', () => {
  beforeEach(() => {
    cy.visit('https://www.justinkurdila.com/')
  })

  it('validate header text equals Justin Kurdila', () => {
    cy.get('h3').contains('Justin Kurdila').should('be.visible');
  });

  it('validate navigation menu is visible', () => {
    cy.get(selectors.wix_navigation_menu).should('be.visible');
  });

  it('validate navigation menu contains expected items', () => {
    const navTabs = [
      'HOME',
      'PICTURES',
      'EXPERIENCE',
      'EDUCATION',
      'SKILLS',
      'CERTIFICATIONS',
      'INTERESTS AND HOBBIES',
    ];
    cy.wrap(navTabs).each((tab) => {
      cy.get(selectors.wix_navigation_menu).find('li').contains(tab).should('be.visible');
    });
  });

  it('validate pictures navigation', () => {
    cy.get(selectors.wix_navigation_menu_item).contains('PICTURES').click();
    cy.url().should('eq', 'https://www.justinkurdila.com/pictures')
  });
})
