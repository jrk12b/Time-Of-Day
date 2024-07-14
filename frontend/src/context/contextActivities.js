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

// add comment
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

// add comment
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

// add comment
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
