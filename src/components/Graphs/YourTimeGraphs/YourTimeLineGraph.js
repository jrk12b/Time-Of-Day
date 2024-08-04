import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import useFetchActivities from '../../../hooks/useFetchActivities';
import GraphColors from './GraphColors';
import { transformAndAggregateData } from './DataTransform';
import { testIds } from '../../../testData/testIds';

// This component that fetches activity data, transforms it, and displays it in a Line chart using Recharts.
const YourTimeLineGraph = () => {
	const { activities } = useFetchActivities();

	// Use the imported transformation function
	const data = useMemo(() => transformAndAggregateData(activities), [activities]);

	// Get all unique activity names from the data
	const activityNames = useMemo(() => {
		if (data.length > 0) {
			return Object.keys(data[0]).filter((key) => key !== 'date');
		}
		return [];
	}, [data]);

	return (
		<div data-testid={testIds.yourTime.yourTimeLineGraph}>
			<LineChart
				width={730}
				height={250}
				data={data}
				margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="date" />
				<YAxis />
				<Tooltip />
				<Legend />
				{activityNames.map((name, index) => (
					<Line
						key={name}
						type="monotone"
						dataKey={name}
						stroke={GraphColors[index % GraphColors.length]}
					/>
				))}
			</LineChart>
		</div>
	);
};

export default YourTimeLineGraph;
