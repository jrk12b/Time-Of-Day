import React, { useEffect, useState } from 'react';
import { fetchItems, handleAddOrUpdate } from '../context/itemContext';
import { AppProvider } from '../context/appContextActivities';
import TimeBudget from '../components/timeOfDay/TimeBudget';
import RemainingHours from '../components/timeOfDay/RemainingHours';
import ActivityTotal from '../components/timeOfDay/ActivityTotal';
import Graph from '../components/timeOfDay/Graph';
import ActivityList from '../components/timeOfDay/ActivityList';
import AddActivityForm from '../components/timeOfDay/AddActivityForm';
import ItemForm from '../components/items/itemForm';
import '../css/TimeGraph.css';

const TimePage = () => {
    const [items, setItems] = useState([]);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        const getItems = async () => {
            const fetchedItems = await fetchItems();
            setItems(fetchedItems);
        };
        getItems();
    }, []);

    const addOrUpdate = async (id, name, description) => {
        await handleAddOrUpdate(id, name, description, items, setItems);
        setEditId(null);
    };

    return (
        <div>
            <hr />
            <AppProvider>
                <div className="container">
                    <div className="row mt-3">
                        <div className="col-sm">
                            <TimeBudget />
                        </div>
                        <div className="col-sm">
                            <RemainingHours />
                        </div>
                        <div className="col-sm">
                            <ActivityTotal />
                        </div>
                    </div>
                    <div className="graph">
                        <Graph />
                    </div>
                    <div className="activityList">
                        <h3 className="mt-3">Activities</h3>
                        <div className="row mt-3">
                            <div className="col-sm">
                                <ActivityList />
                            </div>
                        </div>
                    </div>
                    <div className="activityForm">
                        <h3 className="mt-3">Add Activity</h3>
                        <div className="row mt-3">
                            <div className="col-sm">
                                <AddActivityForm />
                            </div>
                        </div>
                    </div>
                    <div className="itemForm">
                        <ItemForm
                            handleAddOrUpdate={addOrUpdate}
                            editId={editId}
                        />
                    </div>
                </div>
            </AppProvider>
        </div>
    );
};

export default TimePage;