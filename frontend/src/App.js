import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TimeGraphPage from './pages/TimeGraphPage';
import HomePage from './pages/HomePage';
import HeaderNav from '../src/components/HeaderNav/HeaderNav';
// eslint-disable-next-line no-unused-vars
import HeaderNavHook from '../src/components/HeaderNav/HeaderNavHook';

function App() {
	return (
		<div className="App">
			<Router>
				<HeaderNav />
				{/* <HeaderNavHook /> */}
				<main className="main-content">
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/TimeGraphPage" element={<TimeGraphPage />} />
					</Routes>
				</main>
			</Router>
		</div>
	);
}

export default App;
