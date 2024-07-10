import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import useFetchActivities from '../../context/contextFetchActivities';
import moment from 'moment';

const YourTimeBarGraph = () => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  const { activities } = useFetchActivities();

  // Transform data to aggregate hours by date and activity
  const data = useMemo(() => {
    const aggregated = {};

    activities.forEach(activitySet => {
      const date = moment(activitySet.timestamp).format('YYYY-MM-DD');
      if (!aggregated[date]) {
        aggregated[date] = {};
      }

      activitySet.activities.forEach(activity => {
        if (aggregated[date][activity.name]) {
          aggregated[date][activity.name] += activity.hour;
        } else {
          aggregated[date][activity.name] = activity.hour;
        }
      });
    });

    // Collect all unique activity names
    const allActivityNames = new Set();
    Object.values(aggregated).forEach(activityData => {
      Object.keys(activityData).forEach(activityName => {
        allActivityNames.add(activityName);
      });
    });

    // Transform aggregated data to the format expected by Recharts
    return Object.keys(aggregated).map(date => {
      const activities = aggregated[date];
      const dataPoint = { date };

      allActivityNames.forEach(activityName => {
        dataPoint[activityName] = activities[activityName] || 0;
      });

      return dataPoint;
    });
  }, [activities]);

  return (
    <BarChart width={600} height={600} data={data}>
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      {Object.keys(data[0] || {}).filter(key => key !== 'date').map((key, index) => (
        <Bar key={key} dataKey={key} fill={COLORS[index % COLORS.length]} />
      ))}
    </BarChart>
  );
}

export default YourTimeBarGraph;