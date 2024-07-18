import { testIds } from '../../src/testData/testIds';

// mobile device sizes tested
const devices = [
	'ipad-2',
	'ipad-mini',
	'iphone-3',
	'iphone-4',
	'iphone-5',
	'iphone-6',
	'iphone-6+',
	'iphone-7',
	'iphone-8',
	'iphone-x',
	'iphone-xr',
	'iphone-se2',
	'samsung-note9',
	'samsung-s10',
];

describe('Validating mobile responsiveness', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	devices.forEach((device) => {
		it(`Validating Home Page mobile responsiveness on device: ${device}`, () => {
			cy.viewport(device);
			cy.getByTestId(testIds.app).should('be.visible');
			cy.getByTestId(testIds.headerNav.timeOfDayNavLink)
				.should('have.attr', 'href')
				.and('include', '/');
			cy.validateHeaderNavMobile();
		});

		it(`Validating TodaysTime Page mobile responsiveness on device: ${device}`, () => {
			cy.visit('/TodaysTime');
			cy.viewport(device);
			cy.getByTestId(testIds.app).should('be.visible');
			cy.getByTestId(testIds.headerNav.timeOfDayNavLink)
				.should('have.attr', 'href')
				.and('include', '/');
			cy.validateHeaderNavMobile();
		});

		it(`Validating YourTime Page mobile responsiveness on device: ${device}`, () => {
			cy.visit('/YourTime');
			cy.viewport(device);
			cy.getByTestId(testIds.app).should('be.visible');
			cy.getByTestId(testIds.headerNav.timeOfDayNavLink)
				.should('have.attr', 'href')
				.and('include', '/');
			cy.validateHeaderNavMobile();
		});
	});
});
