import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import useFetchActivities from '../../../context/contextFetchActivities';

const YourTimePieGraph = () => {
  const { activities } = useFetchActivities();

  // Aggregate hours for each activity name
  const data = useMemo(() => {
    const aggregated = {};

    activities.forEach(activitySet => {
      activitySet.activities.forEach(activity => {
        if (aggregated[activity.name]) {
          aggregated[activity.name] += activity.hour;
        } else {
          aggregated[activity.name] = activity.hour;
        }
      });
    });

    return Object.keys(aggregated).map(name => ({
      name,
      value: aggregated[name],
    }));
  }, [activities]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
    <text
          x={x}
          y={y}
          fill="white"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
  };

  return (
    <PieChart width={400} height={400}>
      <Legend verticalAlign="top" height={36}/>
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
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}

export default YourTimePieGraph;