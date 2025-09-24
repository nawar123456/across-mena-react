import styles from './SelectBox.module.css';
import Select, { components } from "react-select";
import { useEffect, useState ,useRef} from 'react';
import { customStyle, CustomLoadingIndicator, formatLabelGoodsType, formatLabelMoveType, formatLabelContainer } from './Customs';
import { useTranslation } from 'react-i18next';

const SelectBox = ({typyForm,IconMobile,title,Padding,isHideTitle,
  styleEdit,Icon,placeholder,options,value, field ,index, valueSelect , isSearch
   ,isLoading,getSections,cursor, errorValue}) => {

  const [filteredSections , setFilteredSections] = useState([]);
  const {t,i18n} = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

	const [counters, setCounters] = useState(options.map(() => 0));
  const [localValue, setLocalValue] = useState(counters[index]); // Local state for editing

	const [activeCounterIndex, setActiveCounterIndex] = useState(null); // Track active counter
  const [selectedValue, setSelectedValue] = useState(null); // Track selected value
  const [menuIsOpen, setMenuIsOpen] = useState(false); // Control dropdown visibility
  const dropdownRef = useRef(null); // Ref for detecting outside clicks

	const resetIfAllCountersZero = (updatedCounters) => {
		const allZero = updatedCounters.every((count) => count === 0);
		if (allZero) {
			setSelectedValue(null); // Reset selected value locally
			valueSelect(field, null, index); // Pass null explicitly to the parent
			value=null;
			setActiveCounterIndex(null); // Reset active counter index
		}
	};



	const incrementCounter = (index) => {
		setCounters((prev) => {
			// Reset all counters to 0 and increment the selected one
			const updated = prev.map((count, i) =>
				i === index ? (count < 40 ? count + 1 : count) : 0
			  );

			  if (updated[index] === 40) {
				console.warn('Maximum counter value reached (40)');
			  }

			// Update the selected value
			setSelectedValue({
				...options[index],
				counter: updated[index],
			});

			// Update active counter index
			setActiveCounterIndex(index);

			// Sync with parent state
			valueSelect(field, {
				...options[index],
				counter: updated[index],
			});

			return updated;
		});
	};

	const decrementCounter = (index) => {
		setCounters((prev) => {
			const updated = prev.map((count, i) => (i === index ? Math.max(0, count - 1) : 0));

			// If the selected value matches and counter becomes zero, reset it
			if (updated[index] === 0) {
				setSelectedValue(null);
				valueSelect(field, null);
				setActiveCounterIndex(null);
			} else {
				setSelectedValue({
					...options[index],
					counter: updated[index],
				});
				valueSelect(field, {
					...options[index],
					counter: updated[index],
				});
			}

			return updated;
		});
	};
	const toggleMenu = () => {
    setMenuIsOpen((prev) => !prev);
  };





	useEffect(() => {
    resetIfAllCountersZero(counters);
  }, [counters])

  const handleSelectOption = (option, index) => {
		if (counters[index] === 0) {
      console.warn('You cannot select an option with a counter value of 0.');
      return; // Prevent selection
    }
    setSelectedValue({
      ...option,
      counter: counters[index], // Store the counter value with the selected option
    });
		console.log(`Selected Option: ${option.title}, Counter Value: ${counters[index]}`);

    valueSelect(field, { ...option, counter: counters[index] }); // Notify parent
    setMenuIsOpen(false); // Close dropdown after selection
  };

	const CustomMenu = (props) => {
		return (
			<components.Menu {...props}>
				<div className={styles.menuContainer}>
					{props.options.map((option, index) => (
						<div
						key={index}
						className={styles.optionRow}
						onClick={() => handleSelectOption(option, index)}
						>
							{/* Left: Container Icon */}
							<img
								src={option.img}
								alt="container-icon"
								className={styles.optionIcon}
							/>

							{/* Right: Title and Details */}
							<div className={styles.optionText}>
								<div className={styles.optionTitle}>{option.title}</div>
								<div className={styles.optionDetails}>{option.details}</div>
							</div>

							{/* Counter Controls */}
							<div className={styles.counterControls}>
  <button
    className={`${styles.counterBtn}`}
    onClick={(e) => {
      e.stopPropagation(); // Prevent dropdown from closing
      e.preventDefault(); // Prevent focus shift
      incrementCounter(index);
    }}
  >
    +
  </button>

	<input
  type="text"
  className={styles.counterInput}
  value={counters[index]}
	onFocus={(e) => {
    // Ensure the text is selectable on focus
    const { value } = e.target; // Get the current value
    e.target.setSelectionRange(value.length, value.length); // Move cursor to the end
  }}
  onClick={(e) => {
    // Focus and place the cursor where the user clicks
    e.stopPropagation(); // Prevent dropdown or other parent handlers
  }}
  onChange={(e) => {
    const newValue = e.target.value.replace(/\D/g, "");
    const clampedValue = Math.min(Math.max(parseInt(newValue || "0", 10), 0), 40);
    setCounters((prev) =>
      prev.map((count, i) => (i === index ? clampedValue : count))
    );
    if (clampedValue > 0) {
      setSelectedValue({
        ...options[index],
        counter: clampedValue,
      });
      valueSelect(field, {
        ...options[index],
        counter: clampedValue,
      });
      setActiveCounterIndex(index);
    } else {
      setSelectedValue(null);
      valueSelect(field, null);
      setActiveCounterIndex(null);
    }
  }}

  onBlur={() => {
    const clampedValue = Math.min(Math.max(counters[index], 0), 40);
    setCounters((prev) =>
      prev.map((count, i) => (i === index ? clampedValue : count))
    );
  }}
/>



  <button
    className={`${styles.counterBtn} ${
      activeCounterIndex !== null && activeCounterIndex !== index
        ? styles.disabledBtn
        : ''
    }`}
    onClick={(e) => {
      e.stopPropagation(); // Prevent dropdown from closing
      e.preventDefault(); // Prevent focus shift
      decrementCounter(index);
    }}
    disabled={activeCounterIndex !== null && activeCounterIndex !== index}
  >
    -
  </button>
</div>

						</div>
					))}



{/* Selected Value and Close Button */}
        <div className={styles.closeButtonContainer}>
          {selectedValue ? (
            <div className={styles.selectedValueDisplay}>
              <strong>{t('labelProhibitedPage.Result')}:</strong> {selectedValue.title} ({selectedValue.counter || 0})
            </div>
          ) : (
            <div className={styles.selectedValueDisplay}>
              {t('labelHomePage.noSelection')}
            </div>
          )}
					     <button
  className={styles.closeButton}
  onClick={(e) => {
    e.stopPropagation(); // Prevent dropdown from closing unintentionally
    handleDoneClick(); // Call the new handler
  }}
>
  {t('actions.doneBtn')}
</button>
        </div>
				</div>
			</components.Menu>
		);
  };
	const CustomSingleValue = (props) => (
    <components.SingleValue {...props}>
      <div className={styles.singleValueContainer}
	     onMouseDown={(e) => {
				e.stopPropagation(); // Prevent default event propagation
				toggleMenu(); // Toggle dropdown when clicking on SingleValue
			}}
			style={{ cursor: 'pointer' }}
		>
        <div>
          <span>{props.data.title}</span>{" "}
          <span className={styles.singleValueCounter}>
            ({props.data.counter || 0}) {/* Show counter value */}
          </span>
        </div>
      </div>
    </components.SingleValue>
  );




  useEffect(()=>{

    if(isLoading===false && options?.length > 0 &&field==="selectTypeGoods"){
    const FilterArray = options.filter(obj => obj.id !== 19 && obj.id !== 21);
    const newObj = {id:
			"22",label:t('labelServices.AllKindsGoods')}
    const newArray = [newObj, ...FilterArray];
    setFilteredSections(newArray);

  }else if (field==="typeMove" || field==="selectContainer" ){
    setFilteredSections(options);


  }else if ( field==="selectTypeGoodsChapter"){

    let arrayOptions= Object.values(options).flat();
    setFilteredSections(arrayOptions);

  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isLoading,i18n.language,t])




  let formatLabel;
  switch (field) {
    case 'typeMove':
      formatLabel = formatLabelMoveType;
      break;
    case 'selectTypeGoods':
      formatLabel = formatLabelGoodsType;
      break;
    case 'selectTypeGoodsChapter':
      formatLabel = formatLabelGoodsType;
      break;
    case 'selectContainer':
      formatLabel = formatLabelContainer;
      break;
    // case 'sea-load':
    // case 'sea-discharge':
    //   formatLabel = formatLabelPort;
    //   break;
    default:
      break;
  }



  const handleSelect = (e)=>{
        valueSelect(field,e,index)
        setMenuIsOpen(false);
  }

    // const [, setInputValue] = useState('');

		useEffect(() => {
			resetIfAllCountersZero(counters);
		}, [counters]);

const handleSelectClick = () => {
    if((isSearch && field==="selectTypeGoods")||(isSearch && field==="selectTypeGoodsChapter")){
      setMenuIsOpen((menuIsOpen)=>!menuIsOpen);
    if(typyForm==="Sea")
    return;

    getSections();

    }
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      // Save the selected value when clicking outside
      if (selectedValue) {
        valueSelect(field, selectedValue, index); // Save selected value in parent
      }


			if(menuIsOpen){
      setMenuIsOpen(false); // Close dropdown
    }
	}
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [selectedValue])

  const handleClose = () => {
setMenuIsOpen(!menuIsOpen);
	};


	const handleDoneClick = () => {
		if (selectedValue) {
			valueSelect(field, selectedValue, index); // Save selected value to parent
		} else if (activeCounterIndex !== null) {
			// If there's an active counter but no selected value, save the currently active option
			const currentOption = options[activeCounterIndex];
			const finalSelection = {
				...currentOption,
				counter: counters[activeCounterIndex],
			};
			setSelectedValue(finalSelection);
			valueSelect(field, finalSelection, index);
		}
		if(menuIsOpen){
		setMenuIsOpen(false); // Close dropdown
		}
		resetIfAllCountersZero(counters); // Check counters on Done click

	};


	useEffect(() => {
		if (selectedValue) {
			valueSelect(field, selectedValue, index); // Sync parent with the selected value
		}
	}, [selectedValue]);

	useEffect(() => {
    if (value) {
      valueSelect(field, null, index); // Reset the value in the parent state
    }
  }, [i18n.language]); // Trigger when the language changes

	useEffect(() => {
		setSelectedValue(null);
		setCounters(options.map(() => 0)); // Reset counters
		setActiveCounterIndex(null);
		valueSelect(field, null); // Inform parent
	}, [i18n.language, options]);
// reset the selectBox final trying WWWOOORRRKKK(Nawar)



    return (
    <div ref={dropdownRef}


		className={styles['input-box']}
		style={{ cursor: 'pointer' }}

		>

    <span className={styles[`input-label`]} style={{display: isHideTitle && 'none'}} >
        {title}
    </span>



    <Select
            value={selectedValue  || null || value}
            placeholder={placeholder}
            formatOptionLabel={formatLabel}
            noOptionsMessage={()=>t('labelDutiesCalculator.noOptions')}
            options={filteredSections}
						onChange={(e) => setSelectedValue(e)} // Handle direct selection
						// assign onChange function
          isClearable={true}
          styles={customStyle(IconMobile,Padding,cursor,errorValue,value,Icon,isRtl)}
          menuShouldScrollIntoView={false}
          isSearchable ={isSearch}
          menuIsOpen={menuIsOpen}
          onMenuOpen={() => setMenuIsOpen(true)} // Open dropdown
          onMenuClose={() => setMenuIsOpen(false)} // Close dropdown
          isLoading={isLoading}
          className={styles['custom-select']}
					onBlur={() => {
						// Ensure dropdown closes on blur
						setMenuIsOpen(false);
						if (selectedValue) {
							valueSelect(field, selectedValue, index); // Save selected value to parent
						} else if (activeCounterIndex !== null) {
							// If there's an active counter but no selected value, save the currently active option
							const currentOption = options[activeCounterIndex];
							const finalSelection = {
								...currentOption,
								counter: counters[activeCounterIndex],
							};
							setSelectedValue(finalSelection);
							valueSelect(field, finalSelection, index);
						}
						resetIfAllCountersZero(counters); // Check counters on blur

					}}
					components={{
					Menu: CustomMenu, // Custom dropdown
					SingleValue: CustomSingleValue, // Custom input display
						}}
						 />


        <span className={styles['input-icon']} style={styleEdit}>
            {Icon}
        </span>

    </div>

  )
  }

export default SelectBox;
