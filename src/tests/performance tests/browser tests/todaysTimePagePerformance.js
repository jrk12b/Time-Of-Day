/* eslint-disable import/no-anonymous-default-export */
import { browser } from 'k6/browser';
import { check } from 'k6';
import { testIds } from '../../../testData/testIds.js';

const k6_thresholds = {
	browser_http_req_duration: ['p(95)<20000'], // total time for the request
	browser_http_req_failed: ['rate<0.005'], // the rate of failed requests
	browser_web_vital_lcp: ['p(95)<80000'], // Measures a page's loading performance, specifically Largest Contenful Paint - the render time of the largest image or text block visible in the viewport, relative to when the user first navigated to the page.
	browser_web_vital_fid: ['p(95)<1000'], // Measures a page's interactivity, specifically First Inout Delay - measures the time from when a user first interacts with a page to the time when the browser is actually able to begin processing.
	browser_web_vital_cls: ['p(95)<0.6'], // Measures a page's visual stability, specifically Cumulative Layout Shift - a measure of the largest burst of layout shift scores for every unexpected layout shift that occurs during the entire lifecycle of a page
	browser_web_vital_ttfb: ['p(95)<20000'], // Measures the time it takes between the browser request and the start of the response from a server
	browser_web_vital_fcp: ['p(95)<80000'], // Measures the time it takes for the browser to render the first DOM element on the page, whether that's a text, image or header.
	checks: ['rate>0.99'], // the rate of successful checks should be higher than 99%
};

export const options = {
	scenarios: {
		ui: {
			executor: 'constant-vus',
			vus: 5,
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
	const todaysTimePage = 'http://localhost:3000/TodaysTime';
	await browserPage.goto(todaysTimePage);

	const navContainer = browserPage.locator(`[data-testid=${testIds.headerNav.navContainer}]`);
	const navContainerVisible = await navContainer.isVisible();

	const headerNav = browserPage.locator(`[data-testid=${testIds.headerNav.headerNav}]`);
	const headerNavVisible = await headerNav.isVisible();

	const todaysTime = browserPage.locator(`[data-testid=${testIds.todaysTime.todaysTime}]`);
	const todaysTimeVisible = await todaysTime.isVisible();

	const timeBudget = browserPage.locator(`[data-testid=${testIds.todaysTime.timeBudget}]`);
	const timeBudgetVisible = await timeBudget.isVisible();

	const remainingHours = browserPage.locator(`[data-testid=${testIds.todaysTime.remainingHours}]`);
	const remainingHoursVisible = await remainingHours.isVisible();

	const totalHours = browserPage.locator(`[data-testid=${testIds.todaysTime.totalHours}]`);
	const totalHoursVisible = await totalHours.isVisible();

	const todaysTimeGraph = browserPage.locator(
		`[data-testid=${testIds.todaysTime.todaysTimeGraph}]`
	);
	const todaysTimeGraphVisible = await todaysTimeGraph.isVisible();

	const addActivityFormHeader = browserPage.locator(
		`[data-testid=${testIds.todaysTime.addActivityForm.addActivityFormHeader}]`
	);
	const addActivityFormHeaderVisible = await addActivityFormHeader.isVisible();

	const activitySubmit = browserPage.locator(`[data-testid=${testIds.todaysTime.activitySubmit}]`);
	const activitySubmitVisible = await activitySubmit.isVisible();

	check(navContainerVisible, {
		'navContainer is Visible': (v) => v === true,
	});

	check(headerNavVisible, {
		'headerNav is Visible': (v) => v === true,
	});

	check(todaysTimeVisible, {
		'todaysTime is Visible': (v) => v === true,
	});

	check(timeBudgetVisible, {
		'timeBudget is Visible': (v) => v === true,
	});

	check(remainingHoursVisible, {
		'remainingHours is Visible': (v) => v === true,
	});

	check(totalHoursVisible, {
		'totalHours is Visible': (v) => v === true,
	});

	check(todaysTimeGraphVisible, {
		'todaysTimeGraph is Visible': (v) => v === true,
	});

	check(addActivityFormHeaderVisible, {
		'addActivityFormHeader is Visible': (v) => v === true,
	});

	check(activitySubmitVisible, {
		'activitySubmit is Visible': (v) => v === true,
	});

	browserPage.close();
}
