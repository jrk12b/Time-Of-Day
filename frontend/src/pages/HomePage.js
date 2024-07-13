import React from 'react';
import '../css/Home.css';
import { testIds } from '../testIds';

const HomePage = () => {
	return (
		<div data-testid={testIds.home.homeDiv}>
			<div className="video-background">
				<video autoPlay muted loop id="bg-video">
					<source src={`${process.env.PUBLIC_URL}/clock.mp4`} type="video/mp4" />
					Your browser does not support the video tag.
				</video>
			</div>
			<div data-testid={testIds.home.welcomeBanner} className="welcome-banner">
				<div data-testid={testIds.home.homeHeader} className="home-header">
					<h1>Time Of Day</h1>
					<div className="motivation">
						<p>Either you run the day or the day runs you.</p>
					</div>
				</div>
			</div>
			<div data-testid={testIds.home.details} className="details">
				<p>
					Time Of Day is a powerful and intuitive app designed to help you manage and optimize your
					daily schedule. With Time Of Day, you can easily input your daily activities and track how
					many hours you spend on each task. The app then provides detailed charts and graphs,
					allowing you to visualize your time distribution over weeks or months. Whether you’re
					aiming to improve productivity, balance work and leisure, or simply gain insights into
					your daily routines, Time Of Day offers the tools you need to take control of your time.
					Start making every hour count with Time Of Day!
				</p>
				<div data-testid={testIds.home.instructions} className="instructions">
					<h3>User Instructions</h3>
					<ul>
						<li>Start by adding Today's activities by navigating to the Today's Time page</li>
						<li>After adding all of Today's activities, select Submit All Activities.</li>
						<li>Then, navigate to the Your Time page to view all of your saved time.</li>
						<li>
							On the Your Time page, you can also view various charts, graphs, and data on your
							time!
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
