import styles from './SelectBox.module.css';
import Select from 'react-select';
import { forwardRef, useEffect, useState } from 'react';
import { customStyle, CustomLoadingIndicator, formatLabelGoodsType, formatLabelMoveType, formatLabelContainer } from './Customs';
import { useTranslation } from 'react-i18next';

const SelectBoxAirForm = forwardRef(({
typyForm,IconMobile,title,Padding,isHideTitle,styleEdit,Icon,
placeholder,options,value, field ,index, valueSelect ,
 isSearch ,isLoading,getSections,cursor, errorValue},ref) => {

  const [filteredSections , setFilteredSections] = useState([]);
  const {t,i18n} = useTranslation();

  useEffect(()=>{

    if(isLoading===false && options?.length > 0 &&field==="selectTypeGoods"){
    const FilterArray = options.filter(obj => obj.id !== 19 && obj.id !== 21);
    const newObj = {id:"22",label:t('labelServices.AllKindsGoods')}
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
    <div ref={ref} className={styles['input-box']}>
    
    <span className={styles[`input-label`]} style={{display: isHideTitle && 'none'}} >
        {title}
    </span>

    <Select
            value={value}
            placeholder={placeholder}
            formatOptionLabel={formatLabel}
            noOptionsMessage={()=>t('labelDutiesCalculator.noOptions')}
            options={filteredSections}
            onChange={(e)=>handleSelect(e)} // assign onChange function
            isClearable={true}
            styles={customStyle(IconMobile,Padding,cursor,errorValue,value,Icon)}
            menuShouldScrollIntoView={false}
            isSearchable ={isSearch}
            menuIsOpen={ isSearch ? menuIsOpen : undefined}
            onMenuOpen={handleSelectClick}//onclick 
            onMenuClose={handleClose}
            isLoading={isLoading}
            className={styles['custom-select']}
            components={{
              LoadingMessage: () => <CustomLoadingIndicator />,
            }}
            />


        <span className={styles['input-icon']} style={styleEdit}>
            {Icon}
        </span>

    </div>

  )
  })

export default SelectBoxAirForm;
