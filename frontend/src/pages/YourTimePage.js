// YourTimePage.js
import React from 'react';
import useFetchActivities from '../hooks/useFetchActivities';
import useActivityActions from '../hooks/useActivityActions';
import YourTimePieGraph from '../components/Graphs/YourTimeGraphs/YourTimePieGraph';
import YourTimeBarGraph from '../components/Graphs/YourTimeGraphs/YourTimeBarGraph';
import YourTimeLineGraph from '../components/Graphs/YourTimeGraphs/YourTimeLineGraph';
import YourTimeComposedGraph from '../components/Graphs/YourTimeGraphs/YourTimeComposedGraph';
import { SuccessMessage, ErrorMessage } from './Messages';
import YourTimeActivityList from '../components/Activity/YourTimeActivityList';
import '../css/YourTime.css';
const { PORT } = require('../config');

const YourTimePage = () => {
  const { activities, loading, error } = useFetchActivities();
  const {
    editActivity,
    editName,
    editHour,
    successMessage,
    errorMessage,
    handleEditClick,
    handleUpdate,
    handleDelete,
    handleDeleteDocument,
    setEditActivity,
    setEditName,
    setEditHour,
  } = useActivityActions(PORT);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading activities: {error.message}</p>;
  }

  return (
    <div>
      <h1>Your Time</h1>
      <SuccessMessage message={successMessage} />
      <ErrorMessage message={errorMessage} />
      <YourTimeActivityList
        activities={activities}
        editActivity={editActivity}
        editName={editName}
        editHour={editHour}
        handleEditClick={handleEditClick}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        handleDeleteDocument={handleDeleteDocument}
        setEditActivity={setEditActivity}
        setEditName={setEditName}
        setEditHour={setEditHour}
      />
      <hr />
      <div className="graph">
        <YourTimePieGraph />
      </div>
      <hr />
      <div className="graph">
        <YourTimeBarGraph />
      </div>
      <hr />
      <div className="graph">
        <YourTimeComposedGraph />
      </div>
      <hr />
      <div className="graph">
        <YourTimeLineGraph />
      </div>
    </div>
  );
};

export default YourTimePage;