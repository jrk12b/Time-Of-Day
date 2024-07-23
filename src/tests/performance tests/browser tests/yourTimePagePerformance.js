/* eslint-disable import/no-anonymous-default-export */
import { browser } from 'k6/browser';
import { check } from 'k6';
import { testIds } from '../../../testData/testIds.js';

const k6_thresholds = {
	browser_http_req_duration: ['p(95)<15000'], // 99 percent of response times must be below 2000ms
	browser_http_req_failed: ['rate<0.005'], // http errors should be less than 0.5%
	browser_web_vital_lcp: ['p(95)<13000'], // Measures a page's loading performance, specifically Largest Contenful Paint - the render time of the largest image or text block visible in the viewport, relative to when the user first navigated to the page.
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
			duration: '3s',
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
	await browserPage.goto(yourTimePage);

	const navContainer = browserPage.locator(`[data-testid=${testIds.headerNav.navContainer}]`);
	const navContainerVisible = await navContainer.isVisible();

	const headerNav = browserPage.locator(`[data-testid=${testIds.headerNav.headerNav}]`);
	const headerNavVisible = await headerNav.isVisible();

	const yourTime = browserPage.locator(`[data-testid=${testIds.yourTime.yourTime}]`);
	const yourTimeVisible = await yourTime.isVisible();

	const yourTimeActivityList = browserPage.locator(
		`[data-testid=${testIds.yourTime.yourTimeActivityList}]`
	);
	const yourTimeActivityListVisible = await yourTimeActivityList.isVisible();

	const yourTimeBarGraph = browserPage.locator(
		`[data-testid=${testIds.yourTime.yourTimeBarGraph}]`
	);
	const yourTimeBarGraphVisible = await yourTimeBarGraph.isVisible();

	const yourTimePieGraph = browserPage.locator(
		`[data-testid=${testIds.yourTime.yourTimePieGraph}]`
	);
	const yourTimePieGraphVisible = await yourTimePieGraph.isVisible();

	const yourTimeComposedGraph = browserPage.locator(
		`[data-testid=${testIds.yourTime.yourTimeComposedGraph}]`
	);
	const yourTimeComposedGraphVisible = await yourTimeComposedGraph.isVisible();

	const yourTimeLineGraph = browserPage.locator(
		`[data-testid=${testIds.yourTime.yourTimeLineGraph}]`
	);
	const yourTimeLineGraphVisible = await yourTimeLineGraph.isVisible();

	check(navContainerVisible, {
		'navContainer is Visible': (v) => v === true,
	});

	check(headerNavVisible, {
		'headerNav is Visible': (v) => v === true,
	});

	check(yourTimeVisible, {
		'yourTime is Visible': (v) => v === true,
	});

	check(yourTimeActivityListVisible, {
		'yourTimeActivityList is Visible': (v) => v === true,
	});

	check(yourTimeBarGraphVisible, {
		'yourTimeBarGraph is Visible': (v) => v === true,
	});

	check(yourTimePieGraphVisible, {
		'yourTimePieGraph is Visible': (v) => v === true,
	});

	check(yourTimeComposedGraphVisible, {
		'yourTimeComposedGraph is Visible': (v) => v === true,
	});

	check(yourTimeLineGraphVisible, {
		'yourTimeLineGraph is Visible': (v) => v === true,
	});

	browserPage.close();
}
