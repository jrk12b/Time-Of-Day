import React from 'react';
import Item from './item';

const ItemList = ({ items, handleEdit, handleDelete }) => {
	return (
		<ul>
			{items.map((item) => (
				<Item key={item._id} item={item} handleEdit={handleEdit} handleDelete={handleDelete} />
			))}
		</ul>
	);
};

export default ItemList;
