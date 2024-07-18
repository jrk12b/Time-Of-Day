const { defineConfig } = require('cypress');

module.exports = defineConfig({
	e2e: {
		experimentalWebKitSupport: true,
		baseUrl: 'http://localhost:3000',
		viewportWidth: 1280,
		viewportHeight: 720,
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
	},
});
