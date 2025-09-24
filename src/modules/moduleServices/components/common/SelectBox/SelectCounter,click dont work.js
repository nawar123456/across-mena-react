import styles from './SelectBox.module.css';
import Select, { components } from "react-select";
import { useEffect, useState } from 'react';
import { customStyle, CustomLoadingIndicator, formatLabelGoodsType, formatLabelMoveType, formatLabelContainer } from './Customs';
import { useTranslation } from 'react-i18next';

const SelectBox = ({typyForm,IconMobile,title,Padding,isHideTitle,styleEdit,Icon,placeholder,options,value, field ,index, valueSelect , isSearch ,isLoading,getSections,cursor, errorValue}) => {

  const [filteredSections , setFilteredSections] = useState([]);
  const {t,i18n} = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

	const [counters, setCounters] = useState(options.map(() => 0));
  const [selectedValue, setSelectedValue] = useState(null); // Track selected value

  const incrementCounter = (index) => {
    setCounters((prev) => {
      const updated = [...prev];
      updated[index] += 1;
      return updated;
    });
  };

  const decrementCounter = (index) => {
    setCounters((prev) => {
      const updated = [...prev];
      updated[index] = Math.max(0, updated[index] - 1); // Prevent negative values
      return updated;
    });
  };

	const handleSelectOption = (option, index) => {
    setSelectedValue({
      ...option,
      counter: counters[index], // Add the counter value to the selected option
    });
    valueSelect(field, option); // Notify parent of the selected option
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
									className={styles.counterBtn}
									onClick={(e) => {
										e.stopPropagation(); // Prevent dropdown from closing
										decrementCounter(index);
									}}								>
									-
								</button>
								<span className={styles.counterValue}>{counters[index]}</span>
								<button
									className={styles.counterBtn}
									onClick={() => incrementCounter(index)}
								>
									+
								</button>
							</div>
						</div>
					))}
				</div>
			</components.Menu>
		);
  };
	const CustomSingleValue = (props) => (
    <components.SingleValue {...props}>
      <div className={styles.singleValueContainer}>

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


	useEffect(() => {
    if (value) {
      valueSelect(field, null, index); // Reset the value in the parent state
    }
  }, [i18n.language]); // Trigger when the language changes


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

    const [menuIsOpen, setMenuIsOpen] = useState(false);


const handleSelectClick = () => {
    if((isSearch && field==="selectTypeGoods")||(isSearch && field==="selectTypeGoodsChapter")){
      setMenuIsOpen((menuIsOpen)=>!menuIsOpen);
    if(typyForm==="Sea")
    return;

    getSections();

    }
  };

  const handleClose = () => {
    if((isSearch && field==="selectTypeGoods") || (isSearch && field==="selectTypeGoodsChapter")){
      setMenuIsOpen(false);
    }
  };


    return (
    <div  className={styles['input-box']}>

    <span className={styles[`input-label`]} style={{display: isHideTitle && 'none'}} >
        {title}
    </span>

    <Select
            value={selectedValue}
            placeholder={placeholder}
            formatOptionLabel={formatLabel}
            noOptionsMessage={()=>t('labelDutiesCalculator.noOptions')}
            options={options}
						onChange={(e) => setSelectedValue(e)} // Handle direct selection
						// assign onChange function
            isClearable={true}
            styles={customStyle(IconMobile,Padding,cursor,errorValue,value,Icon,isRtl)}
            menuShouldScrollIntoView={false}
            isSearchable ={isSearch}
            menuIsOpen={ isSearch ? menuIsOpen : undefined}
            onMenuOpen={handleSelectClick}//onclick
            onMenuClose={handleClose}
            isLoading={isLoading}
            className={styles['custom-select']}
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
