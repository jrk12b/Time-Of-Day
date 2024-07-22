/* eslint-disable import/no-anonymous-default-export */
import { browser } from 'k6/browser';
import { check } from 'k6';

const k6_thresholds = {
	browser_http_req_duration: ['p(95)<15000'], // 99 percent of response times must be below 2000ms
	browser_http_req_failed: ['rate<0.005'], // http errors should be less than 0.5%
	browser_web_vital_lcp: ['p(95)<9500'], // Measures a page's loading performance, specifically Largest Contenful Paint - the render time of the largest image or text block visible in the viewport, relative to when the user first navigated to the page.
	browser_web_vital_fid: ['p(95)<500'], // Measures a page's interactivity, specifically First Inout Delay - measures the time from when a user first interacts with a page to the time when the browser is actually able to begin processing.
	browser_web_vital_cls: ['p(95)<0.6'], // Measures a page's visual stability, specifically Cumulative Layout Shift - a measure of the largest burst of layout shift scores for every unexpected layout shift that occurs during the entire lifecycle of a page
	browser_web_vital_ttfb: ['p(95)<18000'], // Measures the time it takes between the browser request and the start of the response from a server
	browser_web_vital_fcp: ['p(95)<23000'], // Measures the time it takes for the browser to render the first DOM element on the page, whether that's a text, image or header.
	checks: ['rate>0.99'], // the rate of successful checks should be higher than 99%
};

export const options = {
	scenarios: {
		ui: {
			executor: 'constant-vus',
			vus: 1,
			duration: '30s',
			options: {
				browser: {
					type: 'chromium',
				},
			},
		},
	},
	thresholds: k6_thresholds,
};

export default async function () {
	const browserPage = await browser.newPage();
	const yourTimePage = 'http://localhost:3000/YourTime';

	try {
		await browserPage.goto(yourTimePage);
		const navContainer = browserPage.locator('[data-testid="nav-container"]');
		const headerNav = browserPage.locator('[data-testid="header-nav"]');
		const yourTime = browserPage.locator('[data-testid="your-time"]');
		const yourTimeActivityList = browserPage.locator('[data-testid="your-time-activity-list"]');
		const yourTimeBarGraph = browserPage.locator('[data-testid="your-time-bar-graph"]');
		const yourTimePieGraph = browserPage.locator('[data-testid="your-time-pie-graph"]');
		const yourTimeComposedGraph = browserPage.locator('[data-testid="your-time-composed-graph"]');
		const yourTimeLineGraph = browserPage.locator('[data-testid="your-time-line-graph"]');

		check(navContainer, {
			navContainer: navContainer.isVisible(),
		});
		check(headerNav, {
			headerNav: headerNav.isVisible(),
		});
		check(yourTime, {
			yourTime: yourTime.isVisible(),
		});
		check(yourTimeActivityList, {
			yourTimeActivityList: yourTimeActivityList.isVisible(),
		});
		check(yourTimeBarGraph, {
			yourTimeBarGraph: yourTimeBarGraph.isVisible(),
		});
		check(yourTimePieGraph, {
			yourTimePieGraph: yourTimePieGraph.isVisible(),
		});
		check(yourTimeComposedGraph, {
			yourTimeComposedGraph: yourTimeComposedGraph.isVisible(),
		});
		check(yourTimeLineGraph, {
			yourTimeLineGraph: yourTimeLineGraph.isVisible(),
		});
	} finally {
		browserPage.close();
	}
}
