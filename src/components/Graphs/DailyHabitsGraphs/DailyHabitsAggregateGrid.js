import React, { useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import useFetchHabits from '../../../hooks/useFetchHabits';
import { testIds } from '../../../testData/testIds';
import '../../../css/YourTime.css';

const DailyHabitsAggregateGrid = () => {
	const { habits } = useFetchHabits();
	const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

	const { rowData, colDefs } = useMemo(() => {
		if (!habits || habits.length === 0) return { rowData: [], colDefs: [] };

		const months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		];

		const rowData = habits.map((habit) => {
			const monthlyCounts = {};

			Object.entries(habit.progress).forEach(([dateStr, completed]) => {
				if (!completed) return;

				const [year, month] = dateStr.split('-').map(Number);
				if (year !== currentYear) return;

				const monthIndex = month - 1;
				const monthName = months[monthIndex];

				if (!monthlyCounts[monthName]) {
					monthlyCounts[monthName] = 0;
				}
				monthlyCounts[monthName] += 1;
			});

			const row = { name: habit.name };

			months.forEach((monthName, index) => {
				const count = monthlyCounts[monthName] || 0;
				const requiredCompletions = habit.goal;

				row[`${monthName} ${currentYear}`] = count >= requiredCompletions ? 'Met' : 'Missed';
			});

			return row;
		});

		const colDefs = [
			{ headerName: 'Habit Name', field: 'name', pinned: 'left' },
			...months.map((month) => ({
				headerName: `${month} ${currentYear}`,
				field: `${month} ${currentYear}`,
				cellStyle: (params) => ({
					backgroundColor: params.value === 'Met' ? '#d4edda' : '#f8d7da',
					color: params.value === 'Met' ? '#155724' : '#721c24',
					fontWeight: 'bold',
					textAlign: 'center',
				}),
			})),
		];

		return { rowData, colDefs };
	}, [habits, currentYear]);

	return (
		<div style={{ width: '100%' }}>
			<div className="year-nav" style={{ marginBottom: '1rem', textAlign: 'center' }}>
				<button className="month-buttons" onClick={() => setCurrentYear((prev) => prev - 1)}>
					← Previous Year
				</button>
				<span className="month-label" style={{ margin: '0 1rem', fontWeight: 'bold' }}>
					{currentYear}
				</span>
				<button className="month-buttons" onClick={() => setCurrentYear((prev) => prev + 1)}>
					Next Year →
				</button>
			</div>

			<div
				className="ag-theme-alpine"
				style={{ width: '100%', overflowX: 'auto' }}
				data-testid={testIds.yourTime.yourTimeLineGraph}
			>
				<AgGridReact
					rowData={rowData}
					columnDefs={colDefs}
					domLayout="autoHeight"
					animateRows={true}
					defaultColDef={{
						resizable: true,
						sortable: true,
					}}
				/>
			</div>
		</div>
	);
};

export default DailyHabitsAggregateGrid;
