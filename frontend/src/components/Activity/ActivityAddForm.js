import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/contextActivities';
import { v4 as uuidv4 } from 'uuid';
import { testIds } from '../../testData/testIds';

// This component displays a functioning add activity form that adds an activity to today's activities
const AddActivityForm = () => {
	const { dispatch } = useContext(AppContext);

	// Initialize state variables for activity name and hours with empty string values
	const [name, setName] = useState('');
	const [hour, setHour] = useState('');

	// Create onSubmit function which handles form submission: prevent default behavior, create new activity, and dispatch action to add activity to state
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
					<input
						data-testid={testIds.addActivityForm.addActivityFormName}
						required="required"
						type="text"
						className="form-control"
						id="name"
						value={name}
						onChange={(event) => setName(event.target.value)}
					></input>
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
					></input>
				</div>
				<div className="col-sm">
					<button type="submit" className="btn btn-primary mt-3">
						Save
					</button>
				</div>
			</div>
		</form>
	);
};

export default AddActivityForm;
