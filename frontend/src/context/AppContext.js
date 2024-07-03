import React, { createContext, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

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
	activites: [
		{ id: uuidv4(), name: 'Reading', hour: 1 },
		{ id: uuidv4(), name: 'Work', hour: 8 },
		{ id: uuidv4(), name: 'Running', hour: 2 },
		{ id: uuidv4(), name: 'Sleep', hour: 9 },
	],
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
