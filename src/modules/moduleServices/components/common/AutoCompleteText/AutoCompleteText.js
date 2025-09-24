import './AutoCompleteText.css';
import { useTranslation } from 'react-i18next';
import LoadingResults from '../../../../../components/LoadingResutls/LoadingResults';
import { useEffect,useState } from 'react';
import localSyriaFlag from '../../../../../assets/icons/flag-Syria-01.svg';
import localTurkeyFlag from '../../../../../assets/icons/flag-turkey-01.svg';


const AutoCompleteText = ({loadingCity,titleInput,loadingWriting,handleClickColor,Icon,placeholder,inputf,options,isLoading,errorApi,query,loadingTimerSelected,errorValue,value,field,valueSelect,handleInputText,resetPorts,refSearch,refInput,refDropDown,recentValues}) => {
// nawar hasan dsadasda
  const {t,i18n} = useTranslation();
  const [showRecent, setShowRecent] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  const isArabic = (text) => {
    return /[\u0600-\u06FF]/.test(text); // Check if text contains Arabic characters
  };
  const handleRecentClick = (item) => {
    valueSelect(field, item); // Pass the selected value to the parent
		setShowRecent(false); // Hide recent selections dropdown

	};
 
  const normalizeArabic = (text) => {
    return text.replace(/[أإآا]/g, "ا");
  };
  const normalizeCountryCode = (code) => {
    return code?.replace(/[()]/g, ''); // remove parentheses like (SY) → SY
  };

  const filteredOptions = options.filter(item => {
    const queryNormalized = normalizeArabic(query);
    
    // Port names in Arabic and English
    const portNameArabic = item?.name_arabic ? normalizeArabic(item.name_arabic) : "";
    const portNameEnglish = item?.name ? normalizeArabic(item.name) : "";
  
    // Country names in Arabic and English
    const countryNameArabic = item?.origin?.label_ar ? normalizeArabic(item.origin.label_ar) : "";
    const countryNameEnglish = item?.origin?.label ? normalizeArabic(item.origin.label) : "";
  
    if (isArabic(query)) {
      // If Arabic input, prioritize Arabic names
      return portNameArabic.includes(queryNormalized) || countryNameArabic.includes(queryNormalized);
    }
  
    // Otherwise, search normally in both Arabic & English
    return portNameArabic.includes(queryNormalized) || 
           portNameEnglish.includes(queryNormalized) || 
           countryNameArabic.includes(queryNormalized) || 
           countryNameEnglish.includes(queryNormalized);
  });
  const handleChangeText = (e) => {
    const normalizedQuery = normalizeArabic(e.target.value);
    handleInputText(field, normalizedQuery);
    setShowRecent(false); // Hide recent selections when typing
  };
  

	const handleInputClick = () => {
    setShowRecent(true); // Show recent selections on input click
  };

  useEffect(() => {
    if (isLoading || loadingTimerSelected || loadingCity) {
      setLocalLoading(true);
    } else {
      setLocalLoading(false);
    }
  }, [isLoading, loadingTimerSelected, loadingCity]);
  



  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        refInput.current &&
        !refInput.current.contains(event.target)
      ) {
        setShowRecent(false); // Hide recent selections on outside click
      }
    };


    
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [refInput, refDropDown]);



  const showRecentValues = showRecent && query?.length === 0 && recentValues?.length > 0;


  // useEffect(() => {
  //   if (refSearch?.current) {
  //     refSearch.current.value = ''; // Clear the input value
  //     handleInputText(field, ''); // Reset the value in the parent state
  //   }
  // }, [i18n.language]); // Triggered when the language changes
	// if the language change make the inp empty but i want when make search dont maje it empty


  const chooseValue = (item)=>{

    valueSelect(field,item);

  }

