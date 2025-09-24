import i18next from 'i18next';
import styles from './InputTextServices.module.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Import checkmark icon
import { useEffect, useState,forwardRef } from 'react';


const InputTextServices = forwardRef(
	(
		{showPassword,handleShowPassword,disapled,stylebox,styleColor,styleTextArea,isTextArea,getInputText,field,value,Icon,  placeholder,title ,handleClick,errorValue,valid},ref
	) => {

	const [isValid, setIsValid] = useState(false); // Track validity of phone number
	const isRTL = i18next.language === 'ar'; // Check if the current language is RTL (assuming 'ar' is for Arabic)

	useEffect(() => {
		setIsValid(valid);
	}, [valid]);

  const handleInputText = (e)=>{

    getInputText(field,e.target.value)

  }


  return (
    <div className={styles['input-box-services']} style={stylebox}>

      <span style={styleColor} className={`${styles['input-label-services']}` } >
        {title}
      </span>
    {isTextArea===true ?(

    <textarea autoComplete="off"
		ref={ref}
    title=''
    value={value}
    onChange={handleInputText}
    rows={5}
    onClick={handleClick}
    className={`${styles['input-text-services']} ${styles['input-textarea-services']}`}
    placeholder={placeholder}
    style={{height:styleTextArea?.height,borderColor:(errorValue &&value?.trim()==="") && '#f60000', padding: (!Icon && '10px') , fontFamily: i18next.language==="ar"?'var(--font-family-ar-primary)':'var(--font-family-en-primary)',fontSize:'16px'}}
    />

		):(
    <input autoComplete="off"
		ref={ref}
            title=''
            value={value}
            onChange={handleInputText}
            onClick={handleClick}
            className={styles['input-text-services']}
            type={`${showPassword ? 'password' : 'text'}`}
            placeholder={placeholder}
            style={{borderColor:(errorValue &&value?.trim()==="") && '#f60000', padding: ((!Icon || showPassword !==undefined) && '10px'),fontSize:'16px'}}
            disabled={disapled}
            />
)}



    <span className={styles['input-icon-services']} style={{insetInlineStart : showPassword !==undefined && 'auto' , insetInlineEnd : showPassword !==undefined && '10px'}} onClick={handleShowPassword}>
    {Icon}
    </span>

		{isValid && (
				<CheckCircleIcon
          style={{
						height:' 22px',
						width: '27px',
						color: 'green',
						position: 'absolute',
						[isRTL ? 'left' : 'right']: '2px',
						top: '70%',
						transform: 'translateY(-50%)',
						PointerEvent: 'none',
						zIndex: '2',
          }}
        />
			)}
    </div>
);

}
)
export default InputTextServices
