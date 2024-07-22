const k6_thresholds = {
	browser_http_req_duration: ['p(99)<3000'], // 99 percent of response times must be below 2000ms
	browser_http_req_failed: ['rate<0.005'], // http errors should be less than 0.5%
	browser_web_vital_lcp: ['p(95)<700'], // Measures a page's loading performance, specifically Largest Contenful Paint - the render time of the largest image or text block visible in the viewport, relative to when the user first navigated to the page.
	browser_web_vital_fid: ['p(95)<500'], // Measures a page's interactivity, specifically First Inout Delay - measures the time from when a user first interacts with a page to the time when the browser is actually able to begin processing.
	browser_web_vital_cls: ['p(95)<0.6'], // Measures a page's visual stability, specifically Cumulative Layout Shift - a measure of the largest burst of layout shift scores for every unexpected layout shift that occurs during the entire lifecycle of a page
	browser_web_vital_ttfb: ['p(95)<6'], // Measures the time it takes between the browser request and the start of the response from a server
	browser_web_vital_fcp: ['p(95)<500'], // Measures the time it takes for the browser to render the first DOM element on the page, whether that's a text, image or header.
	checks: ['rate>0.99'], // the rate of successful checks should be higher than 99%
};

export const k6_options = {
	scenarios: {
		ui: {
			executor: 'shared-iterations',
			options: {
				browser: {
					type: 'chromium',
				},
			},
			vus: 1,
			iterations: 2,
		},
	},
	thresholds: k6_thresholds,
};