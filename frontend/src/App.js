import React, {useEffect, useState} from 'react';
import axios from 'axios';

function App() {
	const [items, setItems] = useState([]);

	useEffect(() => {
		axios.get('http://localhost:5000/api/items')
		  .then(response => {
			setItems(response.data);
		  })
		  .catch(error => {
			console.error('There was an error fetching the data!', error);
		  });
	  }, []);
	return (
	<div className="App">
		<h1>Items</h1>
			<ul>
				{items.map(item => (
				<li key={item._id}>{item.name} - {item.description}</li>
				))}
			</ul>
		</div>
	)
}

export default App;