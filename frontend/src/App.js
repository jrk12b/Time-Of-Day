import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ItemForm from './components/itemForm';
import ItemList from './components/itemList';

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
      const response = await axios.get('http://localhost:5000/api/items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items', error);
    }
  };

  const handleAddOrUpdate = async () => {
    try {
      if (editId) {
        const response = await axios.put(`http://localhost:5000/api/items/${editId}`, { name, description });
        setItems(items.map(item => (item._id === editId ? response.data : item)));
        setEditId(null);
      } else {
        const response = await axios.post('http://localhost:5000/api/items', { name, description });
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
      await axios.delete(`http://localhost:5000/api/items/${id}`);
      setItems(items.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting item', error);
    }
  };

  return (
    <div className="App">
      <h1>Items</h1>
      <ItemForm
        name={name}
        setName={setName}
        description={description}
        setDescription={setDescription}
        handleAddOrUpdate={handleAddOrUpdate}
        editId={editId}
      />
      <ItemList
        items={items}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;
