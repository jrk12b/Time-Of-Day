import {
	transformAndAggregateData,
	aggregateHoursForActivities,
} from '../../components/Graphs/YourTimeGraphs/DataTransform';
import moment from 'moment';

// Mock the moment module to control the current date
jest.mock('moment', () => {
	const actualMoment = jest.requireActual('moment');
	return (timestamp) => actualMoment(timestamp);
});

describe('DataTransform', () => {
	describe('transformAndAggregateData', () => {
		it('should transform and aggregate activity data correctly', () => {
			const activities = [
				{
					timestamp: moment('2023-07-01').valueOf(),
					activities: [
						{ name: 'Coding', hour: 2 },
						{ name: 'Reading', hour: 1 },
					],
				},
				{
					timestamp: moment('2023-07-01').valueOf(),
					activities: [
						{ name: 'Coding', hour: 1 },
						{ name: 'Exercise', hour: 1 },
					],
				},
				{
					timestamp: moment('2023-07-02').valueOf(),
					activities: [
						{ name: 'Coding', hour: 3 },
						{ name: 'Reading', hour: 2 },
					],
				},
			];

			const expectedOutput = [
				{ date: '2023-07-01', Coding: 3, Reading: 1, Exercise: 1 },
				{ date: '2023-07-02', Coding: 3, Reading: 2, Exercise: 0 },
			];

			const result = transformAndAggregateData(activities);
			expect(result).toEqual(expectedOutput);
		});
	});

	describe('aggregateHoursForActivities', () => {
		it('should aggregate total hours for each activity correctly', () => {
			const activities = [
				{
					activities: [
						{ name: 'Coding', hour: 2 },
						{ name: 'Reading', hour: 1 },
					],
				},
				{
					activities: [
						{ name: 'Coding', hour: 1 },
						{ name: 'Exercise', hour: 1 },
					],
				},
				{
					activities: [
						{ name: 'Coding', hour: 3 },
						{ name: 'Reading', hour: 2 },
					],
				},
			];

			const expectedOutput = [
				{ name: 'Coding', value: 6 },
				{ name: 'Reading', value: 3 },
				{ name: 'Exercise', value: 1 },
			];

			const result = aggregateHoursForActivities(activities);
			expect(result).toEqual(expectedOutput);
		});
	});
});
