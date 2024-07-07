import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/contextActivities';
import { v4 as uuidv4 } from 'uuid';

const AddActivityForm = () => {
	const { dispatch } = useContext(AppContext);

	const [name, setName] = useState('');
	const [hour, setHour] = useState('');

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
		<form onSubmit={onSubmit}>
			<div className="row">
				<div className="col-sm">
					<label htmlFor="name">Name</label>
					<input
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
