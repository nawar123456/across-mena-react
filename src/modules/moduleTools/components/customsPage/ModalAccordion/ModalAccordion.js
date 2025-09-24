import { useEffect, useRef, useState } from 'react';
import SearchBar from '../../common/Search/SerachBar';

import './ModalAccordion.css';
import AccordionCalc from '../AccordionCalc/AccordionCalc';
import { useDispatch ,useSelector } from 'react-redux';
import {clearSelectedCard ,searchAccordion,clearData,fetchSections } from '../../../store/prohibitedTab/accordion.slice';
import {ReactComponent as DeleteIcon } from '../../../../../assets/icons/x-mark.svg';

const ModalAccordion = ({toggleModalText ,setToggleModalText }) => {

    const {
        isSearch,
        } = useSelector((state) => state.accordion);

    const dialogRef = useRef();
    const dispatch = useDispatch();
    const [valueSearch , setValueSearch] = useState("");

    useEffect(() => {

        if (dialogRef.current.style.display=== "block" && !toggleModalText) {
            dialogRef.current.style.display= "none"
        } else if (!dialogRef.current.style.display=== "block" && toggleModalText) {

          dialogRef.current.style.display = "block"
        }
    }, [toggleModalText])

    const closeModalText = ()=>{
        setToggleModalText(false);

        if(isSearch===true)
        dispatch(clearData());

    }

    const handleSearchAccordion = (e) =>{

        setValueSearch(e.target.value);

        if(e.target.value.length===0 && isSearch===true)
        {
            // dispatch(saveScrollValue(-1));
            dispatch(clearSelectedCard())
            dispatch(clearData());
            dispatch(fetchSections());
        }
    }

    const clickSearchAccordion = (e)=>{
        // dispatch(saveScrollValue(-1));

        if(valueSearch.trim().length===0 || valueSearch.trim().length===1){


          return;
        }

        dispatch(searchAccordion(valueSearch));
        }


return (
    <section  ref={dialogRef} className='modal-accordion'>

        <span className='delete-icon' onClick={closeModalText}>
            <DeleteIcon/>
        </span>

        <div className='modal-search'>
            <SearchBar valueSearch ={valueSearch} clickSearchAccordion={clickSearchAccordion} handleSearchAccordion={handleSearchAccordion}/>
        </div>

        <AccordionCalc valueSearch={valueSearch} closeModalText={closeModalText}/>

    </section>
)
}

export default ModalAccordion
