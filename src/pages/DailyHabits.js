import React, { useState, useEffect } from 'react';
import '../css/YourTime.css';
import { testIds } from '../testData/testIds';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useMemo } from 'react';
import { fetchHabits, updateHabitOrder } from '../context/contextHabits';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import DailyHabitsBarGraph from '../components/Graphs/DailyHabitsGraphs/DailyHabitsBarGraph';
import DailyHabitsLineGraph from '../components/Graphs/DailyHabitsGraphs/DailyHabitsLineGraph';
import DailyHabitsComposedGraph from '../components/Graphs/DailyHabitsGraphs/DailyHabitsComposedGraph';
import DailyHabitsAggregateGrid from '../components/Graphs/DailyHabitsGraphs/DailyHabitsAggregateGrid';
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
	const today = new Date();
	const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // 0-indexed
	const [currentYear, setCurrentYear] = useState(today.getFullYear());

	function getDaysOfCurrentMonth(year, month) {
		const days = [];
		const totalDays = new Date(year, month + 1, 0).getDate(); // month is 0-indexed

		for (let day = 1; day <= totalDays; day++) {
			days.push(`${month + 1}/${day}`); // Format: MM/DD
		}

		return days;
	}

	const days = useMemo(
		() => getDaysOfCurrentMonth(currentYear, currentMonth),
		[currentYear, currentMonth]
	);

	const countTrueValues = (obj) => {
		let count = 0;
		for (const key in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, key) && obj[key] === true) {
				count++;
			}
		}
		return count;
	};

	const handleRowDragEnd = async (event) => {
		const newData = [];
		const api = event.api;
		api.forEachNodeAfterFilterAndSort((node, index) => {
			newData.push({ id: node.data.id, order: index });
		});

		try {
			await updateHabitOrder(newData);
		} catch (err) {
			console.error('Failed to update habit order:', err);
		}
	};

	useEffect(() => {
		const loadHabits = async () => {
			try {
				const habitsFromApi = await fetchHabits();
				const processedHabits = habitsFromApi
					.sort((a, b) => a.order - b.order)
					.map((habit) => {
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

			const dailyData = {};
			days.forEach((day) => {
				dailyData[day] = false;
			});

			setRowData([
				...rowData,
				{
					id: savedHabit._id,
					habit: savedHabit.name,
					goal: savedHabit.goal,
					...dailyData,
					achieved: 0,
				},
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
						className="styled-checkbox"
						name={`checkbox-${params.node.rowIndex}-${field}`}
						checked={params.value}
						onChange={() => handleCheckboxChange(params.node.rowIndex, field)}
					/>
				);
			},
		});

		const cols = [];

		cols.unshift({
			headerName: '',
			field: 'drag',
			rowDrag: true,
			width: 40,
			sortable: false,
			suppressMenu: true,
			cellRenderer: 'agRowDragCellRenderer',
		});

		cols.push({ field: 'habit', editable: true, width: 200 });

		cols.push({
			field: 'goal',
			editable: true,
		});

		cols.push({
			field: 'achieved',
			cellStyle: (params) => {
				const achieved = params.value;
				const goal = params.data?.goal;

				if (achieved >= goal) {
					return { backgroundColor: '#d4edda' }; // light green
				} else if (goal - achieved <= 5) {
					return { backgroundColor: '#fff3cd' }; // light yellow
				} else {
					return { backgroundColor: '#f8d7da' }; // light red
				}
			},
		});

		for (let i = 0; i < days.length; i++) {
			cols.push(createCheckboxCol(days[i]));
		}

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
			<br></br>
			<div
				className="ag-theme-alpine"
				style={{ height: 500, width: '100%', marginBottom: '18rem' }}
			>
				<div className="top-bar">
					<form
						name="dailyHabitsForm"
						id="new-habit-form"
						onSubmit={handleAddHabit}
						className="habit-form"
					>
						<input
							type="text"
							id="new-habit-input"
							name="NewHabitFormInput"
							value={newHabit}
							onChange={(e) => setNewHabit(e.target.value)}
							placeholder="New habit name"
						/>
						<button type="submit">Add Habit</button>
					</form>
					<div className="month-nav">
						<button
							className="month-buttons"
							onClick={() => {
								setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
								if (currentMonth === 0) setCurrentYear((prev) => prev - 1);
							}}
						>
							← Previous
						</button>

						<span className="month-label">
							{new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })}{' '}
							{currentYear}
						</span>

						<button
							className="month-buttons"
							onClick={() => {
								setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
								if (currentMonth === 11) setCurrentYear((prev) => prev + 1);
							}}
						>
							Next →
						</button>
					</div>
				</div>
				<AgGridReact
					rowData={rowData}
					columnDefs={colDefs}
					domLayout="autoHeight"
					rowDragManaged={true}
					onRowDragEnd={handleRowDragEnd}
					animateRows={true}
					defaultColDef={{
						width: 100,
						editable: true,
						resizable: true,
					}}
					onCellValueChanged={(params) => {
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
			<div className="graph">
				<DailyHabitsAggregateGrid />
			</div>
			<div className="graph">
				<DailyHabitsBarGraph />
			</div>
			<div className="graph">
				<DailyHabitsLineGraph />
			</div>
			<div className="graph">
				<DailyHabitsComposedGraph />
			</div>
		</div>
	);
};

export default DailyHabitsPage;
