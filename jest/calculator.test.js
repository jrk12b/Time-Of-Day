// calculator.test.js
const calculator = require('./calculator');

describe('Calculator: Addition Tests', () => {
	test('adding 1 + 2 should return 3', () => {
		expect(calculator.sum(1, 2)).toBe(3);
	});

	test('adding 0 + 1 should return 1', () => {
		expect(calculator.sum(0, 1)).toBe(1);
	});

	test('adding -3 + 1 should return -2', () => {
		expect(calculator.sum(-3, 1)).toBe(-2);
	});

	test('adding 10 + 10 should return 20', () => {
		expect(calculator.sum(10, 10)).toBe(20);
	});

	test('adding 100 + 100 should return 200', () => {
		expect(calculator.sum(100, 100)).toBe(200);
	});

	test('adding 1000 + 1000 should return 2000', () => {
		expect(calculator.sum(1000, 1000)).toBe(2000);
	});

	test('adding 2.1 + 1.1 should return 3.2', () => {
		expect(calculator.sum(2.1, 1.1)).toBe(3.2);
	});
});

describe('Calculator: Subtraction Tests', () => {
	test('subtracting 2 - 1 should return 1', () => {
		expect(calculator.diff(2, 1)).toBe(1);
	});

	test('subtracting 0 - 1 should return 1', () => {
		expect(calculator.diff(0, -1)).toBe(1);
	});

	test('subtracting 2.5 - 2.0 should return 0.5', () => {
		expect(calculator.diff(2.5, 2.0)).toBe(0.5);
	});

	test('subtracting -3 - 1 should return -2', () => {
		expect(calculator.diff(-3, -1)).toBe(-2);
	});

	test('subtracting -4 - 5 should return 1', () => {
		expect(calculator.diff(-4, 5)).toBe(-9);
	});

	test('subtracting 6 - 7 should return -1', () => {
		expect(calculator.diff(6, 7)).toBe(-1);
	});

	test('subtracting 10 - 10 should return 0', () => {
		expect(calculator.diff(10, 10)).toBe(0);
	});

	test('subtracting 0 - 0 should return 0', () => {
		expect(calculator.diff(0, 0)).toBe(0);
	});

	test('subtracting 100 - 990 should return 10', () => {
		expect(calculator.diff(100, 90)).toBe(10);
	});
});

describe('Calculator: Multiplication tests', () => {
	test('multiplying 2 * 2 should return 4', () => {
		expect(calculator.product(2, 2)).toBe(4);
	});

	test('multiplying 0 * 2 should return 0', () => {
		expect(calculator.product(0, 2)).toBe(0);
	});

	test('multiplying 1 * 2 should return 2', () => {
		expect(calculator.product(1, 2)).toBe(2);
	});

	test('multiplying -2 * 2 should return -4', () => {
		expect(calculator.product(-2, 2)).toBe(-4);
	});

	test('multiplying -2 * -2 should return 4', () => {
		expect(calculator.product(-2, -2)).toBe(4);
	});

	test('multiplying 10 * 10 should return 100', () => {
		expect(calculator.product(10, 10)).toBe(100);
	});

	test('multiplying 2.5 * 2.5 should return 6.25', () => {
		expect(calculator.product(2.5, 2.5)).toBe(6.25);
	});
});

describe('Calculator: Division tests', () => {
	test('dividing 4 / 2 should return 2', () => {
		expect(calculator.divide(4, 2)).toBe(2);
	});

	test('dividing -4 / 2 should return -2', () => {
		expect(calculator.divide(-4, 2)).toBe(-2);
	});

	test('dividing 6 / 4 should return 1.5', () => {
		expect(calculator.divide(6, 4)).toBe(1.5);
	});

	test('dividing 5.5 / 2.2 should return 2.5', () => {
		expect(calculator.divide(5.5, 2.2)).toBe(2.5);
	});

	test('dividing 100 / 50 should return 2', () => {
		expect(calculator.divide(100, 50)).toBe(2);
	});
});
