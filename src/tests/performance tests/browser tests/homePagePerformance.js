/* eslint-disable import/no-anonymous-default-export */
import { browser } from 'k6/experimental/browser';
import { check } from 'k6';
import { k6_options } from './browserTestConfig.js';

export const options = k6_options;

export default async function () {
	const browserPage = browser.newPage();
	const homePage = 'http://localhost:3000/';

	try {
		await browserPage.goto(homePage);
		check(browserPage, {
			TimeOfDayHeader: (p) => p.locator('h1').textContent() === 'Time Of Day',
			NavContainer: (p) => p.locator('[data-testid="nav-container"]').isVisible(),
			HeaderNav: (p) => p.locator('[data-testid="header-nav"]').isVisible(),
			'Welcome Banner': (p) => p.locator('[data-testid="welcome-banner"]').isVisible(),
			Motivation: (p) => p.locator('[data-testid="motivation"]').isVisible(),
			Details: (p) => p.locator('[data-testid="details"]').isVisible(),
		});
	} finally {
		browserPage.close();
	}
}
