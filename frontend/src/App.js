import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ItemsPage from './pages/ItemsPage';
import TimeGraphPage from './pages/TimeGraphPage';
import HomePage from './pages/HomePage';
import HeaderNav from '../src/components/HeaderNav';
// eslint-disable-next-line no-unused-vars
import HeaderNavHook from "../src/components/HeaderNavHook";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <HeaderNav />
        {/* <HeaderNavHook /> */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ItemsPage" element={<ItemsPage />} />
            <Route path="/TimeGraphPage" element={<TimeGraphPage />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;