import React from 'react';
import '../css/Home.css';

const HomePage = () => {
	return (
		<div className='home'>
			<div className='home-div'>
				<h1>Welcome to Time Of Day!</h1>
			</div>
			<div className='home-div introduction'>
				<p className=''>
					Time Of Day is a powerful and intuitive app designed to help you manage and optimize your daily schedule. With Time Of Day, you can easily input your daily activities and track how many hours you spend on each task. The app then provides detailed charts and graphs, allowing you to visualize your time distribution over weeks or months. Whether you’re aiming to improve productivity, balance work and leisure, or simply gain insights into your daily routines, Time Of Day offers the tools you need to take control of your time. Start making every hour count with Time Of Day!
				</p>
			</div>
			<div className='home-div instructions-header'>
				<h3>User Instructions</h3>
			</div>
			<div className='home-div instructions'>
				<ol>
					<li>Start by adding Today's activities by navigating to the Today's Time page</li>
					<li>After adding all of Today's activities, select Submit All Activities.</li>
					<li>Then, navigate to the Your Time page to view all of your saved time.</li>
					<li>On the Your Time page, you can also view various charts, graphs, and data on your time!</li>
				</ol>
			</div>
			<div className='home-div motivation-header'>
				<h3>Motiviational Quotes</h3>
			</div>
			<div className='home-div motivation'>
				<ul>
					<li>Either you run the day or the day runs you.</li>
					<li>-Jim Rohn</li>
					<li>By failing to prepare, you are preparing to fail</li>
					<li>-Benjamin Franklin</li>
				</ul>
			</div>
			<div className='home-div updates'>
				<h3>Upcoming features or updates!</h3>
			</div>
			<div className='home-div updates'>
				<ul>
					<li>Integration with Google Calendar</li>
					<li>User Management</li>
					<li>In-App focus timer</li>
					<li>User email notifications with summaries</li>
				</ul>
			</div>
		</div>
	);
};

export default HomePage;
