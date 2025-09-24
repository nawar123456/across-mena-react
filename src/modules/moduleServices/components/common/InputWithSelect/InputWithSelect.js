import './InputWithSelect.css';
// import inputIcon from '../../../../../assets/icons/weight-icon.svg'
import { useTranslation } from 'react-i18next';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import { forwardRef } from 'react';

const InputWithSelect = forwardRef(
	(
		{notDecimal,valueCheck,getCheckToggle,placeholder,title,textWeightValue,untiText,showunitText,hideSelect,Icon,selectUnit,field,fieldUnit,index,optionsArray,getInputText,getinputSelect,errorUnit,errorValue,pattern,onKeyPress,isArabic},ref)=> {

  const {t} = useTranslation();

//   const formatDecimalComma = (value) => {
// 	const numericValue = value.replace(/[^\d]/g, ''); // Remove non-numeric characters
// 	const formattedValue = numericValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'); // Add periods
// 	return formattedValue.replace(/\./g, ','); // Replace periods with commas
//   };

const formatWithComma = (value, isArabic) => {
	// Remove non-numeric characters
	const numericValue = value.replace(/[^\d]/g, '');

	// Format with commas
	const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

	// If Arabic numeral formatting is enabled, convert digits to Arabic
	return isArabic
	  ? formattedValue.replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d])
	  : formattedValue;
  };
  const handleInputText = (e) => {
	const value = e.target.value;


	if (notDecimal && !/^\d*$/.test(value)) {
	 return;
	}

    const formattedValue = formatWithComma(value,isArabic); // Apply comma formatting
      getInputText(field, formattedValue, index);
    };

    const handleClick = (e)=>{
        e.preventDefault();
        // try{
        // e.target.select();
        // }
        // catch(e){

        // }
        }
				const handleKeyDown = (e) => {
					const { key } = e;
					const currentValue = e.target.value;

					if (notDecimal) return; // Allow all keys if `notDecimal` is true

					// Block non-numeric keys except backspace, tab, and delete
					if (
						!/^[0-9]$/.test(key) && // Not a digit
						key !== '.' && // Not a decimal point
						key !== 'Backspace' &&
						key !== 'Tab' &&
						key !== 'Delete'
					) {
						e.preventDefault();
					}

					// Prevent multiple decimal points
					if (key === '.' && currentValue.includes('.')) {
						e.preventDefault();
					}
				};


    return (
    <div className='input-parent'>

            <span className='input-label' >
            {title}
            </span>


            <input
						// inputMode={ notDecimal ?"": 'decimal'}
						inputMode={notDecimal ? 'text' : 'decimal'} // Allow decimal input
						title=''
            required
			ref={ref}
            value={textWeightValue}
            placeholder={placeholder}
            onChange={handleInputText}
            onClick={handleClick}
            className='input-text'
            // style={{borderColor:errorValue ? '#f60000':isFocusedInput ?'#fcc400':'#b5b5b58c'}}
            style={{borderColor:(errorValue && textWeightValue?.trim()==="") && '#f60000' , padding:(!Icon &&'10px')}}

            type='text'

					/>


            {hideSelect ===undefined &&
            <div  className='input-select' style={{width: showunitText ===true && '50px'}}>
            {showunitText ===true ?
            <span className='unit-input'>
            {untiText ? untiText:"Cm"}
            </span>
            :
            <>

            <ToggleSwitch
						unit1Title={t('labelServices.ton')}
						unit2Title={t('labelServices.keloGram')}
						 changeToggle={getCheckToggle}
						  valueCheck={valueCheck}
							 index={index}/>

            </>


            }
            </div>
            }


            </div>
		)

}
)
export default InputWithSelect
