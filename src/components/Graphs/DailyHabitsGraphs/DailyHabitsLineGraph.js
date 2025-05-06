import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import useFetchHabits from '../../../hooks/useFetchHabits';
import GraphColors from '../YourTimeGraphs/GraphColors';
import { testIds } from '../../../testData/testIds';

// This component that fetches habit data, transforms it, and displays it in a Line chart using Recharts.
const DailyHabitsLineGraph = () => {
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
				<Legend />
				{habits.map((habit, index) => (
					<Line
						key={habit.name}
						type="monotone"
						dataKey={habit.name}
						stroke={GraphColors[index % GraphColors.length]}
					/>
				))}
			</LineChart>
		</div>
	);
};

export default DailyHabitsLineGraph;
