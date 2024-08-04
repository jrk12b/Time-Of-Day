describe('Run Google Lighthouse Tests', () => {
	// https://developer.chrome.com/docs/lighthouse/overview
	it('Performance: Home Page Google Lighthouse Metrics', () => {
		cy.visit('/');
		const customThresholds = {
			performance: 70,
			accessibility: 90,
			seo: 90,
			interactive: 3000,
			pwa: 65,
			'first-contentful-paint': 3000, // FCP measures how long it takes the browser to render the first piece of DOM content after a user navigates to your page
			'largest-contentful-paint': 5000, // LCP measures when the largest content element in the viewport is rendered to the screen
			'cumulative-layout-shift': 0.1, // Unexpected movement of page content usually happens when resources load asynchronously or DOM elements are dynamically added to the page before existing content
			'total-blocking-time': 200, // TBT measures the total amount of time that a page is blocked from responding to user input, such as mouse clicks, screen taps, or keyboard presses
		};

		const desktopConfig = {
			formFactor: 'desktop',
			screenEmulation: { disabled: true },
		};

		cy.lighthouse(customThresholds, desktopConfig);
	});

	it('Performance: Todays Time Page Google Lighthouse Metrics', () => {
		cy.visit('/TodaysTime');
		const customThresholds = {
			performance: 50,
			accessibility: 90,
			seo: 90,
			interactive: 3000,
			pwa: 65,
			'first-contentful-paint': 3000, // FCP measures how long it takes the browser to render the first piece of DOM content after a user navigates to your page
			'largest-contentful-paint': 5000, // LCP measures when the largest content element in the viewport is rendered to the screen
			'cumulative-layout-shift': 0.1, // Unexpected movement of page content usually happens when resources load asynchronously or DOM elements are dynamically added to the page before existing content
			'total-blocking-time': 500, // TBT measures the total amount of time that a page is blocked from responding to user input, such as mouse clicks, screen taps, or keyboard presses
		};

		const desktopConfig = {
			formFactor: 'desktop',
			screenEmulation: { disabled: true },
		};

		cy.lighthouse(customThresholds, desktopConfig);
	});

	it('Performance: Your Time Page Google Lighthouse Metrics', () => {
		cy.visit('/YourTime');
		const customThresholds = {
			performance: 15,
			accessibility: 90,
			seo: 90,
			interactive: 5000,
			pwa: 65,
			'first-contentful-paint': 4500, // FCP measures how long it takes the browser to render the first piece of DOM content after a user navigates to your page
			'largest-contentful-paint': 5000, // LCP measures when the largest content element in the viewport is rendered to the screen
			'cumulative-layout-shift': 0.7, // Unexpected movement of page content usually happens when resources load asynchronously or DOM elements are dynamically added to the page before existing content
			'total-blocking-time': 2000, // TBT measures the total amount of time that a page is blocked from responding to user input, such as mouse clicks, screen taps, or keyboard presses
		};

		const desktopConfig = {
			formFactor: 'desktop',
			screenEmulation: { disabled: true },
		};

		cy.lighthouse(customThresholds, desktopConfig);
	});
});
