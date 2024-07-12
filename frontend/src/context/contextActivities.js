import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
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
	activites: [{ id: uuidv4(), name: 'Reading', hour: 1 }],
};

export const AppContext = createContext();

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
