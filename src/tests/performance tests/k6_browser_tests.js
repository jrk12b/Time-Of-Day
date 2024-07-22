/* eslint-disable import/no-anonymous-default-export */
import { browser } from 'k6/experimental/browser';
import { check } from 'k6';

const k6_thresholds = {
	browser_http_req_duration: ['p(99)<3000'], // 99 percent of response times must be below 2000ms
	browser_http_req_failed: ['rate<0.005'], // http errors should be less than 0.5%
	checks: ['rate>0.99'], // the rate of successful checks should be higher than 99%
};

export const options = {
	scenarios: {
		ui: {
			executor: 'shared-iterations',
			options: {
				browser: {
					type: 'chromium',
				},
			},
			vus: 2,
			iterations: 4,
		},
	},
	thresholds: k6_thresholds,
};

export default async function () {
	const page = browser.newPage();

	try {
		await page.goto('http://localhost:3000/');
		check(page, {
			'Time Of Day Header': (p) => p.locator('h1').textContent() === 'Time Of Day',
		});
	} finally {
		page.close();
	}
}
