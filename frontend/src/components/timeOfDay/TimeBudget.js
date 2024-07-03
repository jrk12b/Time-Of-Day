import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const TimeBudget = () => {
	const { hours } = useContext(AppContext);

	return (
		<div className="alert alert-success">
			<span>{hours} Hours</span>
		</div>
	);
};

export default TimeBudget;
