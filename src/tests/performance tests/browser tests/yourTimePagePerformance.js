/* eslint-disable import/no-anonymous-default-export */
import { browser } from 'k6/experimental/browser';
import { check } from 'k6';
import { k6_options } from './browserTestConfig.js';

export const options = k6_options;

export default async function () {
	const browserPage = browser.newPage();
	const yourTimePage = 'http://localhost:3000/YourTime';

	try {
		await browserPage.goto(yourTimePage);
		check(browserPage, {
			NavContainer: (p) => p.locator('[data-testid="nav-container"]').isVisible(),
			HeaderNav: (p) => p.locator('[data-testid="header-nav"]').isVisible(),
			YourTime: (p) => p.locator('[data-testid="your-time"]').isVisible(),
			YourTimeActivityList: (p) => p.locator('[data-testid="your-time-activity-list"]').isVisible(),
			YourTimeBarGraph: (p) => p.locator('[data-testid="your-time-bar-graph"]').isVisible(),
			YourTimePieGraph: (p) => p.locator('[data-testid="your-time-pie-graph"]').isVisible(),
			YourTimeComposedGraph: (p) =>
				p.locator('[data-testid="your-time-composed-graph"]').isVisible(),
			YourTimeLineGraph: (p) => p.locator('[data-testid="your-time-line-graph"]').isVisible(),
		});
	} finally {
		browserPage.close();
	}
}
