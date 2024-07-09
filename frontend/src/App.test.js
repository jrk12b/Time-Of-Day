import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
	render(<App />);

	// Look for an element with specific text content
	const headingElement = screen.getByText(/Home/i);
	expect(headingElement).toBeInTheDocument();
});
