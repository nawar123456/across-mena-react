import { useTranslation } from 'react-i18next';
import './FormAskManager.css';
import { useMemo, useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { TfiEmail } from "react-icons/tfi";

import InputText from '../../../moduleServices/components/common/InputText/InputText';
// profileNawarUser
// import {ReactComponent as UserIconProfile}  from '../../../../assets/icons/username-blue.svg';

// import {ReactComponent as UserProfile}  from '../../../../assets/icons/profile-user.svg';
import {ReactComponent as MailProfile}  from '../../../../assets/icons/profile-mail.svg';
import {ReactComponent as WhatsappIcon}  from '../../../../assets/icons/whatsapp-line.svg';
import {ReactComponent as PhoneIcon}  from '../../../../assets/icons/profile-phone.svg';

import InputPhone from '../../../moduleServices/components/common/InputPhone/InputPhone';
import CardCheckContact from '../../components/CardCheckContact/CardCheckContact';
import { validateEmail } from '../../../../utils/validation/validationForm';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { useDispatch, useSelector } from 'react-redux';
import { postAppointment } from '../../store/home/home.action';
import { FaArrowRightLong } from "react-icons/fa6";

const FormAskManager = ({ closePopup }) => {
    const {t,i18n} = useTranslation();
		const selectedContainer = useSelector((state) => state.moduleServices.seaFormSlice);


		const {
			portsObject,bookingObject,
	} = useSelector((state) => state.moduleMain.homeSlice);

    const FieldsObject = {
        fieldTextPersonName:'textPersonName',
        fieldTextPhoneNumber:'textPhoneNumber',
        fieldEmail:'textPersonEmail',
        fieldCheckGmail:'checkboxGmail',
        fieldCheckWhatsapp:'checkboxWhatsapp',
        fieldCheckPhone:'checkboxPhone',
    }

    const initialForm = useMemo(() => ({
        textPersonName:"",
        textPhoneNumber:"963",
        textPersonEmail:"",
        checkboxGmail:false,
        checkboxWhatsapp:false,
        checkboxPhone:false,

    }), [i18n.language]);

      const [formNoResults , setFormNoResults] = useState(initialForm);
      const [formErrors, setFormErrors] = useState({});
      const dispatch = useDispatch();


  const [formBookObject, setFormBookObject] = useState({
		textDescriptionBook: "",
		textReferenceNumber: "",
		textWeight: "",
		textCommodity: "",
		textPersonName: "",
		textPhoneNumber: "963",
		textPersonEmail: "",
		checkboxGmail: false,
		checkboxWhatsapp: false,
		checkboxPhone: false
	});

      const {
        loadingForm,
        // postAppointmentForm,
        // errorAppointmentForm

    } = useSelector((state) => state.moduleMain.homeSlice);

    function removeTrailingComma(str) {
      return str?.endsWith(',') ? str.slice(0, -1) : str;
    }

    const handleSumbitForm=(e)=>{
        e.preventDefault();

    let errorObject = {};

    if(formNoResults?.textPersonName.trim()==="" ){
        errorObject.textPersonName = "الحقل  مطلوب"
    }

    if(formNoResults?.textPersonEmail.trim()==="" ){
        errorObject.textPersonEmail = "الحقل  مطلوب"
        }

    if(!validateEmail(formNoResults?.textPersonEmail)){
    errorObject.textPersonEmailValid = "الايميل غير صالح "
    }

    if(formNoResults.textPhoneNumber.trim().length===0){
        errorObject.textPhoneNumber = "الهاتف مطلوب"
    }else if(!parsePhoneNumberFromString("+"+formNoResults.textPhoneNumber)?.isValid()){
        errorObject.textPhoneNumberValid = "رقم الهاتف غير صالح "
    }

    let ComnmunicationMethod = "";

    if(formNoResults.checkboxGmail)
    ComnmunicationMethod = ` ${t('labelServices.email')} ,`;
    if(formNoResults.checkboxWhatsapp)
    ComnmunicationMethod +=` ${t('labelServices.placeholderWhatsapp')} ,`;
    if(formNoResults.checkboxPhone)
    ComnmunicationMethod +=` ${t('labelServices.numberPhone')} `;
   let myCommunicationMethodEdit = removeTrailingComma(ComnmunicationMethod);


   if(!ComnmunicationMethod){
    errorObject.noChecks = "الحقل  مطلوب";
   }

  setFormErrors(errorObject);


  if(Object.keys(errorObject).length > 0){
    return;
  }




  let paramObject = {
    sender_name: formNoResults.textPersonName,
    phone_number: "+"+formNoResults.textPhoneNumber,
    email: formNoResults.textPersonEmail,
    Communication_method: myCommunicationMethodEdit,
    port_from: portsObject?.portFrom || '',
    port_to: portsObject?.portTo || '',
    container_number: selectedContainer.selectedContainer, // ✅ New
    container_size: bookingObject.container
  }


    dispatch(postAppointment(paramObject))


    }

    const handleInputText = (field,value)=>{

        setFormNoResults((formNoResults)=>({...formNoResults, [field] : value }));

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

    const handleChecked = (field,value)=>{

        setFormNoResults((formNoResults)=>({...formNoResults, [field] : value }));
      }

    const styleColor = {
        color:'#0D3453'
    }

    return (
     <>

    <div className='form-no-results' style={{border:'none'}}>
		<div className='parent-from-to-ports'>
		<section className='portToport-Askmanager'>

<span className='from-to-ports' style={{fontWeight:'bold'}}>{(portsObject.portFrom)?.toString()?.toUpperCase()}

	<span className='arrow-between-ports'><FaArrowRightLong style={{ width: '22px', height: '15px',position:'relative',top:'5px' }} />
	</span>
{(portsObject.portTo)?.toString()?.toUpperCase()}</span>
<div className="gray-point"></div>

<span style={{ position: 'relative', right: '-28px', color: '#0D3453', fontWeight: 'bold' }} className='containerOnly-fixSize'>
    {`${selectedContainer.selectedContainer}X ${bookingObject.container?.toString().toUpperCase().replace('FT', ` FT`)}`}
</span>
</section>
</div>

<div className='form-askManager'>
    <div className='form-item width-100'>
    <InputText
              styleColor={styleColor}
              getInputText={handleInputText}
              Icon={<FaUserCircle/>}
              title={t('labelServices.name')}
              placeholder={t('labelServices.placeholderName')}
              field={FieldsObject.fieldTextPersonName}
              value={formNoResults.textPersonName}
            //   handleClick={handleClick}
            errorValue={formErrors?.textPersonName}
            />
    </div>


    <div className='form-item width-100'>
		<div className='inputEmail-Only-AskManager'>
							<InputText
              styleColor={styleColor}
              getInputText={handleInputText}
              Icon={<TfiEmail/>}
              title={t('labelServices.email')}
              placeholder={t('labelServices.placeholderEmail')}
              field={FieldsObject.fieldEmail}
              value={formNoResults.textPersonEmail}
            //   handleClick={handleClick}
              errorValue={formErrors?.textPersonEmailValid}
							valid={validateEmail(formNoResults.textPersonEmail)} // Set valid based on email validation

              />
</div>
              { (formErrors?.textPersonEmailValid && formErrors?.textPersonEmailValid !=="valid") &&
                <span className='input-warning'>
                { t('labelServices.InvalidEmail')}
                </span>
              }
    </div>


		<div className='form-item width-100 input-box2'>
			<div className='inputPhone-Only-AskManager'>
    <InputPhone
              styleColor={styleColor}
              getInputText={handleInputText}
              title={t('labelServices.numberPhone')}
              placeholder={t('labelServices.placeholderNumberPhone')}
              // Icon={<PhoneProfile/>}
              field={FieldsObject.fieldTextPhoneNumber}
              value={formNoResults.textPhoneNumber}
            //   handleClick={handleClick}
              errorValue={formErrors?.textPhoneNumber || formErrors?.textPhoneNumberValid}
              seto={setFormNoResults}
							valid={parsePhoneNumberFromString("+" + formNoResults.textPhoneNumber)?.isValid() || false} // Use direct validation

              />
</div>
              { (formErrors?.textPhoneNumberValid && formErrors?.textPhoneNumberValid !=="valid") &&
                <span className='input-warning'>
                {
                  t('labelServices.InvalidPhone')
                }
              </span>
              }
    </div>
		</div>
		<div className='checkBox-title-Only-AskManager'>

    <p className='form-item width-100' style={{color:'0D3453'}}>
        {t('labelHomePage.questionContact')}
    </p>
		<div className='checkBox-Only-AskManager'>
    <div className='form-no-results__check'>
        <CardCheckContact
				 handleChecked={handleChecked}
				  field={FieldsObject.fieldCheckPhone}
					value={formNoResults.checkboxPhone}
					 icon={<PhoneIcon/>} placeholder={t('labelServices.numberPhone')} />
        <CardCheckContact  handleChecked={handleChecked} field={FieldsObject.fieldCheckGmail} value={formNoResults.checkboxGmail}  icon={<TfiEmail/>} placeholder={t('labelServices.email')}/>
        <CardCheckContact  handleChecked={handleChecked} field={FieldsObject.fieldCheckWhatsapp} value={formNoResults.checkboxWhatsapp}  icon={<WhatsappIcon/>} placeholder={t('labelServices.placeholderWhatsapp')}/>

</div>
    </div>
		</div>
    {(formErrors?.noChecks && formNoResults.checkboxPhone===false && formNoResults.checkboxGmail===false && formNoResults.checkboxWhatsapp ===false) &&
      <p className='input-warning'>
        {t('bookingTitles.labelNotChecks')}
      </p>
    }

<div className='buttons-AskManager'>
    <div className='form-no-results__button-parent'>

    <button disabled={loadingForm} className='form-no-results__button' onClick={handleSumbitForm}  >
            {t('actions.submit')}
            <span className={`${loadingForm && 'btn-ring'}`}></span>
    </button>
		<button  className='form-no-results__button' onClick={closePopup}  >
            {t('actions.buttonCancel')}
            {/* <span className={`${loadingForm && 'btn-ring'}`}></span> */}


    </button>

    </div>
</div>
    </div>

    </>
    )
}

export default FormAskManager
