import moment from 'moment';
import { AppContext } from '../context/contextActivities';
import React, { useContext } from 'react';

export const mockActivity = {
	id: 1,
	name: 'mock_test1',
	hour: 1,
};

export const mockActivities = {
	activities: [
		{ key: '1', id: '1', name: 'mock_test1', hour: 1 },
		{ key: '2', id: '2', name: 'mock_test2', hour: 2 },
	],
};

export const mockActivitiesHours = {
	hours: 24,
	activities: [
		{ name: 'mock_test1', hour: 2 },
		{ name: 'mock_test2', hour: 1 },
	],
};

export const mockActivitiesNoKey = [
	{ id: 1, name: 'mock_test1', hours: 1 },
	{ id: 2, name: 'mock_test2', hours: 2 },
];

export const mockActivitiesEmpty = [];

export const mockHours = {
	hours: 24,
};

export const mockActivitiesTimestamp = {
	activities: [
		{
			_id: '1',
			timestamp: Date.now(),
			activities: [
				{ _id: '1', name: 'mock_test1', hour: 1 },
				{ _id: '2', name: 'mock_test2', hour: 2 },
			],
		},
	],
};

export const mockYourActivityListProps = {
	editActivity: null,
	editName: '',
	editHour: '',
	handleEditClick: jest.fn(),
	handleUpdate: jest.fn(),
	handleDelete: jest.fn(),
	handleDeleteDocument: jest.fn(),
	setEditActivity: jest.fn(),
	setEditName: jest.fn(),
	setEditHour: jest.fn(),
};

export const mockDataTransform = [
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

export const mockDataTransformOutput = [
	{ date: '2023-07-01', Coding: 3, Reading: 1, Exercise: 1 },
	{ date: '2023-07-02', Coding: 3, Reading: 2, Exercise: 0 },
];

export const mockDataTransformOutputHours = [
	{ name: 'Coding', value: 6 },
	{ name: 'Reading', value: 3 },
	{ name: 'Exercise', value: 1 },
];

export const mockFetchActivityNames = [['mock_test1', 'mock_test2']];

export const TestComponent = () => {
	const { hours, activities, dispatch } = useContext(AppContext);
	return (
		<div>
			<span data-testid="hours">{hours}</span>
			<span data-testid="activities">{activities.map((activity) => activity.name).join(', ')}</span>
			<button
				data-testid="dispatch-add-activity"
				onClick={() => dispatch({ type: 'ADD_ACTIVITY', payload: { id: 1, name: 'New Activity' } })}
			>
				Add Activity
			</button>
			<button
				data-testid="dispatch-delete-activity"
				onClick={() => dispatch({ type: 'DELETE_ACTIVITY', payload: 1 })}
			>
				Delete Activity
			</button>
		</div>
	);
};
