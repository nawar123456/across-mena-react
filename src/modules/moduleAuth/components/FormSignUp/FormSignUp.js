import { useTranslation } from 'react-i18next';
import './FormSignUp.css';
import face from '../../../../assets/icons/facebookicon.svg';
import google from '../../../../assets/icons/googleicon.svg';
import { useMemo, useState } from 'react';
import { validateEmail } from '../../../../utils/validation/validationForm';
import parsePhoneNumberFromString from 'libphonenumber-js';
import InputText from '../../../moduleServices/components/common/InputText/InputText';
import InputPhone from '../../../moduleServices/components/common/InputPhone/InputPhone';
import Select from "react-select";

import {ReactComponent as EyeOff} from '../../../../assets/icons/eye-off-line.svg';
import {ReactComponent as EyeOn} from '../../../../assets/icons/eye-line.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { minHeight } from '@mui/system';

const FormSignUp = () => {
    const {t,i18n} = useTranslation();
		const navigate = useNavigate(); // useNavigate for navigation after form submission

    const [formErrors, setFormErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const {arrayCountries ,errorCountry} = useSelector((state) => state.customsCalculator);

    const FieldsObject = {
        fieldFirstName:'textFirstName',
        fieldLastName:'textLastName',
        fieldEmail:'textEmail',
        fieldCompanyName:'textCompanyName',
        fieldCountry:'textCountry',
        fieldPhone:'textPhone',
        fieldPassword:'textPassword',
        fieldConfirmPassword:'textConfirmPassword',
        fieldCheckTerms:'textCheckTerms',
    }

    const initialFormSignUp = useMemo(() => ({
        textFirstName:"",
        textLastName:"",
        textEmail:"",
        textCompanyName:"",
        textCountry:null,
        textPhone:"",
        textConfirmPassword:"",
        textCheckTerms:false
      }), []);

    const [formSignUp , setFormSignUp] = useState(initialFormSignUp);

		const phoneNumber = formSignUp.textPhone;
		const phoneCountryCode = phoneNumber.substring(0, 3);
    const handleInputText = (field,value)=>{

        setFormSignUp((formSignUp)=>({...formSignUp, [field] : value }));

    }


		const validatePhoneNumber = (phone) => {
			// Regular expression to check phone number format
			return /^\+\d{1,3}\d{4,14}$/.test(phone); // Ensure '+' followed by up to 3 digits (country code) and 4-14 more digits
	};
		const formatPhoneNumber = (phone) => {
			if (!phone.startsWith('+')) {
					return `+${phone}`; // Add '+' if missing
			}
			return phone;
	};

    const handleSubmit = async(e)=>{
        e.preventDefault();

				let errorObject = {};

			// 	setFormData({
			// 		...formData,
			// 		[e.target.name]: e.target.value
			// 	});
			// };
// {console.log(formSignUp)}
				// try {
				// 	const response =  fetch('https://across-mena.com/accounts/across-mena-register/', {
				// 		method: 'POST',
				// 		headers: {
				// 			'Content-Type': 'application/json',
				// 		},
				// 		body: JSON.stringify(formSignUp),
				// 	});

				// 	if (!response.ok) {
				// 		throw new Error('Network response was not ok');
				// 	}

				// 	// const data =  response.json();
				// 	// console.log('Success:', data);
				// } catch (error) {
				// 	// console.error('Error:', error);
				// }

        if(formSignUp?.textFirstName.trim()==="" ){
            errorObject.textFirstName = "الحقل  مطلوب"
            }
        if(formSignUp?.textLastName.trim()==="" ){
            errorObject.textLastName = "الحقل  مطلوب"
        }
        if(formSignUp?.textEmail.trim()==="" ){
            errorObject.textEmail = "الحقل  مطلوب"
        }
        else if(!validateEmail(formSignUp?.textEmail)){
            errorObject.textPersonEmailValid = "الايميل غير صالح "
        }

        if(formSignUp?.textCompanyName.trim()==="" ){
            errorObject.textCompanyName = "الحقل  مطلوب"
        }
        if(formSignUp.textCountry ===null || formSignUp.textCountry ===undefined ){
            errorObject.textCountry = "الحقل  مطلوب"
        }
        // if(formSignUp?.textPhone.trim()==="" ){
        //     errorObject.textPhone = "الحقل  مطلوب"
        // }else if(!parsePhoneNumberFromString("+"+formSignUp.textPhoneNumber)?.isValid()){
        //     errorObject.textPhoneNumberValid = "رقم الهاتف غير صالح "
        // }

        // if(formSignUp?.textCheckTerms.trim()===false ){
        //     errorObject.textCheckTerms = "الحقل  مطلوب"
        // }

				const formattedPhone = formatPhoneNumber(formSignUp.textPhone);
				if (!validatePhoneNumber(formattedPhone)) {
						errorObject.textPhone = "Phone number must start with '+' followed by the country code.";
				}



        setFormErrors(errorObject);

        if(Object.keys(errorObject).length > 0){
            return;
        }

			// 	const formattedData = {
			// 		user: {
			// 				email: formSignUp.textEmail,
			// 				phone: formSignUp.textPhone,
			// 				first_name: formSignUp.textFirstName,
			// 				last_name: formSignUp.textLastName,
			// 				password: formSignUp.textPassword,
			// 				confirm_password: formSignUp.textConfirmPassword
			// 		},
			// 		company_name: formSignUp.textCompanyName,
			// 		country: formSignUp.textCountry
			// };
			const formData = {
				user: {
						email: formSignUp.textEmail,
						phone: formattedPhone,
						first_name: formSignUp.textFirstName,
						last_name: formSignUp.textLastName,
						password: formSignUp.textPassword,
						confirm_password: formSignUp.textConfirmPassword
				},
				company_name: formSignUp.textCompanyName,
				country: formSignUp.textCountry
		};

			// const formData = new FormData();
			// formData.append('user[email]', formSignUp.textEmail);
			// formData.append('user[phone]', formSignUp.textPhone);
			// formData.append('user[first_name]', formSignUp.textFirstName);
			// formData.append('user[last_name]', formSignUp.textLastName);
			// formData.append('user[password]', formSignUp.textPassword);
			// formData.append('user[confirm_password]', formSignUp.textConfirmPassword);
			// formData.append('company_name', formSignUp.textCompanyName);
			// formData.append('country', formSignUp.textCountry);

		// 	for (let [key, value] of formData.entries()) {
    //     console.log("l1:",key,":", value);
    // }
		console.log("before",formData);
		try {

			console.log("try",formData);

			const response = await fetch('https://across-mena.com/accounts/across-mena-register/', {
					method: 'POST',
					headers: {
							'Content-Type': 'application/json', // Specify JSON content type
					},
					body: JSON.stringify(formData), // Convert the formData object to JSON string
			});
			console.log("try2",formData.user);

			if (response.ok) {
					const data = await response.json();
					console.log('Success:', data);

					// Check if phone number is Syrian and navigate to OTP verification page
					if (formattedPhone.startsWith('+963')) {
							navigate('/otp-verification', { state: { phoneNumber: formSignUp.textPhone } });
					} else {
							console.log('Registration successful');
					}
			} else {
					// Log server response if there's a 400 error to understand why it failed
					const errorData = await response.json();
					console.error('Error Data:', errorData);
					alert(`Error: ${errorData?.message || 'Bad Request'}`);
			}
	} catch (error) {
			console.error('Error:', error);
	}
};

    const handleShowPassword = ()=>{
        setShowPassword(prev =>!prev);
    }

    const handleShowPassword2 = ()=>{
        setShowPassword2(prev =>!prev);
    }

    const handleChecked = (field,value)=>{

        setFormSignUp((formSignUp)=>({...formSignUp, [field] : value }));


    }

    const customStyle = (selectSourceError,valueInput,isInfoUniqe=null,index=-1)=>({
        singleValue: (provided , {selectProps }) => ({
          ...provided,
          span: {
            backgroundColor: selectProps.menuIsOpen  ? '#fcc400' : 'initial',
          },
        }),

        container: (provided) => ({
          ...provided,
          marginBottom:'5px',
        }),
        dropdownIndicator: (base, state) => ({
          ...base,
          transition: "all .2s ease",
          transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
          padding: '7px',
					height:'44px'
        }),

        clearIndicator: (prevStyle) =>({
          ...prevStyle,
          display:'none',

        }),


        control: (prevStyle, { isFocused , isDisabled , selectProps}) => ({
          ...prevStyle,
          cursor: 'pointer',
          borderRadius:'9px',
          // borderRadius:  errorOrigin !==null &&  errorOrigin !==null ? '7px' : '9px',
          // fontSize: '17px ',
          color: '#000',
          // border: '1px soild green ',
          // borderBottomWidth: errorOrigin !==null &&  errorOrigin !==null ? '1px' : '2px',
          boxShadow: (selectSourceError && valueInput===null) || ((isInfoUniqe?.currentIndex===index && isInfoUniqe?.isFound)) ? '0px 0.5px 3px f60000': (isFocused) ? '0px 0.5px 3px #fcc400' : '0px 0.5px 3px rgba(0,0,0,0.16)'  ,
          background: isDisabled ? 'rgba(221, 221, 221, 0.5)': selectProps.inputValue ? '#fffdaf' : 'transparent',
          touchAction:'manipulation',
					minHeight:'22px',
          width: '100% ',
          height: '3.18em',
          padding: '0px 0px',
          '@media (max-width: 600px)': { minHeight:'10px' , height: '50px', fontSize:'16px' },
          fontWeight: '600 ',
          flexWrap:'none',

          borderColor: (selectSourceError && valueInput===null) || ((isInfoUniqe?.currentIndex===index && isInfoUniqe?.isFound)) ? '#f60000': (isFocused) ? '#ffc400' : '#b5b5b58c'  ,
          ':hover': {
            borderColor: (selectSourceError && valueInput===null) || ((isInfoUniqe?.currentIndex===index && isInfoUniqe?.isFound)) ? '#f60000': (isFocused) ? '#ffc400' : '#b5b5b58c'  ,
          }

          }),

          placeholder: (provided, state) => ({
            ...provided,
            color:'#BABABA',


          }),
          option: (styles, {isSelected, isFocused}) => ({
            ...styles,
            backgroundColor:
            (isFocused && 'transparent') ||'transprearent',
            color:'#000c37',
            cursor:'pointer',

            "&:hover": {
            background: "#fffdaf"
          }
          }),
          menuList: (provided) => ({
            ...provided,
            paddingTop: 0,
            paddingBottom: 0,
            height:'200px',
            width:'100%',
          }),
          menu: (provided) => ({
            ...provided,
            zIndex: 13, // Set the desired z-index for the menu (dropdown)
          }),


      });

    const formatOptionLabel = ({label_ar, ImageURL }) => (

        <div className={'signup__select-option'}>

          <span >{label_ar}</span>
          <div>

            {ImageURL && <img  className={'signup__select-flag'} src={ImageURL} alt='country flag'/>}
          </div>

        </div>
      );

      const formatOptionLabel_en = ({label, ImageURL }) => (

        <div className={'signup__select-option'}>

          <span >{label}</span>
          <div>

            {ImageURL && <img  className={'signup__select-flag'} src={ImageURL} alt='country flag'/>}
          </div>

        </div>
      );



      const customFilter = (option, searchText) => {
        // Convert both the option label and search text to lowercase for case-insensitive comparison
        const optionLabel = option.label?.toLowerCase();
        const optionLabelAr = option.label_ar?.toLowerCase();
        const searchTextLower = searchText?.toLowerCase();

        // Return true if either label includes the search text
        return optionLabel?.includes(searchTextLower) || optionLabelAr?.includes(searchTextLower);
      };

			const handleSelect = (field, value) => {
				const countryId = value ? value.id : null; // Extract the ID or set to null
				setFormSignUp((formSignUp) => ({ ...formSignUp, [field]: countryId }));
		};


return (
    <div className="signup-left__parent">
    <h1 className="signup-left__title">{t('labelAuth.signUp')}</h1>
    <p className="signup-left__text">

    {t('labelAuth.descriptionSignUp')}
    </p>

    <div className='p'>


    <div className="signup-left__input-2">
    <InputText
          getInputText={handleInputText}
          // Icon={<MailProfile/>}
          title={t('labelAuth.firstName')}
          // placeholder={'Email/Phone'}
          field={FieldsObject.fieldFirstName}
          value={formSignUp.textFirstName}
          // handleClick={handleClick}
          errorValue={formErrors?.textFirstName}
          styleColor={{fontSize:'15px'}}
    />

        <InputText
          getInputText={handleInputText}
          // Icon={<MailProfile/>}
          title={t('labelAuth.lastName')}
          // placeholder={'Email/Phone'}
          field={FieldsObject.fieldLastName}
          value={formSignUp.textLastName}
          // handleClick={handleClick}
          errorValue={formErrors?.textLastName}
          styleColor={{fontSize:'15px'}}
        />

    </div>

    <div className='signup-left__input'>

    <InputText
        styleColor={{fontSize:'15px'}}
        getInputText={handleInputText}
            //   Icon={<MailProfile/>}
        title={t('labelAuth.Email')}
        // placeholder={t('labelAuth.Email')}
        field={FieldsObject.fieldEmail}
        value={formSignUp.textEmail}
        //   handleClick={handleClick}
        errorValue={formErrors?.textEmail ||formErrors?.textPersonEmailValid }
            />

        { (formErrors?.textPersonEmailValid && formErrors?.textPersonEmailValid !=="valid") &&
            <span className='input-warning'>
            { t('labelServices.InvalidEmail')}
            </span>
        }

    </div>

    <div className='signup-left__input-2'>

    <div className='signup-left__country'>

    <InputText
          getInputText={handleInputText}
          // Icon={<MailProfile/>}
          title={t('labelAuth.CompanyName')}
          // placeholder={'Email/Phone'}
          field={FieldsObject.fieldCompanyName}
          value={formSignUp.textCompanyName}
          // handleClick={handleClick}
          errorValue={formErrors?.textCompanyName}
          styleColor={{fontSize:'15px'}}
    />

    </div>

    <div className='signup-left__country'>
        <span className='signup-left__country-title'>
        {t('labelAuth.Country')}
        </span>

        <Select
    value={arrayCountries.find((option) => option.id === formSignUp.textCountry)} // Set by ID
		formatOptionLabel={i18n.language==="en" ? formatOptionLabel_en : formatOptionLabel}
                  placeholder=""
                  noOptionsMessage={()=>( errorCountry !==null ? <span style={{lineHeight:'25px' , color:'red'}}>{errorCountry}  <br/> <span style={{color:'black'}}>Please reload page</span></span>  :  t('labelDutiesCalculator.noOptions')) }
                  options={arrayCountries}
                  onChange={(e)=>handleSelect(FieldsObject.fieldCountry,e)} // assign onChange function
                  isClearable={true}
                  styles={customStyle(formErrors?.textCountry,formSignUp.textCountry)}
                  menuShouldScrollIntoView={false}
                  // className={ errorOrigin && styles['border-warning'] }
                  filterOption={customFilter}
                  // onInputChange={(newInputValue) => {
                    // Update inputValue state
                  //   setInputValue(newInputValue);
                  // }}
                  getOptionLabel={ (option) => `${option.label_ar} (${option?.label})`}
                  // required
                  />

    </div>



    </div>

    <div className='signup-left__input'>

    <InputPhone
        styleColor={{fontSize:'15px'}}
        getInputText={handleInputText}
        title={t('labelAuth.PhoneNumber')}
        // placeholder={t('labelServices.placeholderNumberPhone')}
        // Icon={<PhoneProfile/>}
        field={FieldsObject.fieldPhone}
        value={formSignUp.textPhone}
            //   handleClick={handleClick}
        errorValue={formErrors?.textPhone || formErrors?.textPhoneNumberValid}
        seto={setFormSignUp}
              />


{/* {console.log(phoneCountryCode)}

if syria will print 963 not +963
*/}


            { (formErrors?.textPhoneNumberValid && formErrors?.textPhoneNumberValid !=="valid") &&
                <span className='input-warning'>
                {
                  t('labelServices.InvalidPhone')
                }
              </span>
              }

    </div>

    <div className="signup-left__input">
    <InputText
          getInputText={handleInputText}
          Icon={ showPassword ? <EyeOff style={{width:'20px', height:'33px', cursor:'pointer'}}/> :  <EyeOn style={{width:'20px', height:'33px', cursor:'pointer'}}/>}
          title={t('labelAuth.password')}
          // placeholder={'Email/Phone'}
          field={FieldsObject.fieldPassword}
          value={formSignUp.textPassword}
          //   handleClick={handleClick}
          errorValue={formErrors?.textPassword}
          styleColor={{fontSize:'15px'}}
          handleShowPassword={handleShowPassword}
          showPassword={showPassword}
    />

    </div>

    <div className="signup-left__input">
    <InputText
          getInputText={handleInputText}
          Icon={ showPassword2 ? <EyeOff style={{width:'20px', height:'33px', cursor:'pointer'}}/> :  <EyeOn style={{width:'20px', height:'33px', cursor:'pointer'}}/>}
          title={t('labelAuth.confirmPassword')}
          // placeholder={'Email/Phone'}
          field={FieldsObject.fieldConfirmPassword}
          value={formSignUp.textConfirmPassword}
          //handleClick={handleClick}
          errorValue={formErrors?.textConfirmPassword}
          styleColor={{fontSize:'15px'}}
          handleShowPassword={handleShowPassword2}
          showPassword={showPassword2}
    />
    </div>


    <div className='signup-left__input'>
    <label className="form-control">
      <input className="parent-finish-checkbox" type="checkbox" checked={formSignUp.textCheckTerms} onChange={(e) => handleChecked(FieldsObject.fieldCheckTerms,e.target.checked)}   name="checkbox-checked"  />
      {t('labelAuth.terms')}
      </label>
    </div>

    <div className='signup-btn' onClick={handleSubmit}>
        <button className="signup-submit">
        {t('labelAuth.signUp')}
        </button>
    </div>

    <p className="signup-account">
      {t('labelAuth.backTo')}
      {/* <NavLink to={"/auth/login?param=across-mean"} className="signup-left__signup"> */}

      <NavLink to={"/login"} className="signup-left__signup">
      {t('labelAuth.signIn')}
      </NavLink>

      {/* <span className='par2button'>
      <button className="login-submit2">

<img src={face} className='facebook_button'></img>
Facebook
      </button>

      <button className="login-submit2">
      <img src={google} className='facebook_button'></img>
Google
      </button>
     </span> */}
    </p>

    </div>

    </div>

)
}

export default FormSignUp
