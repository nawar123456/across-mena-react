import './AutoCompleteText.css';
import { useTranslation } from 'react-i18next';
import LoadingResults from '../../../../../components/LoadingResutls/LoadingResults';
import { useEffect,useState } from 'react';


<img className='automcomplete-searchbox__row-img'
src={getFlagImage(value)}
alt='flag icon'/>

const getFlagImage = (item) => {
  if (item?.origin?.countries_code === '(SY)') {
    return localSyriaFlag; // Use local image for Syria
  }
  return item?.origin?.ImageURL || item?.port_flag;
};


const AutoCompleteText = ({loadingCity,titleInput,loadingWriting,handleClickColor,Icon,placeholder,inputf,options,isLoading,errorApi,query,loadingTimerSelected,errorValue,value,field,valueSelect,handleInputText,resetPorts,refSearch,refInput,refDropDown,recentValues}) => {
// nawar hasan dsadasda
  const {t,i18n} = useTranslation();
  const [showRecent, setShowRecent] = useState(false);

  useEffect(() => {
	if (value && value.port_code) {
	  // Ensure the value is retained after language change
	  console.log("Language changed, retaining value:", value);
	}
  }, [i18n.language]);


  const handleRecentClick = (item) => {
    valueSelect(field, item); // Pass the selected value to the parent
		setShowRecent(false); // Hide recent selections dropdown

	};




  const handleChangeText= (e)=>{

      handleInputText(field,e.target.value)
			setShowRecent(false); // Hide recent selections when typing

			if (value?.port_code && query?.length === 0) {
				// Keep value intact when user types a new query but hasn't selected anything new
				console.log("Preserving selected value:", value);
			  } else {
				setShowRecent(false); // Hide recent selections when typing
			  }
			};

	const handleInputClick = () => {
    setShowRecent(true); // Show recent selections on input click
  };

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

  const displayValue = value && value?.port_code && (
	<>
	  <span>{value?.name}</span>
	  <span>({value?.port_code})</span>
	  {value?.origin?.ImageURL && (
		<img
		  className="autocomplete-row-img"
		  src={value?.origin?.ImageURL}
		  alt="flag"
		/>
	  )}
	</>
  );

  useEffect(() => {
	const savedValue = JSON.parse(localStorage.getItem('selectedValue'));
	if (savedValue) {
	  valueSelect(field, savedValue); // Restore the saved value
	}
  }, []);

  const chooseValue = (item)=>{

    valueSelect(field,item);

    localStorage.setItem('selectedValue', JSON.stringify(item)); // Persist selection
};



  return (
    <>
    {titleInput &&

    <p className='autocomplete-title'>
      {titleInput}
    </p>

    }
    <div className='automcomplete-searchbox' key={`${i18n.language}-${field}`}>
      {/* if name (${value?.port_code}) else ${value?.origin?.countries_code}   */}
      {/* input text */}
      <div ref={refInput}   className='automcomplete-searchbox__row' style={{borderColor:(errorValue&&!value) ?'red' : null}} >
      <span className='automcomplete-searchbox__row-icon'>
            {Icon}
      </span>
        <input onClick={handleInputClick} ref={refSearch} onChange={handleChangeText} title="" className='automcomplete-searchbox__row-input' type='text' placeholder={placeholder} autoComplete='off' style={{fontSize:'18px !important'}}  />


        { value && !value?.description &&(
        <div  className='automcomplete-searchbox__row-details'>
        <span className='automcomplete-searchbox__row-details-code'>
          {value?.name ?
            `(${value?.port_code || value?.airport_code})`
            :
            `${value?.origin?.countries_code}`
          }
        </span>

        {(value?.origin?.ImageURL || value?.port_flag) &&(
          <img className='automcomplete-searchbox__row-img'
					src={value?.origin?.ImageURL || value?.port_flag }
					alt='flag icon'/>
        )}
        </div>
        )}


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
                  <img src={item?.origin?.ImageURL} alt='country flag'/>
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
        (isLoading || loadingTimerSelected || loadingCity) &&
        <div   className='automcomplete-searchbox__resultsbox-box fade-enter'>
          <LoadingResults/>
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
