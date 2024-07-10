import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import useFetchActivities from '../../../context/contextFetchActivities';
import GraphColors from './GraphColors';
import { transformAndAggregateData } from './DataTransform';

const YourTimeLineGraph = () => {
  const { activities } = useFetchActivities();

  // Use the imported transformation function
  const data = useMemo(() => transformAndAggregateData(activities), [activities]);

  // Get all unique activity names from the data
  const activityNames = useMemo(() => {
    if (data.length > 0) {
      return Object.keys(data[0]).filter(key => key !== 'date');
    }
    return [];
  }, [data]);

  return (
    <LineChart width={730} height={250} data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
  );
}

export default YourTimeLineGraph;