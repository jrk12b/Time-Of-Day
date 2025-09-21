import React, { useMemo, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import useFetchHabits from '../../../hooks/useFetchHabits';
import GraphColors from '../YourTimeGraphs/GraphColors';
import { testIds } from '../../../testData/testIds';

const DailyHabitsBarGraph = () => {
	const { habits } = useFetchHabits();
	const [activeKeys, setActiveKeys] = useState({});

	const data = useMemo(() => {
		if (!habits || habits.length === 0) return [];

		const monthlyCounts = {};
		habits.forEach((habit) => {
			Object.entries(habit.progress).forEach(([dateStr, completed]) => {
				if (completed) {
					const [year, month] = dateStr.split('-').map(Number);
					const date = new Date(year, month - 1);
					const monthName = date.toLocaleString('default', { month: 'long' });
					const yearMonthKey = `${monthName} ${year}`;
					if (!monthlyCounts[yearMonthKey]) {
						monthlyCounts[yearMonthKey] = { month: yearMonthKey };
					}
					if (!monthlyCounts[yearMonthKey][habit.name]) {
						monthlyCounts[yearMonthKey][habit.name] = 0;
					}
					monthlyCounts[yearMonthKey][habit.name] += 1;
				}
			});
		});
		return Object.values(monthlyCounts);
	}, [habits]);

	// Initialize activeKeys on habits load
	useMemo(() => {
		if (habits.length > 0 && Object.keys(activeKeys).length === 0) {
			const initialKeys = {};
			habits.forEach((h) => {
				initialKeys[h.name] = true;
			});
			setActiveKeys(initialKeys);
		}
	}, [activeKeys, habits]);

	const handleLegendClick = (e) => {
		const clicked = e.dataKey;
		setActiveKeys((prev) => ({
			...prev,
			[clicked]: !prev[clicked],
		}));
	};

	return (
		<div data-testid={testIds.yourTime.yourTimeBarGraph}>
			<BarChart width={1000} height={400} data={data}>
				<CartesianGrid stroke="#ccc" />
				<XAxis dataKey="month" />
				<YAxis />
				<Tooltip />
				<Legend onClick={handleLegendClick} />
				{habits.map((habit, index) => (
					<Bar
						key={habit.name}
						dataKey={habit.name}
						fill={GraphColors[index % GraphColors.length]}
						hide={!activeKeys[habit.name]}
					/>
				))}
			</BarChart>
		</div>
	);
};

export default DailyHabitsBarGraph;
