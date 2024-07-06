import React, { useEffect, useState } from 'react';
import ItemForm from '../components/items/itemForm';
import ItemList from '../components/items/itemList';
import { fetchItems, handleAddOrUpdate, handleEdit, handleDelete } from '../context/itemContext';

const ItemPage = () => {
	const [items, setItems] = useState([]);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [editId, setEditId] = useState(null);

	useEffect(() => {
		const getItems = async () => {
			const fetchedItems = await fetchItems();
			setItems(fetchedItems);
		};
		getItems();
	}, []);

	const addOrUpdate = async () => {
		await handleAddOrUpdate(editId, name, description, items, setItems);
		setEditId(null);
		setName('');
		setDescription('');
	};

	const edit = (item) => {
		handleEdit(item, setName, setDescription, setEditId);
	};

	const deleteItem = async (id) => {
		await handleDelete(id, items, setItems);
	};
	return (
		<div>
			<h1>Items</h1>
			<p>This is the Items page.</p>
			<hr />
			<h1>Items</h1>
			<ItemForm
				name={name}
				setName={setName}
				description={description}
				setDescription={setDescription}
				handleAddOrUpdate={addOrUpdate}
				editId={editId}
			/>
			<ItemList items={items} handleEdit={edit} handleDelete={deleteItem} />
		</div>
	);
};

export default ItemPage;
