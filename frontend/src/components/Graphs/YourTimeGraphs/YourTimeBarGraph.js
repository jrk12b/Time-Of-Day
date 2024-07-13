import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import useFetchActivities from '../../../hooks/useFetchActivities';
import GraphColors from './GraphColors';
import { transformAndAggregateData } from './DataTransform';
import { testIds } from '../../../testIds';

// This component that fetches activity data, transforms it, and displays it in a bar chart using Recharts.
const YourTimeBarGraph = () => {
	const { activities } = useFetchActivities();

	// Use the imported transformation function
	const data = useMemo(() => transformAndAggregateData(activities), [activities]);

	return (
		<div data-testid={testIds.yourTimeBarGraph}>
			<BarChart width={1000} height={400} data={data}>
				<CartesianGrid stroke="#ccc" />
				<XAxis dataKey="date" />
				<YAxis />
				<Tooltip />
				<Legend />
				{Object.keys(data[0] || {})
					.filter((key) => key !== 'date')
					.map((key, index) => (
						<Bar key={key} dataKey={key} fill={GraphColors[index % GraphColors.length]} />
					))}
			</BarChart>
		</div>
	);
};

export default YourTimeBarGraph;
