import moment from 'moment';

export const transformAndAggregateData = (activities) => {
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
};

export const aggregateHoursForActivities = (activities) => {
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
};