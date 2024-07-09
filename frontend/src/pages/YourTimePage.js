import React, { useState, useEffect } from 'react';
import axios from 'axios';

import useFetchActivities from '../context/contextFetchActivities';

import YourTimeGraph from '../components/Graph/YourTimeGraph';

import '../css/YourTime.css';

const YourTimePage = () => {
	const { activities, loading, error } = useFetchActivities();
	const [editActivity, setEditActivity] = useState(null);
	const [editName, setEditName] = useState('');
	const [editHour, setEditHour] = useState('');
	const [successMessage, setSuccessMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const { PORT } = require('../config');

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

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Error loading activities: {error.message}</p>;
	}

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
			localStorage.setItem('errorMessage', 'Activity updated failed');
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

	return (
		<div>
			<h1>Your Time</h1>
			{successMessage && <p className="success-message">{successMessage}</p>}{' '}
			{/* Display success message */}
			{errorMessage && <p className="error-message">{errorMessage}</p>}{' '}
			{/* Display error message */}
			<ul className="yourTimeList">
				{activities.map((activityDoc) => (
					<div key={activityDoc._id} className="yourTime">
						<button onClick={() => handleDeleteDocument(activityDoc._id)}>
							Delete Entire Document
						</button>
						<p className="dateText">Date: {new Date(activityDoc.timestamp).toLocaleDateString()}</p>
						<ul>
							{activityDoc.activities.map((activity) => (
								<li key={activity._id}>
									{editActivity && editActivity._id === activity._id ? (
										<div>
											<input
												type="text"
												value={editName}
												onChange={(e) => setEditName(e.target.value)}
												placeholder="Activity Name"
											/>
											<input
												type="number"
												value={editHour}
												onChange={(e) => setEditHour(e.target.value)}
												placeholder="Hours"
											/>
											<button onClick={() => handleUpdate(activity._id, activityDoc._id)}>
												Save
											</button>
											<button onClick={() => setEditActivity(null)}>Cancel</button>
										</div>
									) : (
										<div>
											{activity.name}: {activity.hour} hours
											<button onClick={() => handleEditClick(activity)}>Edit</button>
											<button onClick={() => handleDelete(activity._id, activityDoc._id)}>
												Delete
											</button>
										</div>
									)}
								</li>
							))}
						</ul>
					</div>
				))}
			</ul>
			<hr></hr>
			<div className="graph">
				<YourTimeGraph />
			</div>
		</div>
	);
};

export default YourTimePage;