const getFlagImage = (item) => {
  const code = normalizeCountryCode(
    item?.origin?.countries_code ||
    item?.origin?.country_code ||
    item?.countries_code ||
    item?.country_code
  );

  const countryName = item?.origin?.label || item?.port_country;

  if (code === 'SY' || countryName === 'Syrian Arab Republic' || countryName=== 'الجمهورية العربية السورية') {
    return localSyriaFlag;
  }

  if (code === 'TR' || countryName === 'Turkey' || countryName === 'تركيا') {
    return localTurkeyFlag;
  }

  return item?.origin?.ImageURL || item?.port_flag;
};
  
  return (
    <>
    {titleInput &&

    <p className='autocomplete-title'>
      {titleInput}
    </p>

    }
    <div className='automcomplete-searchbox' >
      {/* if name (${value?.port_code}) else ${value?.origin?.countries_code}   */}
      {/* input text */}
      <div ref={refInput}   className='automcomplete-searchbox__row' style={{borderColor:(errorValue&&!value) ?'red' : null}} >
      <span className='automcomplete-searchbox__row-icon'>
            {Icon}
      </span>
        <input onClick={handleInputClick} ref={refSearch} onChange={handleChangeText} title="" className='automcomplete-searchbox__row-input' type='text' placeholder={placeholder} autoComplete='off' style={{fontSize:'18px !important'}}  />


        { (( value && !value?.description)) &&
        <div  className='automcomplete-searchbox__row-details'>
        <span className='automcomplete-searchbox__row-details-code'>
          {value?.name ?
            `(${value?.port_code || value?.airport_code})`
            :
            `${value?.origin?.countries_code}`
          }
        </span>

        {(value?.origin?.ImageURL || value?.port_flag) &&
          <img className='automcomplete-searchbox__row-img'
          src={getFlagImage(value)}
          alt='flag icon'/>
        }
        </div>
        }


      </div>


			     {/* Recent Selections */}
					 {showRecentValues && (
          <div className="autocomplete-recent">
            <p className="autocomplete-recent-title">{t('labelHomePage.recentSelection')}</p>
            <ul className="autocomplete-recent-list">
              {recentValues
							.filter(item => !item.origin?.ports)
							.map((item, index) => (

                <li
                  key={index}
                  onClick={() => handleRecentClick(item)}
                  className="autocomplete-recent-item"
                >

                  <span>{item.name}</span>

                  <span>({item.port_code})</span>
									{/* {console.log('item',item)} */}

                </li>
              ))}
							{/* {console.log('recentValues:',recentValues)} */}

            </ul>
          </div>
        )}






      {/* dropdown */}
      <div   className='automcomplete-searchbox__resultsbox '>
        {/* map */}
        {
        query?.length >=2 && loadingWriting===false ?
        <>
        {
        options?.length > 0   ?
        <ul  className='fade-enter automcomplete-searchbox__resultsbox-box' ref={refDropDown}>

          {
          options.map((item ,index) => {
            return(
            <li  key={index} onClick={()=>chooseValue(item)} >

              {
                item?.name ?
                <div className='automcomplete-searchbox__resultsbox-info'>

                {/* <div style={{display:'flex' , flexDirection:'column'}}> */}
                <span>{item?.name}</span>
                {/* <span className='ghgh'>(ليفربول)</span> */}
                {/* </div> */}



                <div className='automcomplete-searchbox__resultsbox-info__text'>
                  <span>({item?.port_code || item?.airport_code})</span>
                  <div className='automcomplete-searchbox__resultsbox-info__menaimg'>
                    {Icon}
                  </div>
                </div>

                </div>

                :
                <div className='automcomplete-searchbox__resultsbox-info'>

                  <span>{item?.origin?.label ||item?.origin?.label_ar ||item?.description }</span>

                <div className='automcomplete-searchbox__resultsbox-info__text'>
                  <span>{item?.origin?.countries_code}</span>
                  {
                    item?.origin?.ImageURL ?
                  <img 
                  src={getFlagImage(item)} 
                  alt='country flag'/>
                  :
                  Icon
                  }
                </div>
                </div>
              }

            </li>
            )
          })
        }

        </ul>
        :
      <>
        {loadingTimerSelected ? null :
        isLoading ===false &&(loadingCity===false|| loadingCity===undefined) && (errorApi ===null) && query?.length >= 2 && options?.length===0 &&
        <p  className='fade-enter automcomplete-searchbox__resultsbox-box automcomplete-searchbox__resultsbox-box__NoResult'  >
        {t('labelDutiesCalculator.noOptions')}
        </p>
        }


        {
        errorApi !==null  &&
          <div  className='automcomplete-searchbox__resultsbox-box error__Port fade-enter'>
            {errorApi}
          </div>
        }

      </>

        }

{
  localLoading &&
  <div className='automcomplete-searchbox__resultsbox-box fade-enter'>
    <LoadingResults />
  </div>
}


        </>


        :
        null

      }


      </div>


    </div>
    </>
  )
}

export default AutoCompleteText
