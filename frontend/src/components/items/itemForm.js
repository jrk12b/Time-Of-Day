import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/appContextActivities';

const ItemForm = ({ handleAddOrUpdate, editId }) => {
    const { activities } = useContext(AppContext);
    const [shouldSubmit, setShouldSubmit] = useState(false);

    const handleButtonClick = () => {
        setShouldSubmit(true);
    };

    useEffect(() => {
        if (shouldSubmit) {
            activities.forEach(activity => {
                handleAddOrUpdate(editId, activity.name, activity.hour);
            });
            setShouldSubmit(false);
        }
    }, [shouldSubmit, activities, handleAddOrUpdate, editId]);

    return (
        <div>
            <button onClick={handleButtonClick}>{editId ? 'Update' : 'Add'} Items</button>
        </div>
    );
};

export default ItemForm;