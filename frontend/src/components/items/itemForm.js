import React from 'react';

const ItemForm = ({ name, setName, description, setDescription, handleAddOrUpdate, editId }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleAddOrUpdate}>
        {editId ? 'Update' : 'Add'} Item
      </button>
    </div>
  );
};

export default ItemForm;
