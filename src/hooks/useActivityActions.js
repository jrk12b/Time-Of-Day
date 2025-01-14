import { useState, useEffect } from 'react';
import axios from 'axios';
const { HOST } = require('../config');

/**
 * Manages state and actions related to editing activities.
 * Handles displaying success and error messages stored in localStorage.
 */
const useActivityActions = () => {
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

	/**
	 * Handles click event for editing an activity.
	 * Sets state for editing specific activity details.
	 * @param {Object} activity - The activity object to edit
	 */
	const handleEditClick = (activity) => {
		setEditActivity(activity);
		setEditName(activity.name);
		setEditHour(activity.hour);
	};

	/**
	 * Handles updating an activity with new data.
	 * Updates activity via API call and manages success and error messages.
	 * @param {string} activityId - The ID of the activity to update
	 * @param {string} activityDocId - The document ID containing the activity
	 */
	const handleUpdate = async (activityId, activityDocId) => {
		try {
			const response = await axios.put(
				`${HOST}/api/activities/${activityDocId}/activity/${activityId}`,
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

	/**
	 * Handles deleting an activity from the server.
	 * Deletes activity via API call and manages success and error messages.
	 * @param {string} activityId - The ID of the activity to delete
	 * @param {string} activityDocId - The document ID containing the activity
	 */
	const handleDelete = async (activityId, activityDocId) => {
		try {
			const response = await axios.delete(
				`${HOST}/api/activities/${activityDocId}/activity/${activityId}`
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

	/**
	 * Handles deleting an entire document of activities.
	 * Deletes document via API call and manages success and error messages.
	 * @param {string} activityDocId - The ID of the document to delete
	 */
	const handleDeleteDocument = async (activityDocId) => {
		try {
			const response = await axios.delete(`${HOST}/api/activities/${activityDocId}`);
			console.log('Document deleted:', response.data);
			localStorage.setItem('successMessage', 'Document deleted successfully!');
		} catch (error) {
			console.error('Error deleting document', error);
			localStorage.setItem('errorMessage', 'Document delete failed');
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
		setEditActivity,
		setEditName,
		setEditHour,
	};
};

export default useActivityActions;
