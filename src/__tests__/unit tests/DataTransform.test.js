import {
	transformAndAggregateData,
	aggregateHoursForActivities,
} from '../../components/Graphs/YourTimeGraphs/DataTransform';
import {
	mockDataTransform,
	mockDataTransformOutput,
	mockDataTransformOutputHours,
} from '../../testData/mockData';

// Mock the moment module to control the current date
jest.mock('moment', () => {
	const actualMoment = jest.requireActual('moment');
	return (timestamp) => actualMoment(timestamp);
});

describe('test DataTransform', () => {
	describe('transformAndAggregateData', () => {
		it('should transform and aggregate activity data correctly', () => {
			const result = transformAndAggregateData(mockDataTransform);
			expect(result).toEqual(mockDataTransformOutput);
		});
	});

	describe('aggregateHoursForActivities', () => {
		it('should aggregate total hours for each activity correctly', () => {
			const result = aggregateHoursForActivities(mockDataTransform);
			expect(result).toEqual(mockDataTransformOutputHours);
		});
	});
});
