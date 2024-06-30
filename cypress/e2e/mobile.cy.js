/// <reference types="cypress" />
import { waitForPageLoad } from '../support/helpers.js';

// mobile device sizes tested
const devices = [
	'ipad-2',
	'ipad-mini',
	'iphone-3',
	'iphone-4',
	'iphone-5',
	'iphone-6',
	'iphone-6+',
	'iphone-7',
	'iphone-8',
	'iphone-x',
	'iphone-xr',
	'iphone-se2',
	'macbook-11',
	'macbook-13',
	'macbook-15',
	'macbook-16',
	'samsung-note9',
	'samsung-s10',
];

describe('Validating mobile responsiveness on various devices', () => {
	beforeEach(() => {
		cy.visit('https://www.justinkurdila.com/');
		waitForPageLoad();
	});

	devices.forEach((device) => {
		it(`Validating mobile responsiveness on device: ${device}`, () => {
			cy.viewport(device);
			cy.get('h1', { timeout: 10000 })
				.contains('Justin Kurdila, MSIT')
				.then(($header_text) => {
					cy.get($header_text).should('be.visible');
					cy.get($header_text).should('have.css', 'font-size', '30px');
				});
			cy.get('[data-testid="gallery-item-item"]').should('be.visible');
		});
	});
});
