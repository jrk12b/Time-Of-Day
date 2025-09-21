import React, { useMemo, useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import useFetchHabits from '../../../hooks/useFetchHabits';
import GraphColors from '../YourTimeGraphs/GraphColors';
import { testIds } from '../../../testData/testIds';

// This component that fetches habit data, transforms it, and displays it in a Line chart using Recharts.
const DailyHabitsLineGraph = () => {
	const { habits } = useFetchHabits();

	const [activeKeys, setActiveKeys] = useState({});

	useEffect(() => {
		if (habits.length > 0 && Object.keys(activeKeys).length === 0) {
			const initial = {};
			habits.forEach((h) => {
				initial[h.name] = true;
			});
			setActiveKeys(initial);
		}
	}, [activeKeys, habits]);

	const handleLegendClick = (e) => {
		const clicked = e.dataKey;
		setActiveKeys((prev) => ({
			...prev,
			[clicked]: !prev[clicked],
		}));
	};

	// Use the imported transformation function
	const data = useMemo(() => {
		if (!habits || habits.length === 0) return [];

		const monthlyCounts = {};

		habits.forEach((habit) => {
			Object.entries(habit.progress).forEach(([dateStr, completed]) => {
				if (completed) {
					const [year, month] = dateStr.split('-').map(Number); // Parse year and month
					const date = new Date(year, month - 1); // Get the correct month
					const monthName = date.toLocaleString('default', { month: 'long' });
					const yearMonthKey = `${monthName} ${year}`; // Create a key with month and year for uniqueness

					if (!monthlyCounts[yearMonthKey]) {
						monthlyCounts[yearMonthKey] = { month: yearMonthKey };
					}

					if (!monthlyCounts[yearMonthKey][habit.name]) {
						monthlyCounts[yearMonthKey][habit.name] = 0;
					}

					monthlyCounts[yearMonthKey][habit.name] += 1;
				}
			});

			// After processing progress, set goal line for every month
			Object.keys(monthlyCounts).forEach((monthName) => {
				monthlyCounts[monthName][`${habit.name}_goal`] = habit.goal;
			});
		});

		return Object.values(monthlyCounts);
	}, [habits]);

	return (
		<div data-testid={testIds.yourTime.yourTimeLineGraph}>
			<LineChart
				width={730}
				height={250}
				data={data}
				margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="month" />
				<YAxis />
				<Tooltip />
				<Legend onClick={handleLegendClick} />
				{habits.map((habit, index) => (
					<Line
						key={habit.name}
						type="monotone"
						dataKey={habit.name}
						stroke={GraphColors[index % GraphColors.length]}
						hide={!activeKeys[habit.name]}
					/>
				))}
			</LineChart>
		</div>
	);
};

export default DailyHabitsLineGraph;
