import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import ItemForm from './components/items/itemForm';
import ItemList from './components/items/itemList';
import './App.css';
import { AppProvider } from './context/AppContext';
import TimeBudget from './components/timeOfDay/TimeBudget';
import Graph from './components/timeOfDay/Graph';
import ActivityTotal from './components/timeOfDay/ActivityTotal';
import ActivityList from './components/timeOfDay/ActivityList';
import AddActivityForm from './components/timeOfDay/AddActivityForm';
import RemainingHours from './components/timeOfDay/RemainingHours';
import Header from './components/timeOfDay/Header';
const { PORT } = require('./config');

function App() {
	const [items, setItems] = useState([]);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [editId, setEditId] = useState(null);

	useEffect(() => {
		fetchItems();
	}, []);

	const fetchItems = async () => {
		try {
			const response = await axios.get(`http://localhost:${PORT}/api/items`);
			setItems(response.data);
		} catch (error) {
			console.error('Error fetching items', error);
		}
	};

	const handleAddOrUpdate = async () => {
		try {
			if (editId) {
				const response = await axios.put(`http://localhost:${PORT}/api/items/${editId}`, {
					name,
					description,
				});
				setItems(items.map((item) => (item._id === editId ? response.data : item)));
				setEditId(null);
			} else {
				const response = await axios.post(`http://localhost:${PORT}/api/items`, {
					name,
					description,
				});
				setItems([...items, response.data]);
			}
			setName('');
			setDescription('');
		} catch (error) {
			console.error('Error saving item', error);
		}
	};

	const handleEdit = (item) => {
		setName(item.name);
		setDescription(item.description);
		setEditId(item._id);
	};

	const handleDelete = async (id) => {
		try {
			await axios.delete(`http://localhost:${PORT}/api/items/${id}`);
			setItems(items.filter((item) => item._id !== id));
		} catch (error) {
			console.error('Error deleting item', error);
		}
	};

	return (
		<div className="App">
			<AppProvider>
				<div className="container">
					<Header />
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
					<div className="Center">
						<Graph />
					</div>
					<h3 className="mt-3">Activities</h3>
					<div className="row mt-3">
						<div className="col-sm">
							<ActivityList />
						</div>
					</div>
					<h3 className="mt-3">Add Activity</h3>
					<div className="row mt-3">
						<div className="col-sm">
							<AddActivityForm />
						</div>
					</div>
				</div>
			</AppProvider>
			<hr></hr>
			<h1>Items</h1>
			<ItemForm
				name={name}
				setName={setName}
				description={description}
				setDescription={setDescription}
				handleAddOrUpdate={handleAddOrUpdate}
				editId={editId}
			/>
			<ItemList items={items} handleEdit={handleEdit} handleDelete={handleDelete} />
		</div>
	);
}

export default App;
