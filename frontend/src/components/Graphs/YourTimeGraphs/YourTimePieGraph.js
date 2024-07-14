import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import useFetchActivities from '../../../hooks/useFetchActivities';
import GraphColors from './GraphColors';
import { aggregateHoursForActivities } from './DataTransform';
import { testIds } from '../../../testData/testIds';

// This component that fetches activity data, transforms it, and displays it in a Pie chart using Recharts.
const YourTimePieGraph = () => {
	const { activities } = useFetchActivities();

	// Use the imported aggregation function
	const data = useMemo(() => aggregateHoursForActivities(activities), [activities]);

	const RADIAN = Math.PI / 180;
	const renderCustomizedLabel = ({
		cx,
		cy,
		midAngle,
		innerRadius,
		outerRadius,
		percent,
		index,
	}) => {
		const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
		const x = cx + radius * Math.cos(-midAngle * RADIAN);
		const y = cy + radius * Math.sin(-midAngle * RADIAN);

		return (
			<text
				x={x}
				y={y}
				fill="white"
				textAnchor={x > cx ? 'start' : 'end'}
				dominantBaseline="central"
			>
				{`${(percent * 100).toFixed(0)}%`}
			</text>
		);
	};

	return (
		<div data-testid={testIds.yourTimePieGraph}>
			<PieChart width={400} height={400}>
				<Legend verticalAlign="top" height={36} />
				<Pie
					data={data}
					cx="50%"
					cy="50%"
					labelLine={false}
					label={renderCustomizedLabel}
					outerRadius={150}
					fill="#8884d8"
					dataKey="value"
				>
					{data.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={GraphColors[index % GraphColors.length]} />
					))}
				</Pie>
			</PieChart>
		</div>
	);
};

export default YourTimePieGraph;
