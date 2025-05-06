import React, { useMemo } from 'react';
// import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import useFetchHabits from '../../../hooks/useFetchHabits';
import GraphColors from '../YourTimeGraphs/GraphColors';
import { testIds } from '../../../testData/testIds';

// This component that fetches habit data, transforms it, and displays it in a bar chart using Recharts.
const DailyHabitsBarGraph = () => {
	const { habits } = useFetchHabits();

	// Use the imported transformation function
	const data = useMemo(() => {
		if (!habits || habits.length === 0) return [];

		const monthlyCounts = {};

		habits.forEach((habit) => {
			Object.entries(habit.progress).forEach(([dateStr, completed]) => {
				if (completed) {
					const [month] = dateStr.split('/');
					const monthName = new Date(`2025-${month}-01`).toLocaleString('default', {
						month: 'long',
					});

					if (!monthlyCounts[monthName]) {
						monthlyCounts[monthName] = { month: monthName };
					}

					if (!monthlyCounts[monthName][habit.name]) {
						monthlyCounts[monthName][habit.name] = 0;
					}

					monthlyCounts[monthName][habit.name] += 1;
				}
			});
		});

		return Object.values(monthlyCounts);
	}, [habits]);

	return (
		<div data-testid={testIds.yourTime.yourTimeBarGraph}>
			<BarChart width={1000} height={400} data={data}>
				<CartesianGrid stroke="#ccc" />
				<XAxis dataKey="month" />
				<YAxis />
				<Tooltip />
				<Legend />
				{habits.map((habit, index) => (
					<Bar
						key={habit.name}
						dataKey={habit.name}
						fill={GraphColors[index % GraphColors.length]}
					/>
				))}
			</BarChart>
		</div>
	);
};

export default DailyHabitsBarGraph;
