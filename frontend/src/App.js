import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ItemsPage from './pages/ItemsPage';
import TimeGraphPage from './pages/TimeGraphPage';
import HomePage from './pages/HomePage';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <ul>
			<li>
                <Link to="/HomePage">HomePage</Link>
              </li>
              <li>
                <Link to="/ItemsPage">ItemsPage</Link>
              </li>
              <li>
                <Link to="/TimeGraphPage">TimeGraphPage</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/HomePage" element={<HomePage />} />
            <Route path="/ItemsPage" element={<ItemsPage />} />
            <Route path="/TimeGraphPage" element={<TimeGraphPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;