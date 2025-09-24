import React, { useState, useEffect } from "react";
import './inputWithSugg.css';

const InputWithSuggestions = ({
  field,
  value,
  onChange,
	className,
	title,
  children // InputText component as a child
}) => {
  const [isFocused, setIsFocused] = useState(false); // Track focus
  const [suggestions, setSuggestions] = useState([]); // Store suggestions
	const isTitledWeight = title === "weight";
	const isTitlePhone = title === "phone";


  // Load suggestions from localStorage on mount
  useEffect(() => {
    const savedSuggestions = JSON.parse(localStorage.getItem(field) || "[]");
    setSuggestions(savedSuggestions.slice(0, 3)); // Limit to last 3 values
  }, [field]);

  const suggestionsStyle = {
    top: title === 'weight' ? '79px' : '54px' , // Adjust the top position for the specific field
  };


	const handleInputChange = (field, inputValue) => {
    onChange(field, inputValue); //
	let previousEntries = JSON.parse(localStorage.getItem(field) || "[]");
    previousEntries = [
      inputValue,
      ...previousEntries.filter((v) => v !== inputValue),
    ].slice(0, 3); // Keep last 3 unique values
    localStorage.setItem(field, JSON.stringify(previousEntries));

    // Update suggestions
    setSuggestions(previousEntries);
  };

	const handleSuggestionClick = (selectedValue) => {
		setIsFocused(false); // Explicitly close after handling the click
		onChange(field, selectedValue);
	};

    // Replace the input content with the clicked suggestion

//  {console.log('nawar')}



  const handleBlur = () => {
    // Delay hiding suggestions to allow click events to register
    setTimeout(() => setIsFocused(false), 200);
  };

  const handleFocus = () => {
    setIsFocused(true); // Show suggestions on focus
  };

  return (
		<div className={`input-with-suggestions ${className || ''}`}>
      {/* Wrap the input component */}
      <div onFocus={handleFocus} onBlur={handleBlur}>
        {React.cloneElement(children, {
          value, // Pass the value to the child input
          getInputText: (field, inputValue) => onChange(field, inputValue), // Pass handler to input
        })}
      </div>

      {/* Suggestions */}
      {isFocused && suggestions.length > 0 && (
        <div className="suggestions-container"
				style=
				{{
					// top:isTitledWeight ?'79px':'54px'
					top: isTitledWeight ? '79px' : isTitlePhone ? '42px' : '54px',

				}} // Apply dynamic style
			>
											{console.log('inside div')}

          {suggestions.map((suggestion, index) => (
         <div
				 key={index}
				 className="suggestion-item"
				 onMouseDown={() => {
					console.log("Clicked Suggestion:", suggestion); // Debugging
					handleSuggestionClick(suggestion);
				}}
			>

              {suggestion}
							{console.log('suggestion',suggestion)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InputWithSuggestions;
