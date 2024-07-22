/* eslint-disable import/no-anonymous-default-export */
import { browser } from 'k6/experimental/browser';
import { check } from 'k6';
import { k6_options } from './browserTestConfig.js';

export const options = k6_options;

export default async function () {
	const browserPage = browser.newPage();
	const todaysTimePage = 'http://localhost:3000/TodaysTime';

	try {
		await browserPage.goto(todaysTimePage);
		check(browserPage, {
			NavContainer: (p) => p.locator('[data-testid="nav-container"]').isVisible(),
			HeaderNav: (p) => p.locator('[data-testid="header-nav"]').isVisible(),
			TodaysTime: (p) => p.locator('[data-testid="todays-time"]').isVisible(),
			TimeBudget: (p) => p.locator('[data-testid="time-budget"]').isVisible(),
			RemainingHours: (p) => p.locator('[data-testid="remaining-hours"]').isVisible(),
			TotalHours: (p) => p.locator('[data-testid="total-hours"]').isVisible(),
			TodaysTimeGraph: (p) => p.locator('[data-testid="todays-time-graph"]').isVisible(),
			AddActivityFormHeader: (p) =>
				p.locator('[data-testid="add-activity-form-header"]').isVisible(),
			ActivitySubmit: (p) => p.locator('[data-testid="activity-submit"]').isVisible(),
		});
	} finally {
		browserPage.close();
	}
}
