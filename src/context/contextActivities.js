import React, { createContext, useReducer } from 'react';
import axios from 'axios';
const { PORT } = require('../config');

// Fetches activity data from the backend API
export const fetchActivities = async () => {
	try {
		const response = await axios.get(`http://localhost:${PORT}/api/activities`);
		return response.data;
	} catch (error) {
		console.error('Error fetching activities', error);
		throw error;
	}
};

// Function to fetch existing activity names from the database
export const fetchActivityNames = async () => {
	try {
		const response = await axios.get(`http://localhost:${PORT}/api/activities/names`);
		return response.data;
	} catch (error) {
		console.error('Error fetching activity names:', error);
		return [];
	}
};

/**
 * Reducer function to handle activity-related actions.
 * Supports 'ADD_ACTIVITY' and 'DELETE_ACTIVITY' action types.
 *
 * @param {Object} state - The current state of the application.
 * @param {Object} action - The action to be processed, containing type and payload.
 * @returns {Object} The new state after the action is applied.
 */
const AppReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_ACTIVITY':
			return {
				...state,
				activites: [...state.activites, action.payload],
			};
		case 'DELETE_ACTIVITY':
			return {
				...state,
				activites: state.activites.filter((activity) => activity.id !== action.payload),
			};
		default:
			return state;
	}
};

const initialState = {
	hours: 24,
	activites: [],
};

export const AppContext = createContext();

/**
 * Provides application state management through context, including hours and activities data.
 * Uses AppReducer for state updates.
 */
export const AppProvider = (props) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	return (
		<AppContext.Provider
			value={{
				hours: state.hours,
				activities: state.activites,
				dispatch,
			}}
		>
			{props.children}
		</AppContext.Provider>
	);
};

/**
 * Handles submission of activities data to a specified API endpoint using axios.
 * Sets a success message upon successful submission and hides it after 3 seconds.
 * Logs activity submission details and handles errors gracefully.
 */
export const handleSubmitActivities = async (activities, setSuccessMessage) => {
	try {
		const timestamp = new Date();
		const response = await axios.post(`http://localhost:${PORT}/api/activities`, {
			activities,
			timestamp,
		});
		console.log('Activities submitted:', response.data);

		// Show success message
		setSuccessMessage('Activities submitted successfully!');

		// Hide the message after 3 seconds
		setTimeout(() => {
			setSuccessMessage('');
		}, 3000);
	} catch (error) {
		console.error('Error submitting activities', error);
	}
};
