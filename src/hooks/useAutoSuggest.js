import { useState } from 'react';

/**
 * Custom hook for handling autosuggest functionality.
 * Manages suggestions based on user input and provides functions for fetching, clearing, and rendering suggestions.
 *
 * @param {string[]} allNames - Array of all possible activity names.
 * @returns {object} - An object containing suggestions, and functions to handle fetching, clearing, getting, and rendering suggestions.
 */
const useAutoSuggest = (allNames) => {
	const [suggestions, setSuggestions] = useState([]);

	const onSuggestionsFetchRequested = ({ value }) => {
		const inputValue = value.trim().toLowerCase();
		const inputLength = inputValue.length;

		const filteredSuggestions =
			inputLength === 0
				? []
				: allNames.filter((name) => name.toLowerCase().slice(0, inputLength) === inputValue);

		setSuggestions(filteredSuggestions);
	};

	const onSuggestionsClearRequested = () => {
		setSuggestions([]);
	};

	const getSuggestionValue = (suggestion) => suggestion;

	const renderSuggestion = (suggestion) => <div>{suggestion}</div>;

	return {
		suggestions,
		onSuggestionsFetchRequested,
		onSuggestionsClearRequested,
		getSuggestionValue,
		renderSuggestion,
	};
};

export default useAutoSuggest;
