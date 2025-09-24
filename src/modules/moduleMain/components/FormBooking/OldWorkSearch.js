import React, { useState, useEffect } from 'react';
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  components: {
    // Style overrides for the MUI TextField
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: '#fcc400', // Change border color on focus
            },
          },
        },
        // Optional: Change the label color on focus
        MuiInputLabel: {
          styleOverrides: {
            root: {
              '&.Mui-focused': {
                color: '#fcc400', // Change label color on focus
              },
            },
          },
        },
      },
    },
  },
});
const TariffaAutoInput = ({ apiEndpoint }) => {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
//   const [id, setId] = useState(null);
//   const [label, setLabel] = useState(null);
  const [selectedID,setSelectedId]=useState(null)
  const fetchSuggestions = async (query) => {
    if (query.length < 2) { // Minimum characters to start searching
      setOptions([]);
      return;
    }

    setLoading(true);
    try {
      // const response = await fetch(`https://across-mena.com/Fee_calculator/fees/?search=${query}`);
       const response = await fetch(`http://148.230.71.233:8000//Fee_calculator/fees/?search=${query}`);

      const data = await response.json();

	//   const suggestions =
	//   data
	//   .filter(item =>
	// 	String(item.id).toLowerCase().includes(query.toLowerCase()) ||
	// 	item.label.toLowerCase().includes(query.toLowerCase())
	//   )

	//   .map(item => ({
	// 		id:item.id,
	// 		label: item.label,
	// 	  }));
	  const suggestions = data.map(item =>

		({
			id:item.id,
			label: item.label,
		  }));
	  // Arabic
	//   const suggestions = data.map(item => item.label_en); //
     setOptions(suggestions);
       // Set your options here based on the API response
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchSuggestions(inputValue);
    }, 300); // adjust the debounce delay as needed

    return () => clearTimeout(delayDebounceFn);
  }, [inputValue]);

  return (
	<ThemeProvider theme={theme}>

    <Autocomplete
      freeSolo // Allow custom user inputs
      options={options}
      loading={loading}
	  onChange={(event, newValue) => {
        if (newValue) {

         // setSelectedId(newValue.id); // Save the selected id
         // setInputValue(newValue.label); // Optionally set the input to the label
		  {console.log(newValue.id)}

        } else {
          setSelectedId(null); // Clear the selected ID if no value
        }
      }}
      onInputChange={(event, newValue) => {
        setInputValue(newValue); // Update input value
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search..."
          variant="outlined"
          fullWidth
        />
      )}
      renderOption={(props, option) => (
        <li {...props} key={option.id}>
          {option.id}{"  "}{option.label}

        </li>
      )}
    />
	 </ThemeProvider>
  );
};

export default TariffaAutoInput;
