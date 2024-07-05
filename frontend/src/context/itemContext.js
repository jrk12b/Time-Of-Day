import axios from 'axios';
const { PORT } = require('../config');

export const fetchItems = async () => {
  try {
    const response = await axios.get(`http://localhost:${PORT}/api/items`);
    return response.data;
  } catch (error) {
    console.error('Error fetching items', error);
    throw error;
  }
};

export const handleAddOrUpdate = async (editId, name, description, items, setItems) => {
  try {
    if (editId) {
      const response = await axios.put(`http://localhost:${PORT}/api/items/${editId}`, {
        name,
        description,
      });
      setItems(items.map((item) => (item._id === editId ? response.data : item)));
      return null;
    } else {
      const response = await axios.post(`http://localhost:${PORT}/api/items`, {
        name,
        description,
      });
      setItems([...items, response.data]);
    }
  } catch (error) {
    console.error('Error saving item', error);
    throw error;
  }
};

export const handleEdit = (item, setName, setDescription, setEditId) => {
  setName(item.name);
  setDescription(item.description);
  setEditId(item._id);
};

export const handleDelete = async (id, items, setItems) => {
  try {
    await axios.delete(`http://localhost:${PORT}/api/items/${id}`);
    setItems(items.filter((item) => item._id !== id));
  } catch (error) {
    console.error('Error deleting item', error);
    throw error;
  }
};