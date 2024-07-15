import React, { useContext, useState, useEffect } from 'react';
import { AppContext, fetchActivityNames } from '../../context/contextActivities';
import { v4 as uuidv4 } from 'uuid';
import Autosuggest from 'react-autosuggest';
import { testIds } from '../../testData/testIds';
import useAutoSuggest from '../../hooks/useAutoSuggest';

// This component displays a functioning add activity form that adds an activity to today's activities
const AddActivityForm = () => {
	const { dispatch } = useContext(AppContext);

	// Initialize state variables
	const [name, setName] = useState('');
	const [hour, setHour] = useState('');
	const [allNames, setAllNames] = useState([]);

	// Fetch existing activity names when the component mounts
	useEffect(() => {
		const getActivityNames = async () => {
			const names = await fetchActivityNames();
			setAllNames(names);
		};
		getActivityNames();
	}, []);

	// Use the custom hook for autosuggest logic
	const {
		suggestions,
		onSuggestionsFetchRequested,
		onSuggestionsClearRequested,
		getSuggestionValue,
		renderSuggestion,
	} = useAutoSuggest(allNames);

	// onSubmit function which handles form submission
	const onSubmit = (event) => {
		event.preventDefault();

		const activity = {
			id: uuidv4(),
			name: name,
			hour: parseInt(hour),
		};

		dispatch({
			type: 'ADD_ACTIVITY',
			payload: activity,
		});
	};

	return (
		<form data-testid={testIds.addActivityForm.addActivityForm} onSubmit={onSubmit}>
			<div className="row">
				<div className="col-sm">
					<label htmlFor="name">Name</label>
					<Autosuggest
						suggestions={suggestions}
						onSuggestionsFetchRequested={onSuggestionsFetchRequested}
						onSuggestionsClearRequested={onSuggestionsClearRequested}
						getSuggestionValue={getSuggestionValue}
						renderSuggestion={renderSuggestion}
						inputProps={{
							'data-testid': testIds.addActivityForm.addActivityFormName,
							placeholder: 'Enter Activity Name',
							value: name,
							onChange: (event, { newValue }) => setName(newValue),
							required: 'required',
							className: 'form-control',
							id: 'name',
						}}
					/>
				</div>
				<div className="col-sm">
					<label htmlFor="hour">Hours</label>
					<input
						data-testid={testIds.addActivityForm.addActivityFormHours}
						required="required"
						type="text"
						className="form-control"
						id="hour"
						value={hour}
						onChange={(event) => setHour(event.target.value)}
						placeholder="Enter Hours"
					></input>
				</div>
				<div className="col-sm">
					<button
						data-testid={testIds.addActivityForm.addActivitySaveButton}
						type="submit"
						className="btn btn-primary mt-3"
					>
						Save
					</button>
				</div>
			</div>
		</form>
	);
};

export default AddActivityForm;
