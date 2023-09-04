////////////////////////////////////////////////////////////////////////////////////////////
// Stress tests simulate extreme load, 5x, 8x, or 10x normal production load
// This test simulates 90 users for 2.5m
// For local debugging, example command:
// k6 run ./stress-test.js --summary-export="Test.json" --http-debug=full
////////////////////////////////////////////////////////////////////////////////////////////
import { k6_test_requests, k6_thresholds } from '../k6_test_requests.js';

export const options = {
	stages: [
		{ duration: '1m', target: 90 }, // simulate ramp-up of traffic from 1 to 90 virtual users over 1 minute.
		{ duration: '1m', target: 90 }, // stay at 90 virtual users for 1 minute
		{ duration: '30s', target: 0 }, // ramp-down to 0 virtual users
	],
	thresholds: k6_thresholds,
};

export default function () {
	k6_test_requests();
}
