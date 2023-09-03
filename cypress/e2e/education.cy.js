/// <reference types="cypress" />
import { waitForPageLoad } from '../support/helpers';
import data from '../support/data.js';

describe('Validating education section elements', () => {
	beforeEach(() => {
		cy.visit('https://www.justinkurdila.com/');
		waitForPageLoad();
	});

	it('validate education header exists', () => {
		cy.contains('h2', 'EDUCATION').scrollIntoView().should('be.visible');
		cy.contains('h2', 'EDUCATION')
			.should('have.css', 'font-size', '20px')
			.and('have.css', 'color', 'rgb(24, 33, 83)');
	});

	it('validate masters degree education', () => {
		cy.contains('h3', '2019 - 2021').scrollIntoView().should('be.visible');
		cy.contains('p', "Master's Degree").should('be.visible');
		cy.contains('p', 'Kennesaw State University').should('be.visible');
		cy.contains('p', data.education_masters).should('be.visible');
	});

	it('validate bachelors degree education', () => {
		cy.contains('h3', '2012 - 2016').scrollIntoView().should('be.visible');
		cy.contains('p', "Bachelor's Degree").should('be.visible');
		cy.contains('p', 'Florida State University').scrollIntoView().should('be.visible');
		cy.contains('p', data.education_bachelors).should('be.visible');
	});

	it('validate high school degree education', () => {
		cy.contains('h3', '2008 - 2012').scrollIntoView().should('be.visible');
		cy.contains('p', 'High School Degree').should('be.visible');
		cy.contains('p', 'St. Francis High School').should('be.visible');
		cy.contains('p', data.education_high_school).should('be.visible');
	});
});
