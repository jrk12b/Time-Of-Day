import React, { useState } from 'react';
import '../css/YourTime.css';
import { testIds } from '../testData/testIds';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useMemo } from 'react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { addHabit } from '../context/contextHabits';
ModuleRegistry.registerModules([AllCommunityModule]);

const DailyHabitsPage = () => {
	const [newHabit, setNewHabit] = useState('');
	function countTrueValues(obj) {
		let count = 0;
		for (const key in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, key) && obj[key] === true) {
				count++;
			}
		}
		return count;
	}

	function getDaysOfCurrentMonth() {
		const now = new Date();
		const year = now.getFullYear();
		const month = now.getMonth();

		const days = [];
		const totalDays = new Date(year, month + 1, 0).getDate();

		for (let day = 1; day <= totalDays; day++) {
			days.push(`${month + 1}/${day}`);
		}

		return days;
	}

	const baseData = [
		{ habit: 'Reading', goal: '21' },
		{ habit: 'Running', goal: '23' },
		{ habit: 'Guitar' },
	];

	const days = getDaysOfCurrentMonth();

	const initialData = baseData.map((item) => {
		const dailyData = {};

		// Fill each day of the current month with default value (false)
		days.forEach((day) => {
			dailyData[day] = false;
		});

		// Combine with habit and goal, then compute achieved
		const fullItem = {
			...item,
			...dailyData,
		};
		fullItem.achieved = countTrueValues(fullItem);
		return fullItem;
	});

	const [rowData, setRowData] = useState(initialData);

	const handleAddHabit = async (e) => {
		e.preventDefault();
		if (!newHabit.trim()) return;

		try {
			const savedHabit = await addHabit(newHabit, 20); // optional: add goal input later

			// Add to grid or local state as needed
			const dailyData = {};
			days.forEach((day) => {
				dailyData[day] = false;
			});

			setRowData([
				...rowData,
				{ habit: savedHabit.name, goal: savedHabit.goal, ...dailyData, achieved: 0 },
			]);
			setNewHabit('');
		} catch (err) {
			console.error('Failed to add habit:', err.message);
		}
	};

	const colDefs = useMemo(() => {
		const handleCheckboxChange = (rowIndex, day) => {
			const newData = [...rowData];
			newData[rowIndex][day] = !newData[rowIndex][day];
			setRowData(newData);
		};

		const createCheckboxCol = (field) => ({
			field,
			cellRenderer: (params) => {
				return (
					<input
						type="checkbox"
						checked={params.value}
						onChange={() => handleCheckboxChange(params.node.rowIndex, field)}
					/>
				);
			},
		});

		const cols = [];

		cols.push({ field: 'habit', editable: true });

		for (let i = 0; i < days.length; i++) {
			cols.push(createCheckboxCol(days[i]));
		}

		cols.push({ field: 'goal', editable: true });
		cols.push({ field: 'achieved' });

		return cols;
	}, [days, rowData]);

	return (
		<div data-testid={testIds.yourTime.yourTime}>
			<h1>Daily Habits</h1>
			<br />
			<form onSubmit={handleAddHabit} style={{ marginTop: '20px' }}>
				<input
					type="text"
					value={newHabit}
					onChange={(e) => setNewHabit(e.target.value)}
					placeholder="New habit name"
					style={{ marginRight: '10px', padding: '5px' }}
				/>
				<button type="submit" style={{ padding: '5px 10px' }}>
					Add Habit
				</button>
			</form>
			<br></br>
			<div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
				<AgGridReact
					rowData={rowData}
					columnDefs={colDefs}
					domLayout="autoHeight"
					defaultColDef={{ width: 100 }}
				/>
			</div>
		</div>
	);
};

export default DailyHabitsPage;
