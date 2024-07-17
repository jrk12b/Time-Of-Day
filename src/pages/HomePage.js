import React from 'react';
import '../css/Home.css';
import { testIds } from '../testData/testIds';
import { textContent } from '../textContent';

const HomePage = () => {
	return (
		<div data-testid={testIds.home.homeDiv}>
			<div className="video-background">
				<video autoPlay muted loop id="bg-video">
					<source src={`${process.env.PUBLIC_URL}/clock.mp4`} type="video/mp4" />
					{textContent.browser.videoNotSupported}
				</video>
			</div>
			<div data-testid={testIds.home.welcomeBanner} className="welcome-banner">
				<div data-testid={testIds.home.homeHeader} className="home-header">
					<h1>{textContent.home.homeHeader}</h1>
					<div className="motivation" data-testid={testIds.home.motivation}>
						<p>{textContent.home.motivation}</p>
					</div>
				</div>
			</div>
			<div data-testid={testIds.home.details} className="details">
				<p>{textContent.home.details}</p>
				<div data-testid={testIds.home.instructions} className="instructions">
					<h3>{textContent.home.instructionsHeader}</h3>
					<ul>
						<li>{textContent.home.instructions1}</li>
						<li>{textContent.home.instructions2}</li>
						<li>{textContent.home.instructions3}</li>
						<li>{textContent.home.instructions4}</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
