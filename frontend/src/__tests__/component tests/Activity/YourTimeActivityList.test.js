import React from 'react';
import { render, screen } from '@testing-library/react';
import { testIds } from '../../../testIds';
import { AppContext } from '../../../context/contextActivities';
import YourTimeActivityList from '../../../components/Activity/YourTimeActivityList';

describe('YourTimeActivityList', () => {
	it('Validate YourTimeActivityList div renders', () => {
		const mockContextValue = {
			activities: [
				{
					_id: '12345',
					timestamp: Date.now(),
					activities: [
						{ _id: 'a1', name: 'mock_test1', hour: 1 },
						{ _id: 'a2', name: 'mock_test2', hour: 2 },
					],
				},
			],
		};

		const mockProps = {
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

		render(
			<AppContext.Provider value={mockContextValue}>
				<YourTimeActivityList {...mockProps} activities={mockContextValue.activities} />
			</AppContext.Provider>
		);

		const yourTimeActivityList = screen.getByTestId(testIds.yourTimeActivityList);
		expect(yourTimeActivityList).toBeInTheDocument();
		expect(yourTimeActivityList).toBeVisible();
		expect(yourTimeActivityList).toHaveTextContent('Delete Entire Document');
		expect(yourTimeActivityList).toHaveTextContent('Edit');
		expect(yourTimeActivityList).toHaveTextContent('Delete');
		expect(yourTimeActivityList).toHaveTextContent('mock_test1');
		expect(yourTimeActivityList).toHaveTextContent('mock_test2');
		expect(yourTimeActivityList).toHaveTextContent('1 hours');
		expect(yourTimeActivityList).toHaveTextContent('2 hours');
	});
});
