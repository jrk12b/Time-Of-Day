import React, { useMemo } from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import useFetchActivities from '../../../context/contextFetchActivities';
import GraphColors from './GraphColors';
import { transformAndAggregateData } from './DataTransform';

const SameDataComposedChart = () => {
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
    <ComposedChart width={730} height={250} data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
  );
}

export default SameDataComposedChart;