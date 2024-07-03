import React from 'react';

const Item = ({ item, handleEdit, handleDelete }) => {
  return (
    <li>
      {item.name} - {item.description}
      <button onClick={() => handleEdit(item)}>Edit</button>
      <button onClick={() => handleDelete(item._id)}>Delete</button>
    </li>
  );
};

export default Item;
