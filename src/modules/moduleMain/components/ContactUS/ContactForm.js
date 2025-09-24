import { useTranslation } from 'react-i18next';
import './ConatctUsFor.css';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { validateEmail } from '../../../../utils/validation/validationForm';
import parsePhoneNumberFromString from 'libphonenumber-js';
import { postContactUs } from '../../store/home/home.action';
import {ReactComponent as UserProfile}  from '../../../../assets/icons/profile-user.svg';
import {ReactComponent as MailProfile}  from '../../../../assets/icons/profile-mail.svg';
import InputText from '../../../moduleServices/components/common/InputText/InputText';
import InputPhone from '../../../moduleServices/components/common/InputPhone/InputPhone';
import { TfiEmail } from "react-icons/tfi";

// import InputText from '../../../../moduleServices/components/common/InputText/InputText';
// import InputPhone from '../../../../moduleServices/components/common/InputPhone/InputPhone';

const ContactForm = () => {
    const {t,i18n} = useTranslation();

    const FieldsObject = {
        fieldTextPersonName:'textPersonName',
        fieldTextPhoneNumber:'textPhoneNumber',
        fieldEmail:'textPersonEmail',
        fieldMessage:'textMessage',
    }
    const initialForm = useMemo(() => ({
        textPersonName:"",
        textPhoneNumber:"963",
        textPersonEmail:"",
        textMessage:"",

    }), [i18n.language]);

    const [formContactUs , setFormContactUs] = useState(initialForm);
    const [formErrors, setFormErrors] = useState({});
    const dispatch = useDispatch();

    const {
        loadingForm,

    } = useSelector((state) => state.moduleMain.homeSlice);

    const handleSumbitForm=(e)=>{
        e.preventDefault();

    let errorObject = {};

 

    if(formContactUs?.textPersonName.trim()==="" ){
        errorObject.textPersonName = "الحقل  مطلوب"
    }

    if(formContactUs?.textMessage.trim()==="" ){
        errorObject.textMessage = "الحقل  مطلوب"
    }

    if(formContactUs?.textPersonEmail.trim()==="" ){
        errorObject.textPersonEmail = "الحقل  مطلوب"
        }

    if(!validateEmail(formContactUs?.textPersonEmail)){
    errorObject.textPersonEmailValid = ""
    }

    if(formContactUs.textPhoneNumber.trim().length===0){
        errorObject.textPhoneNumber = "الهاتف مطلوب"
    }else if(!parsePhoneNumberFromString("+"+formContactUs.textPhoneNumber)?.isValid()){
    }

    
    

  setFormErrors(errorObject);


  if(Object.keys(errorObject).length > 0){
    return;
  }

  let paramObject = {
    sender_name: formContactUs.textPersonName,
    phone_number: "+"+formContactUs.textPhoneNumber,
    email: formContactUs.textPersonEmail,
    massage:formContactUs.textMessage
  }

  console.log(paramObject,"papapapa")


    dispatch(postContactUs(paramObject))

    } 

    const handleInputText = (field,value)=>{

        setFormContactUs((formContacUs)=>({...formContacUs, [field] : value }));

        if(field===FieldsObject.fieldTextPhoneNumber && (formErrors?.textPhoneNumberValid ||formErrors?.textPhoneNumberValid==="valid" )){
          if(parsePhoneNumberFromString("+"+value)?.isValid()){
            setFormErrors((formErros)=>({...formErros, textPhoneNumberValid : "valid" }))
          }else{
            setFormErrors((formErros)=>({...formErros, textPhoneNumberValid : "هذا الرقم غير صالح" }))
    
          }
          }
          else if(field===FieldsObject.fieldEmail && (formErrors?.textPersonEmailValid  ||formErrors?.textPersonEmailValid==="valid" )){
            if(validateEmail(value)){
              setFormErrors((formErros)=>({...formErros, textPersonEmailValid : "valid" }))
            }else{
              setFormErrors((formErros)=>({...formErros, textPersonEmailValid : "هذا الايميل غير صالح" }))
            }
          }
    }

    const styleColor = {
        color:'#727272'
    }
    const stylebox ={
        display:'flex',
        flexDirection:'column'
    }
    const handleClick = (e)=>{
      e.preventDefault();
      try{
        e.target.select();
      }
      catch(e){
      
      }
      }


  return (

    <section className='form-contactus'>

    <div className='form-item width-100'>
    <InputText
              styleColor={styleColor}
              getInputText={handleInputText}
              title={t('labelServices.name')}
              placeholder={t('labelServices.placeholderName')}
              field={FieldsObject.fieldTextPersonName}
              value={formContactUs.textPersonName}
            //   handleClick={handleClick}
            errorValue={formErrors?.textPersonName}
            />
    </div>

    <div className='input-Phone-ContactUS'>
    <InputPhone
              styleColor={styleColor}
              getInputText={handleInputText}
              title={t('labelServices.numberPhone')}
              placeholder={t('labelServices.placeholderNumberPhone')}
              // Icon={<PhoneProfile/>}
              handleClick={handleClick}
              field={FieldsObject.fieldTextPhoneNumber}
              value={formContactUs.textPhoneNumber}
              //handleClick={handleClick}
              errorValue={formErrors?.textPhoneNumber || formErrors?.textPhoneNumberValid}
              seto={setFormContactUs}
              valid={parsePhoneNumberFromString("+" + formContactUs.textPhoneNumber)?.isValid() || false}
              
              />

                { (formErrors?.textPhoneNumberValid && formErrors?.textPhoneNumberValid !=="valid") &&
                <span className='input-warning'>
                {
                  t('labelServices.InvalidPhone')
                }
              </span>
              }
    </div>

    <div className='form-item width-100' style={{marginBottom:'0px'}}>
              <InputText 
              styleColor={styleColor}
              getInputText={handleInputText} 
              Icon={<TfiEmail/>}
              title={t('labelServices.email')}
              placeholder={t('labelServices.placeholderEmail')}
              field={FieldsObject.fieldEmail}
              value={formContactUs.textPersonEmail}
            //   handleClick={handleClick}
              errorValue={formErrors?.textPersonEmailValid}
              valid={validateEmail(formContactUs.textPersonEmail)} // Set valid based on email validation
              
              />

                { (formErrors?.textPersonEmailValid && formErrors?.textPersonEmailValid !=="valid") && 
                <span className='input-warning'>
                { t('labelServices.InvalidEmail')}
                </span>
              }
    </div>

    <div className='form-item width-100'>
    <InputText 
              stylebox={stylebox}
              styleColor={styleColor}
              getInputText={handleInputText}
            //   Icon={<UserProfile/>} 
              title={t('labelServices.message')}
              placeholder={t('labelServices.placeholderMessgae')}
              field={FieldsObject.fieldMessage}
              value={formContactUs.textMessage}
            //   handleClick={handleClick}
            errorValue={formErrors?.textMessage}
            isTextArea={true}
            />
    </div>

    <div className='button-ContactUSForm'>

    <button disabled={loadingForm}  onClick={handleSumbitForm} className='button-ContactUS' >
    {loadingForm===false && t('actions.submit')}
            <span className={`${loadingForm && 'btn-ring'}`}></span>
    </button>
    </div>



    </section>
  )
}

export default ContactForm
