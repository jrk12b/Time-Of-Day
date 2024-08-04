import React, { useMemo } from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import useFetchActivities from '../../../hooks/useFetchActivities';
import GraphColors from './GraphColors';
import { transformAndAggregateData } from './DataTransform';
import { testIds } from '../../../testData/testIds';

// This component that fetches activity data, transforms it, and displays it in a Composed bar chart using Recharts.
const YourTimeComposedGraph = () => {
	const { activities } = useFetchActivities();

	// Use the imported transformation function
	const data = useMemo(() => transformAndAggregateData(activities), [activities]);

	const activityNames = useMemo(() => {
		if (data.length > 0) {
			return Object.keys(data[0]).filter((key) => key !== 'date');
		}
		return [];
	}, [data]);

	return (
		<div data-testid={testIds.yourTime.yourTimeComposedGraph}>
			<ComposedChart
				width={730}
				height={250}
				data={data}
				margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
			>
				<CartesianGrid stroke="#f5f5f5" />
				<XAxis dataKey="date" />
				<YAxis />
				<Tooltip />
				<Legend />

				{/* Add a Bar component for bars */}
				{activityNames.map((name, index) => (
					<Bar
						key={`bar-${name}`}
						dataKey={name}
						fill={GraphColors[index % GraphColors.length]}
						barSize={20}
					/>
				))}

				{/* Add a Line component for lines, hiding them from the legend */}
				{activityNames.map((name, index) => (
					<Line
						key={`line-${name}`}
						type="monotone"
						dataKey={name}
						stroke={GraphColors[index % GraphColors.length]}
						legendType="none"
					/>
				))}
			</ComposedChart>
		</div>
	);
};

export default YourTimeComposedGraph;
