import styles from './SearchBar.module.css';
import { ReactComponent as SearchIcon} from '../../../../../assets/icons//search.svg';
// import {searchAccordion,fetchSections,clearData, clearSelectedCard,editIsSearch} from '../../store/accordionSlice';
// import {fetchSections,clearData, clearSelectedCard} from '../../store/accordionSlice';

import { useSelector } from 'react-redux';
// import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// import { saveScrollValue } from '../../store/accordionSlice';

// const SerachBar = ({pathname,id,query,valueSearch,setValueSearch,clickSearchAccordion,handleSearchAccordion}) => {
  const SerachBar = ({valueSearch,clickSearchAccordion,handleSearchAccordion,handleResetAccordion}) => {

  const { t } = useTranslation();

const {loading , isSearch} = useSelector((state) => state.accordion);


  const handleChange = (e) =>{
    
    handleSearchAccordion(e);
  }

  // const resetHandle = (e)=>{
  //  handleResetAccordion(e)
  // } reset the search bar
  const searchHandle = (e)=>{
    e.preventDefault();
  
    
    // if(valueSearch.trim().length===0){
    
    //   dispatch(clearSelectedCard())
    //   dispatch(clearData());
    //   dispatch(fetchSections());  
    // }

    if(valueSearch.trim().length===0|| valueSearch.trim().length===1){
      toast.warn("الرجاء إدخال أكثر من محرف أو رقم", {
        position: "bottom-right",
        autoClose: 1800,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
        className : 'toast-message',
        progressClassName: 'toast-message-progress',
        });
    }

    clickSearchAccordion(e)

  }

  const handleClick = (e)=>{
    e.preventDefault();
    e.target.select();
  }

  const handleKeyDown =(event)=>{
    if (event.key === 'Enter') {
      // Handle Enter key press (e.g., trigger search)
      searchHandle(event);
    }
  }

  return (

      <div className={styles['form-serach']}>
        <input onKeyDown={handleKeyDown} // Add this line for Enter key
        name="searchAccordion"  value={valueSearch} onClick={handleClick} onChange={handleChange} className={styles['form-input']} type="text" autoComplete="off" placeholder={t('labelProhibitedPage.placeholderSearch')}/>
        
        <button onClick={searchHandle} className={styles['form-btn']} type="submit">
        <SearchIcon className={styles['icon']} style={{fill : loading && isSearch && "#fcc400"}}/>
        </button>

        <Link className={styles['btn-accordain']} onClick={searchHandle} style={{color : loading && isSearch && "#fcc400"}}>

        <span className={styles['btn-title']}>
        {t('actions.searchBtn')}

        </span>

        </Link>
        
     
 {/* <span className={styles[['btn-title'], ['btn-accordain']]} style={{margin:'0px 25px 0px 10px', cursor:'pointer', }} onClick={resetHandle}>
 {t('actions.resetBtn')}
 Reset Button work perfect
 </span> */}
 </div>
  )
}

export default SerachBar
