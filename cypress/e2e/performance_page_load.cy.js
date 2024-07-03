/// <reference types="cypress" />
import 'cypress-time-marks';
import { validateLandingPageLoad } from '../support/helpers.js';

describe('Validating welcome card and navigation elements', () => {
	it('Performance: Page Timing', () => {
		cy.timeMark('start');

		cy.visit('https://www.justinkurdila.com/');
		validateLandingPageLoad();

		cy.timeMark('finish');

		// Page should load faster than 10 seconds
		cy.timeBetween('start', 'finish', 'loading time', 10000, true);
	});

	// https://developer.chrome.com/docs/lighthouse/overview
	it('Performance: Google Lighthouse Metrics', () => {
		cy.visit('https://www.justinkurdila.com/');
		const customThresholds = {
			performance: 55,
			accessibility: 90,
			seo: 90,
			interactive: 9000,
			pwa: 20,
			'first-contentful-paint': 3000, // FCP measures how long it takes the browser to render the first piece of DOM content after a user navigates to your page
			'largest-contentful-paint': 10000, // LCP measures when the largest content element in the viewport is rendered to the screen
			'cumulative-layout-shift': 0.1, // Unexpected movement of page content usually happens when resources load asynchronously or DOM elements are dynamically added to the page before existing content
			'total-blocking-time': 200, // TBT measures the total amount of time that a page is blocked from responding to user input, such as mouse clicks, screen taps, or keyboard presses
		};

		const desktopConfig = {
			formFactor: 'desktop',
			screenEmulation: { disabled: true },
		};

		cy.lighthouse(customThresholds, desktopConfig);
	});
});
