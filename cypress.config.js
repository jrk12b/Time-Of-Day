const { defineConfig } = require('cypress');
const { lighthouse, prepareAudit } = require('@cypress-audit/lighthouse');

module.exports = defineConfig({
	e2e: {
		experimentalWebKitSupport: true,
		baseUrl: 'http://localhost:3000',
		viewportWidth: 1280,
		viewportHeight: 720,
		setupNodeEvents(on, config) {
			on('before:browser:launch', (browser = {}, launchOptions) => {
				prepareAudit(launchOptions);
			});
			on('task', {
				lighthouse: lighthouse(),
			});
		},
	},
});
