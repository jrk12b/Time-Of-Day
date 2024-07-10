import React, { useContext } from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import { AppContext } from '../../../context/contextActivities';
import GraphColors from '../GraphColors';

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);

	return (
		<text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
			{`${(percent * 100).toFixed(0)}%`}
		</text>
	);
};

export default function TodaysTimeGraph() {
	// Getting the data
	const { activities, hours } = useContext(AppContext);
	// Get Remaining hours
	const totalActivities = activities.reduce((total, activity) => {
		return (total = total + activity.hour);
	}, 0);

	// Create data array to be populate
	const data = [
		// { name: 'Group A', value: '10' }
	];

	// Populate data array with remaining hours
	data.push({ name: 'Hours Remaining', value: hours - totalActivities });

	// Loop through activities array and populate data array
	activities.forEach((activity) => {
		data.push({ name: activity.name, value: activity.hour });
	});

	return (
		<PieChart width={570} height={570}>
			<Legend verticalAlign="bottom" height={36}/>
			<Pie
				data={data}
				cx="50%"
				cy="50%"
				labelLine={false}
				label={renderCustomizedLabel}
				outerRadius={250}
				fill="#8884d8"
				dataKey="value"
			>
				{data.map((entry, index) => (
					<Cell key={`cell-${index}`} fill={GraphColors[index % GraphColors.length]} />
				))}
			</Pie>
		</PieChart>
	);
}
