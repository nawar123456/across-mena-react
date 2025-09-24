import './DatePicker.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useState,forwardRef } from 'react';

// import {ReactComponent as DateIcon} from '../../../../../assets/icons/calendar-date.svg'

const InputDatePicker = forwardRef(
 (
  {selectDate ,styleEdit, field, valueSelect,placeholder,title,errorValue},ref )=> {


    const handleSelect = (date)=>{

      valueSelect(field,date)

  }

  return (
    <div className='input-parents'>
        
        {/* <span className={`${isFocused || selectDate ? 'input-label active':'input-label'}`} > */}
        <span className={'input-label'} >
        {title}
      </span>

        <DatePicker 
        selected={selectDate} 
        onChange={date => handleSelect(date)} 
        popperClassName="custom-datepicker-popper"

        dateFormat="dd/MM/yyyy"
        minDate={new Date()}
        className={`${'input-text'} ${errorValue ? 'input-text--border' : 'input-text-normal'}`}
        placeholderText={placeholder}
        ref={ref}
        />



        {/* <span className='input-icon' style={styleEdit}  >
            <DateIcon />
        </span> */}

    </div>
  )
}
)
export default InputDatePicker
