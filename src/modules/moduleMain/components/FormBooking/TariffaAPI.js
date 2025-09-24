import React, { useEffect, useState,useRef, forwardRef } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Mark from 'mark.js'; // Import mark.js
import { Autocomplete, TextField, Typography, InputAdornment } from '@mui/material';
import { useTranslation } from 'react-i18next';
import InputWithSuggestions from './InputWithSuggestions';

const CustomTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: '1.4px solid #eaeaea', // Default border color

    },
    '&:hover fieldset': {
      border: '1.4px solid #eaeaea', // Border color on hover
    },
    '&.Mui-focused fieldset': {
      border: '1px solid #fcc400', // Border color when focused
    },
        '& input': {
            // textAlign:'center', when i enter text inside this input the postion that is
            fontSize: '16px', //work

            // Ensure the input text starts from the beginning
    },
  },
  '& .MuiInputLabel-root': {
    color: '#727272 !important', // Default label color
        fontSize: '16px !important', // Adjust font size here

    },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#fcc400', // Label color when focused
  },
});

const TariffaAutoInput =forwardRef(({ onSelectId, defaultLabel,shouldClearForm ,hasError,},ref) => {
    const {t} = useTranslation();
  const [options, setOptions] = useState([]);
      const savedLabel = localStorage.getItem('formData.selectedCommodityLabel')||defaultLabel ;
        const [inputValue, setInputValue] = useState(defaultLabel || '');
        const inputRef = useRef(null); // Create a ref for the input
const fetchSuggestions = async (value = '') => {
  try {
const response = await axios.get(`https://acrossmena.xyz/tariff/search/?search=${value}`);
    const results = response.data.results.slice(0, 15); // limit to first 10

    setOptions(results);
  } catch (error) {
    console.error('Error fetching data:', error);
    setOptions([]);
  }
};
const handleFocus = () => {
  if (options.length === 0) {
    fetchSuggestions(); // fetch first 10 items
  }
};

    // useEffect(() => {
  //   const savedLabel = localStorage.getItem('selectedCommodityLabel') || defaultLabel;
  //   setInputValue(savedLabel);
  // }, [defaultLabel]);

    useEffect(() => {
    if (shouldClearForm) {
      setInputValue(''); // Reset the input value
      onSelectId(null, ''); // Clear selected ID and label
    }
  }, [shouldClearForm, onSelectId]);
    const handleInputChange = async (event, value) => {
    if (event?.type === 'change' && value !== null) {
      setInputValue(value);

      if (value) {
        try {
const response = await axios.get(`https://acrossmena.xyz/tariff/search/?search=${value}`);

          // Separate results into two lists based on matches in `label` and `label_en`
          const labelMatches = response.data.results.filter(option =>
            option.label && option.label.toLowerCase().includes(value.toLowerCase())
          );

          const labelEnMatches = response.data.results.filter(option =>
            option.label_en && option.label_en.toLowerCase().includes(value.toLowerCase())
          );
                    //💋💋👏

          // Combine both lists, removing duplicates by `id`
          const combinedOptions = [
            ...labelMatches,
            ...labelEnMatches.filter(
              enOption => !labelMatches.some(labelOption => labelOption.id === enOption.id)
            )
          ];

          // console.log('Combined Options:', combinedOptions); // Debugging line
          setOptions(combinedOptions);
        } catch (error) {
          // console.error('Error fetching data:', error);
          setOptions([]);
        }
      } else {
        setOptions([]);
      }
    }
  };
  const highlightMatch = (text, searchTerm) => {
    const markInstance = new Mark(document.querySelectorAll('.option-mark'));
    markInstance.unmark(); // Clear any previous highlights
    if (searchTerm && text.toLowerCase().includes(searchTerm.toLowerCase())) {
      markInstance.mark(searchTerm);
    }
  };
    const handleOptionChange = (event, newValue) => {
        if (newValue) {
            const selectedLabel = newValue.label || newValue.label_en;
      // setInputValue(newValue.label || newValue.label_en);
            setInputValue(selectedLabel);
            onSelectId(newValue.id, selectedLabel);

      // onSelectId(newValue.id, newValue.label || newValue.label_en);
            localStorage.setItem('selectedCommodityId', newValue.id);
            localStorage.setItem('selectedCommodityLabel', selectedLabel);

            // Focus the input and move cursor to the start
            setTimeout(() => {
                    if (inputRef.current) {
                            inputRef.current.focus();
                            inputRef.current.setSelectionRange(0, 0); // Set cursor at the start
                    }
            }, 0);
    } else {
            setInputValue('');
            onSelectId(null, '');
            localStorage.removeItem('selectedCommodityId');
            localStorage.removeItem('selectedCommodityLabel');
    }
};

React.useImperativeHandle(ref, () => ({
    focus: () => {
        if (inputRef.current) {
            inputRef.current.focus();
            inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    },
}));
  return (
        <>
        {/* {console.log(`🎂`)}
        {console.log(savedLabel)}
        {console.log("betw")}

        {console.log(inputValue)}
        {console.log("betw")}

        {console.log(defaultLabel)} */}

           <Typography variant="h6" component="label" htmlFor="commodity-search" style={{color:'#727272 !important',fontSize:'18px'}}>
<p style={{color:'#727272'}}>
{t('bookingTitles.commodity')}

</p>
      </Typography>

            <InputWithSuggestions
        field="commodity"
        value={inputValue}
        onChange={(field, value) => handleInputChange(null, value)}
        suggestions={options.map(option => option.label || option.label_en)}
        onSuggestionClick={(value) => {
          const selectedOption = options.find(
            option => option.label === value || option.label_en === value
          );
          handleOptionChange(null, selectedOption);
        }}
      >
    <Autocomplete
     ListboxProps={{
    style: {
      maxHeight: '200px', // control height here
      overflowY: 'auto',
    },
  }}
      options={options}
            getOptionLabel={(option) => option.label || option.label_en} // Ensure that `option.label` corresponds to the correct key in your results
      onInputChange={handleInputChange}
      inputValue={inputValue}
        onFocus={handleFocus} // 👈 Fetch 10 items on focus
      renderInput={(params) => (
                <CustomTextField
                {...params}
                inputRef={inputRef} // Attach the ref here
                variant="outlined"
                placeholder={t('bookingTitles.labelCommodity')} // No placeholder needed; label is provided in adornment
                style={{
                    borderColor: hasError ? 'red' : '#eaeaea', // Apply red border if error exists
                }}
                InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                        <InputAdornment position="start" style={{ margin: 'auto' }}>
                            <Typography style={{ color: '#727272 !important', textAlign: 'center', width: '100%' }}>
                            </Typography>
                        </InputAdornment>
                    ),
                }}
            />
      )}
            renderOption={(props, option) => {
                // Highlight only the relevant match in either `label` or `label_en`
                const isLabelMatch = option.label && option.label.toLowerCase().includes(inputValue.toLowerCase());
                const textToHighlight = isLabelMatch ? option.label : option.label_en;

                setTimeout(() => highlightMatch(textToHighlight, inputValue), 0);

                return (
                    <li {...props}>
                        <div className="option-mark">
                            {option.label}  {/* Display both labels */}
                        </div>
                    </li>
                );
            }}
      onChange={handleOptionChange}
        // Handle the selection of a value
        // console.log('Selected Value: ', newValue);

    />
              </InputWithSuggestions>

        </>
  );
});

export default TariffaAutoInput;
