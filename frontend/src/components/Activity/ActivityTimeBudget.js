import React, { useContext } from 'react';
import { AppContext } from '../../context/contextActivities';
import { testIds } from '../../testIds';

// This component displays how many hours total you have
const TimeBudget = () => {
	const { hours } = useContext(AppContext);

	return (
		<div data-testid={testIds.timeBudget.timeBudgetDiv} className="alert alert-success">
			<span>{hours} Hours</span>
		</div>
	);
};

export default TimeBudget;
