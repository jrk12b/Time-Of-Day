import React, { useState, useEffect } from 'react';
import '../css/YourTime.css';
import { testIds } from '../testData/testIds';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useMemo } from 'react';
import { fetchHabits } from '../context/contextHabits';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import {
	addHabit,
	updateHabitGoal,
	updateHabitName,
	updateHabitProgress,
	deleteHabit,
} from '../context/contextHabits';

ModuleRegistry.registerModules([AllCommunityModule]);

const DailyHabitsPage = () => {
	const [newHabit, setNewHabit] = useState('');
	const [rowData, setRowData] = useState([]);

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

	const days = useMemo(() => getDaysOfCurrentMonth(), []);

	const countTrueValues = (obj) => {
		let count = 0;
		for (const key in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, key) && obj[key] === true) {
				count++;
			}
		}
		return count;
	};

	useEffect(() => {
		const loadHabits = async () => {
			try {
				const habitsFromApi = await fetchHabits();
				const processedHabits = habitsFromApi.map((habit) => {
					const dailyData = {};
					days.forEach((day) => {
						dailyData[day] = habit.progress?.[day] || false;
					});
					const fullHabit = {
						id: habit._id,
						habit: habit.name,
						goal: habit.goal || 20,
						...dailyData,
					};
					fullHabit.achieved = countTrueValues(fullHabit);
					return fullHabit;
				});
				setRowData(processedHabits);
			} catch (err) {
				console.error('Failed to load habits:', err);
			}
		};
		loadHabits();
	}, [days]);

	const handleAddHabit = async (e) => {
		e.preventDefault();
		if (!newHabit.trim()) return;

		try {
			const savedHabit = await addHabit(newHabit, 20);

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
		const handleCheckboxChange = async (rowIndex, day) => {
			const newData = [...rowData];
			const habit = newData[rowIndex];
			const newValue = !habit[day];
			habit[day] = newValue;
			habit.achieved = countTrueValues(habit);
			setRowData(newData);

			try {
				await updateHabitProgress(habit.id, day, newValue);
			} catch (err) {
				console.error('Failed to update habit progress:', err);
			}
		};

		const createCheckboxCol = (field) => ({
			field,
			cellRenderer: (params) => {
				return (
					<input
						type="checkbox"
						name={`checkbox-${params.node.rowIndex}-${field}`}
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

		cols.push({
			field: 'goal',
			editable: true,
		});

		cols.push({ field: 'achieved' });

		cols.push({
			headerName: '',
			field: 'delete',
			width: 80,
			cellRenderer: (params) => {
				return (
					<button
						style={{
							padding: '4px 8px',
							backgroundColor: 'red',
							color: 'white',
							border: 'none',
							borderRadius: '4px',
						}}
						onClick={async () => {
							try {
								await deleteHabit(params.data.id);
								setRowData((prevData) => prevData.filter((habit) => habit.id !== params.data.id));
							} catch (err) {
								console.error('Failed to delete habit:', err);
							}
						}}
					>
						Delete
					</button>
				);
			},
		});

		return cols;
	}, [days, rowData]);

	return (
		<div data-testid={testIds.yourTime.yourTime}>
			<h1>Daily Habits</h1>
			<br />
			<form
				name="dailyHabitsForm"
				id="new-habit-form"
				onSubmit={handleAddHabit}
				style={{ marginTop: '20px' }}
			>
				<input
					type="text"
					id="new-habit-input"
					name="NewHabitFormInput"
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
					defaultColDef={{
						width: 100,
						editable: true,
					}}
					onCellValueChanged={(params) => {
						console.log('Cell changed:', params);

						const habitId = params.data.id;

						if (params.colDef.field === 'goal') {
							const newGoal = params.newValue;
							updateHabitGoal(habitId, newGoal).catch((err) =>
								console.error('Failed to update goal:', err)
							);
						} else if (params.colDef.field === 'habit') {
							const newName = params.newValue;
							updateHabitName(habitId, newName).catch((err) =>
								console.error('Failed to update habit name:', err)
							);
						}
					}}
				/>
			</div>
		</div>
	);
};

export default DailyHabitsPage;
