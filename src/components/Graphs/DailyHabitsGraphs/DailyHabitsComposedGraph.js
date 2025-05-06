import React, { useMemo } from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import useFetchHabits from '../../../hooks/useFetchHabits';
import GraphColors from '../YourTimeGraphs/GraphColors';
import { testIds } from '../../../testData/testIds';

// This component that fetches habit data, transforms it, and displays it in a Composed bar chart using Recharts.
const DailyHabitsComposedGraph = () => {
	const { habits } = useFetchHabits();

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
		<div data-testid={testIds.yourTime.yourTimeComposedGraph}>
			<ComposedChart
				width={730}
				height={250}
				data={data}
				margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
			>
				<CartesianGrid stroke="#f5f5f5" />
				<XAxis dataKey="month" />
				<YAxis />
				<Tooltip />
				<Legend />

				{/* Add a Bar component for bars */}
				{habits.map((habit, index) => (
					<Bar
						key={`bar-${habit.name}`}
						dataKey={habit.name}
						fill={GraphColors[index % GraphColors.length]}
						barSize={20}
					/>
				))}

				{/* Add a Line component for lines, hiding them from the legend */}
				{habits.map((habit, index) => (
					<Line
						key={`line-${habit.name}`}
						type="monotone"
						dataKey={`${habit.name}_goal`}
						stroke={GraphColors[index % GraphColors.length]}
						legendType="none"
						dot={false}
						strokeDasharray="3 3"
					/>
				))}
			</ComposedChart>
		</div>
	);
};

export default DailyHabitsComposedGraph;
