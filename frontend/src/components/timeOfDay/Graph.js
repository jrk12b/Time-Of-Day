import React, { useContext } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { AppContext } from '../../context/appContextActivities';

const COLORS = ['#808080', '#00C49F', '#FFBB28', '#FF8042', '0088FE'];

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

export default function Graph() {
	// Getting the data
	const { activities, hours } = useContext(AppContext);
	// Get Remaining hours
	const totalActivities = activities.reduce((total, item) => {
		return (total = total + item.hour);
	}, 0);

	// Create data array to be populate
	const data = [
		// { name: 'Group A', value: '10' }
	];

	// Populate data array with remaining hours
	data.push({ name: 'Hours Remaining', value: hours - totalActivities });

	// Loop through activities array and populate data array
	activities.forEach((element) => {
		data.push({ name: element.name, value: element.hour });
	});

	return (
		<PieChart width={400} height={400}>
			<Pie
				data={data}
				cx="50%"
				cy="50%"
				labelLine={false}
				label={renderCustomizedLabel}
				outerRadius={200}
				fill="#8884d8"
				dataKey="value"
			>
				{data.map((entry, index) => (
					<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
				))}
			</Pie>
		</PieChart>
	);
}
