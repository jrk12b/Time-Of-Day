import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/appContextActivities';

const ItemForm = ({ name, setName, description, setDescription, handleAddOrUpdate, editId }) => {
	const { activities } = useContext(AppContext);
	const [shouldSubmit, setShouldSubmit] = useState(false);

	const handleButtonClick = () => {
		if (activities.length > 0) {
			setName(activities[0].name);
			setDescription(activities[0].hour);
			setShouldSubmit(true);
		}
	};

	useEffect(() => {
		if (shouldSubmit) {
			handleAddOrUpdate();
			setShouldSubmit(false);
		}
	}, [name, description, shouldSubmit, handleAddOrUpdate]);

	return (
		<div>
			<button onClick={handleButtonClick}>{editId ? 'Update' : 'Add'} Item</button>
		</div>
	);
};

export default ItemForm;