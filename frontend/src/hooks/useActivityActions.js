import { useState, useEffect } from 'react';
import axios from 'axios';

const useActivityActions = (PORT) => {
  const [editActivity, setEditActivity] = useState(null);
  const [editName, setEditName] = useState('');
  const [editHour, setEditHour] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const message = localStorage.getItem('successMessage');
    const errorMessage = localStorage.getItem('errorMessage');
    if (message) {
      setSuccessMessage(message);
      localStorage.removeItem('successMessage');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
    if (errorMessage) {
      setErrorMessage(errorMessage);
      localStorage.removeItem('errorMessage');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  }, []);

  const handleEditClick = (activity) => {
    setEditActivity(activity);
    setEditName(activity.name);
    setEditHour(activity.hour);
  };

  const handleUpdate = async (activityId, activityDocId) => {
    try {
      const response = await axios.put(
        `http://localhost:${PORT}/api/activities/${activityDocId}/activity/${activityId}`,
        {
          name: editName,
          hour: editHour,
        }
      );
      console.log('Activity updated:', response.data);
      localStorage.setItem('successMessage', 'Activity updated successfully!');
    } catch (error) {
      console.error('Error updating activity', error);
      localStorage.setItem('errorMessage', 'Activity update failed');
    } finally {
      setEditActivity(null);
      setEditName('');
      setEditHour('');
      window.location.reload();
    }
  };

  const handleDelete = async (activityId, activityDocId) => {
    try {
      const response = await axios.delete(
        `http://localhost:${PORT}/api/activities/${activityDocId}/activity/${activityId}`
      );
      console.log('Activity deleted:', response.data);
      localStorage.setItem('successMessage', 'Activity deleted successfully!');
    } catch (error) {
      console.error('Error deleting activity', error);
      localStorage.setItem('errorMessage', 'Activity delete failed');
    } finally {
      window.location.reload();
    }
  };

  const handleDeleteDocument = async (activityDocId) => {
    try {
      const response = await axios.delete(
        `http://localhost:${PORT}/api/activities/${activityDocId}`
      );
      console.log('Document deleted:', response.data);
      localStorage.setItem('successMessage', 'Activity deleted successfully!');
    } catch (error) {
      console.error('Error deleting document', error);
      localStorage.setItem('errorMessage', 'Activity delete failed');
    } finally {
      window.location.reload();
    }
  };

  return {
    editActivity,
    editName,
    editHour,
    successMessage,
    errorMessage,
    handleEditClick,
    handleUpdate,
    handleDelete,
    handleDeleteDocument,
  };
};

export default useActivityActions;