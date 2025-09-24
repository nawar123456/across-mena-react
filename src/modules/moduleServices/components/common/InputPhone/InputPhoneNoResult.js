import PhoneInput from 'react-phone-input-2';
import  styles from './InputPhoneNoResult.module.css'
import 'react-phone-input-2/lib/material.css';
import ar from 'react-phone-input-2/lang/ar.json';
import { useEffect, useState,forwardRef } from 'react';
import { colors } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Import checkmark icon

const InputPhoneNoResult = forwardRef(
(
  {styleColor,field,getInputText,value,placeholder,title ,Icon,errorValue,valid},inputRef) => {

    const [isFocused, setIsFocused] = useState(false);
        const [isValid, setIsValid] = useState(false); // Track validity of phone number
        useEffect(() => {
            setIsValid(valid);
        }, [valid]);

    useEffect(() => {
      if (inputRef && typeof inputRef === 'object' && inputRef.current) {
        const inputEl = document.querySelector('.form-control');
        if (inputEl) {
          inputRef.current = inputEl;
        }
      }
    }, [inputRef])
        const handlePhoneChange = (phone) => {
            getInputText(field, phone);
        };

    const handleFocus = () => {
      setIsFocused(true);
    };

    const handleBlur = () => {
      setIsFocused(false);
    };


    const customStyles = {
      container: {
        // Style for the container div
        position: 'relative',
        direction:'ltr',
        zIndex:'2',
        // marginTop:'-12px',

      },
      input: {
        // Style for the input element
        border: `1px solid ${errorValue && value?.trim()===""?'#f60000': isFocused ? ' #fcc400' : ' #b5b5b58c'}`, // Set the default border color
        borderRadius: '9px', // Set the border radius
        // padding: '10px 55px 10px 10px', // Set padding
        outline: 'none', // Remove outline on focus
                fontSize:'18px',
        width:'100%',
        height:'var(--height-input)',

        // borderBottomWidth:'2px',
                color:'#727272',
        fontWeight: 'bold',
        overflow: 'hidden',
        backgroundColor: '#fff',
        boxShadow :  `${isFocused ? ' 0px 0.5px 3px #FFC400' : ' none'}`,
      },

      button: {
        fontSize:'18px'

      },
      dropdown: {
        // Style for the dropdown container
      height:'200px'
      },

    };

    return (
      <div className={styles['formNoResult-input-box']}  >

        <span style={styleColor} className={`${styles['formNoResult-input-label']} ${ isFocused || value ? styles['active'] : ''}`} >
            {title}
        </span>

        <PhoneInput
          inputStyle={customStyles.input}
          containerStyle={customStyles.container}
          dropdownStyle={customStyles.dropdown}
          buttonStyle={customStyles.button}
          country={'sy'}
          value={value}
          onChange={handlePhoneChange}
          localization={ar}
          placeholder={"+"}
          menuShouldScrollIntoView={false}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={(event) => {
            if (event.key === '0' &&value.length===0 ) {
              event.preventDefault();
            }
            }}

        />


<span className={styles['formNoResult-input-icon']}>{Icon}</span>

{isValid && (
                <CheckCircleIcon
          style={{
                        height:' 22px',
                        width: '27px',
                        color: 'green',
                        position: 'absolute',
                        right: '5px',
                        top: '70%',
                        transform: 'translateY(-50%)',
                        PointerEvent: 'none',
                        zIndex: '2',
          }}
        />
            )}


 {/* Conditional checkmark icon */}


    </div>
    )
  }
)
  export default InputPhoneNoResult;
