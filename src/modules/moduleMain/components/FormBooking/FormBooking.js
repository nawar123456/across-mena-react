import { useEffect, useState ,useRef, Fragment,useMemo } from 'react';
import InputWithSelect from '../../../moduleServices/components/common/InputWithSelect/InputWithSelect';
import './FormBooking.css';
import './ContactFormSection.css'
import { useDispatch,useSelector } from 'react-redux';
import { addDetailsBookObject, addPersonalsObject,setFormData,setSelectedCommodity,setShouldClearForm  } from '../../store/home/home.slice';
import { useNavigate,useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { formatNumber } from '../../../../utils/math/mathUtils';
import styles from './index.module.css';

//new  from No REsult//
// import formBookObject from '../formBookObject/formBookObject';
import InputText from '../../../moduleServices/components/common/InputText/InputText';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import InputPhone from '../../../moduleServices/components/common/InputPhone/InputPhone';
import CardCheckContact from '../CardCheckContact/CardCheckContact';
import { validateEmail } from '../../../../utils/validation/validationForm';
import {ReactComponent as WhatsappIcon}  from '../../../../assets/icons/whatsapp-line.svg';
import {ReactComponent as PhoneIcon}  from '../../../../assets/icons/profile-phone.svg';
import { FaUserCircle } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { FaArrowRightLong } from "react-icons/fa6";

// end no Result//
////////////////////////
// start import section tariffa ///
import TariffaAutoInput from './TariffaAutoInput';
import InputWithSuggestions from './InputWithSuggestions';
 // end iport tariffa//
const FormBooking = () => {

	const tariffaInputRef = useRef(null); // Ref for TariffaAutoInput
	const [tariffaError, setTariffaError] = useState(false); // Validation state for TariffaAutoInput

 const shouldClearForm = useSelector((state) => state.moduleMain.homeSlice.shouldClearForm);
 const selectedContainer = useSelector((state) => state.moduleServices.seaFormSlice);


 const descriptionRef = useRef(null);
 const weightRef = useRef(null);
 const nameRef = useRef(null);
 const emailRef = useRef(null);
 const phoneRef = useRef(null);
	// const previousLocation = usePreviousLocation();

	const {t, i18n} = useTranslation();
	const dispatch = useDispatch();
	const formData = useSelector((state) => state.moduleMain.homeSlice.formData); // Retrieve formData from Redux
    // const [formBookObject, setFormBookObject] = useState(formData);
	// const [selectedId, setSelectedId] = useState(null);
	const [selectedCommodityId, setSelectedCommodityId] = useState(formData.selectedCommodityId);
	const [defaultCommodityLabel, setDefaultCommodityLabel] = useState(formData.selectedCommodityLabel || "");



  const [lastEntries, setLastEntries] = useState({
    textDescriptionBook: [],
    textWeight: [],
	textReferenceNumber: [],
    textPersonName: [],
    textPhoneNumber: [],
	textPersonEmail:[],
});

useEffect(() => {
    const fieldsToRetrieve =["textDescriptionBook", "textWeight","textReferenceNumber","textPersonName","textPhoneNumber","textPersonEmail"];
    const lastEntriesData = {};

    fieldsToRetrieve.forEach((field) => {
        lastEntriesData[field] = JSON.parse(localStorage.getItem(field) || "[]");
    });

    setLastEntries(lastEntriesData);
}, []);



  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
}, [formData]);


useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("formData"));
    if (savedData) {
      setDefaultCommodityLabel(savedData.selectedCommodityLabel || "");
      setSelectedCommodityId(savedData.selectedCommodityId || null);
    }
  }, []);

useEffect(() => {
	setDefaultCommodityLabel(formData.selectedCommodityLabel); // Update from Redux
}, [formData])

const handleCommoditySelect = (id, label) => {
    setSelectedCommodityId(id);
    setDefaultCommodityLabel(label);

    const updatedFormData = { ...formData, selectedCommodityId: id, selectedCommodityLabel: label };
    dispatch(setFormData(updatedFormData)); // Save to Redux
    localStorage.setItem("formData", JSON.stringify(updatedFormData)); // Save to localStorage
  };
// Start values for tariffa //
	const refsValue = [{
    showMessageImport:"1",
    unitTitle:t('labelDutiesCalculator.unitTitleNumber'),
    unitValue:t('labelDutiesCalculator.unitNumber'),
    unitValue2:t('labelDutiesCalculator.unitWeight'),
    hideFourthTool:true,
    searchRef: useRef(), // Initialize as a ref
    valueBrandTube:0,
    valueColored:0,
    valueLycra:0,
  }]





// End values for tariffa
const {
    bookingObject
} = useSelector((state) => state.moduleMain.homeSlice);


	const {
    portsObject,
} = useSelector((state) => state.moduleMain.homeSlice);
//  Start variables Tariffa







// End variables Tariffa
  const FieldsObject = {
    fieldDescription:'textDescriptionBook',
    // fieldNumberPackages:'textNumberPackages',
    fieldReferenceNumber:'textReferenceNumber',
    fieldWeight:'textWeight',
    // fieldCommodity:'selectedCommodityId',
	fieldCommodity:'defaultCommodityLabel',

    // fieldCheck:'checkboxCommodity',
    // fieldEmail:'textEmail',
		fieldTextPersonName:'textPersonName',
		fieldTextPhoneNumber:'textPhoneNumber',
		fieldEmail:'textPersonEmail',
		fieldCheckGmail:'checkboxGmail',
		fieldCheckWhatsapp:'checkboxWhatsapp',
		fieldCheckPhone:'checkboxPhone',

  }


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
   const [formErrors, setFormErrors] = useState({});
   const [isFocused, setIsFocused] = useState(true); // State to track input focus

   const [suggestions, setSuggestions] = useState({
	textDescriptionBook: [],
	textWeight: [],
	textPersonName: [],
	textReferenceNumber: [],
    textPersonName: [],
    textPhoneNumber: [],
		textPersonEmail:[],
});

useEffect(() => {
	const fields =["textDescriptionBook", "textWeight","textReferenceNumber","textPersonName","textPhoneNumber","textPersonEmail"];
	const savedSuggestions = {};

	fields.forEach(field => {
		savedSuggestions[field] = JSON.parse(localStorage.getItem(field) || "[]");
	});

	setSuggestions(savedSuggestions);
}, []);




   useEffect(() => {
	setFormBookObject(formData); // Load saved data into local state on mount
}, [formData]); //

	const [showResults, setShowResults] = useState(false); // show after click احسب الرسوم

  // const dispatch = useDispatch();
  const navigate = useNavigate();
	const {
		loadingForm,
		// postAppointmentForm,
		// errorAppointmentForm

} = useSelector((state) => state.moduleMain.homeSlice);
const isUniqeField = (array,inputOne="",inputSecond="") =>{

	let isExistedAt = array.findIndex(obj => obj.selectOrigin?.label_ar === inputOne && obj.selectSearchValue?.label === inputSecond);

	return isExistedAt;
}


  const handleInputText = (field,value)=>{


	const updatedFormData = { ...formBookObject, [field]: value };
    setFormBookObject(updatedFormData); // Update local state
    dispatch(setFormData(updatedFormData));


    if(field===FieldsObject.fieldWeight || field===FieldsObject.fieldNumberPackages){
      setFormBookObject((formSeaObject)=>({...formSeaObject, [field] : formatNumber(value) }));

    }else if (field===FieldsObject.fieldEmail && ((formErrors?.textPersonEmailValid  ||formErrors?.textPersonEmailValid)==="valid" )){
      if(validateEmail(value)){
        setFormErrors((formErros)=>({...formErros, textPersonEmailValid : "valid" }))
      }else{
        setFormErrors((formErros)=>({...formErros, textPersonEmailValid : "هذا الايميل غير صالح" }))
      }
    }else{
      setFormBookObject((formSeaObject)=>({...formSeaObject, [field] : value }));

    }



  }




	const handleInputTextContact = (field,value)=>{
		const updatedFormData = { ...formBookObject, [field]: value };
		setFormBookObject(updatedFormData); // Update local state
		dispatch(setFormData(updatedFormData)); //
		// setFormBookObject((formBookObject)=>({...formBookObject, [field] : value }));

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

	setFormBookObject((formBookObject)=>({...formBookObject, [field] : value }));
	}
	function removeTrailingComma(str) {
		return str?.endsWith(',') ? str.slice(0, -1) : str;
	}


const styleColor = {
		color:'#727272'
}
//  tariffa
const handleClick = (e,index)=>{
	e.preventDefault();
	try{
	e.target.select();

	}
	catch(e){

	}
}


//tariffa

const handleFormBook = (e)=>{
    e.preventDefault();

		//const fieldToSave = "textPersonName"; // Example field
		// const valueToSave = formBookObject.textPersonName;

    let errorObject = {};

    if (formBookObject?.textDescriptionBook.trim() === "") {
        errorObject.textDescriptionBook = "الحقل  مطلوب";
		// descriptionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
		// descriptionRef.current?.focus();
		// console.log('descRef:',descriptionRef.current);
		// console.log('desc2:',descriptionRef);
		descriptionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        descriptionRef.current?.focus();
		// setFormErrors(errorObject);
		//return; // Stop further validation if the first error is found
    }
        // Ensure scrolling and focusing
        // setTimeout(() => {
        //     descriptionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        //     descriptionRef.current?.focus();
        // }, 0);
        // return;
    // }

        // if(formBookObject?.textNumberPackages.trim()==="" ){
        //   errorObject.textNumberPackages = "الحقل  مطلوب"
        // }
    // if(formBookObject?.textReferenceNumber.trim()==="" ){
    //   errorObject.textReferenceNumber = "الحقل  مطلوب"
    //   }
      if(formBookObject?.textWeight.trim()==="" ){
		errorObject.textWeight = "الحقل  مطلوب";
        weightRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        weightRef.current?.focus();
        // setFormErrors(errorObject);
        // return;
          }
    //   if(formBookObject?.textCommodity.trim()==="" ){
    //     errorObject.textCommodity = "الحقل  مطلوب"
    //     }
      // if(formBookObject?.checkboxCommodity===false){
        // errorObject.checkboxCommodity = "الحقل  مطلوب"
      // }

    // if(formBookObject?.textEmail.trim()==="" ){
    //     errorObject.textEmail = "الحقل  مطلوب"
    //     }

    // if(!validateEmail(formBookObject?.textEmail)){
    //   errorObject.textPersonEmailValid = "الايميل غير صالح "
    // }

		////  Contact Form Inputs  ////
		if(formBookObject?.textPersonName.trim()==="" ){
			errorObject.textPersonName = "الحقل  مطلوب"
			nameRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
			nameRef.current?.focus();
	}

	if(formBookObject?.textPersonEmail.trim()==="" ){
			errorObject.textPersonEmail = "الحقل  مطلوب"
			emailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
			emailRef.current?.focus();
			}

	if(!validateEmail(formBookObject?.textPersonEmail)){
	errorObject.textPersonEmailValid = "الايميل غير صالح "
	}

	if(formBookObject?.textPhoneNumber.trim().length<=3){
			errorObject.textPhoneNumber = "الهاتف مطلوب"
	}else if(!parsePhoneNumberFromString("+"+formBookObject.textPhoneNumber)?.isValid()){
			errorObject.textPhoneNumberValid = "رقم الهاتف غير صالح "
	}

	let ComnmunicationMethod = "";

	if (formBookObject.checkboxGmail) ComnmunicationMethod += "Email,";
	if (formBookObject.checkboxWhatsapp) ComnmunicationMethod += "Whatsapp,";
	if (formBookObject.checkboxPhone) ComnmunicationMethod += "Phone,";
 let myCommunicationMethodEdit = removeTrailingComma(ComnmunicationMethod);


//// end of inputs form contact /////
setFormErrors(errorObject);
let hasError = false;
	// if (!selectedCommodityId) { // Check if TariffaAutoInput value is empty
	// 	setTariffaError(true);
	// 	hasError = true;
	// 	tariffaInputRef.current?.focus(); // Focus and scroll to TariffaAutoInput
	//   } else {
	// 	setTariffaError(false);
	//   }

	  if (hasError){
		 return;
	  }


  if(Object.keys(errorObject).length > 0)
    return;

  const fieldsToSave = ["textDescriptionBook", "textWeight","textReferenceNumber","textPersonName","textPhoneNumber","textPersonEmail"];
  fieldsToSave.forEach((field) => {
		const valueToSave = formBookObject[field];
		let previousEntries = JSON.parse(localStorage.getItem(field) || "[]");
    previousEntries = [
      valueToSave,
      ...previousEntries.filter((v) => v !== valueToSave),
    ].slice(0, 3); // Keep only the last 3 unique values
    localStorage.setItem(field, JSON.stringify(previousEntries));
  });


    dispatch(addDetailsBookObject({
      descriptionBook:formBookObject.textDescriptionBook,
      // numberPacages:formBookObject.textNumberPackages,
      refernceNumber:formBookObject.textReferenceNumber,
      textWeight:formBookObject.textWeight,
      textCommodity:selectedCommodityId,
	  textCommodityLabel:defaultCommodityLabel,
	  sender_name: formBookObject.textPersonName, //input
      phone_number: "+"+formBookObject.textPhoneNumber, //input
      email: formBookObject.textPersonEmail, //input
      Communication_method: myCommunicationMethodEdit, //checkBox
    }));



    dispatch(addPersonalsObject({
      emailUser:formBookObject.textEmail,
    }));

	navigate("details-book");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  }
  const handleInputFocus = (field) => {
	setIsFocused(true); // Show suggestions on focus
};

const handleInputBlur = () => {
	// Delay hiding suggestions to allow click events to register on suggestions
	setTimeout(() => setIsFocused(false), 200);
};

const handleSuggestionClick = (field, value) => {
	setFormBookObject((prev) => ({
		...prev,
		[field]: value
	}));
	setIsFocused(false); // Hide suggestions on selection
};




  const styleTextArea={
    height:'55px'
  }


useEffect(() => {
	if (shouldClearForm) {
		const emptyForm = {
			textDescriptionBook: "",
			textReferenceNumber: "",
			textWeight: "",
			textCommodity: "",
			textPersonName: "",
			textPhoneNumber: "963",
			textPersonEmail: "",
			checkboxGmail: false,
			checkboxWhatsapp: false,
			checkboxPhone: false,
		};
		setFormBookObject(emptyForm);
		dispatch(setFormData(emptyForm));
		dispatch(setShouldClearForm(false)); // Reset the flag
	}
}, [shouldClearForm, dispatch]);


	return (
	  <div className='form-booking'>

		  <div className='booking_row1'>
			<div className='parent-from-to-ports'>
<span className='from-to-ports' style={{fontWeight:'bold'}}>{(portsObject.portFrom)?.toString()?.toUpperCase()}

	<span className='arrow-between-ports'><FaArrowRightLong style={{ width: '22px', height: '15px',position:'relative',top:'5px' }} />
	</span>
{(portsObject.portTo)?.toString()?.toUpperCase()}</span>
<div className="gray-point"></div>

<span style={{ position: 'relative', right: '-28px', color: '#0D3453', fontWeight: 'bold' }} className='containerOnly-fixSize'>
    {`${selectedContainer.selectedContainer}X
	${bookingObject.container?.toString().toUpperCase().replace('FT', ` FT`)}`}

	{console.log('reduxCounter',selectedContainer.selectedContainer)}
	</span>
</div>


			  <p className='row1__title'>
			  {t('bookingTitles.labelWhatShipping')}
			  </p>

			  <div className='form-item width-100'>
			  {/* <InputText
				 getInputText={handleInputText}
				//  Icon={<ContainerIcon/>}
				//  placeholder="ادخل وصف البضائع التي تقوم بشحنها"
				 title={t('bookingTitles.labelCommodity')}
				 field={FieldsObject.fieldCommodity}
				 value={formBookObject.textCommodity}
				//  handleClick={handleClick}
				 errorValue={formErrors?.textCommodity}
			  /> */}




			      <TariffaAutoInput
				 ref={tariffaInputRef}
				 hasError={tariffaError}
				  onSelectId ={handleCommoditySelect}
				  defaultLabel={defaultCommodityLabel} // Set default label from Redux
				  shouldClearForm={shouldClearForm} // Pass shouldClearForm to TariffaInput

				  />





		  </div>



		  </div>

		  <div className='booking_row2'>
		  {/* <p className='row2__title'>
		  {t('bookingTitles.labelDetailsCargoCard')}
		  </p> */}




		  <div className='form-item width-100' >
			<InputWithSuggestions
        field={FieldsObject.fieldDescription}
        value={formBookObject.textDescriptionBook}
        onChange={handleInputText}


      >
			  <InputText
				 getInputText={handleInputText}
				//  Icon={<ContainerIcon/>}
				ref={descriptionRef}
				 placeholder={t('bookingTitles.placeholderCargoDescription')}
				 title={t('bookingTitles.labelCargoDescription')}
				 field={FieldsObject.fieldDescription}
				 value={formBookObject.textDescriptionBook}
				//  onFocus={() => handleInputFocus("textDescriptionBook")}
				//  onBlur={handleInputBlur}

				//  handleClick={handleClick}
				 errorValue={formErrors?.textDescriptionBook}
				 isTextArea={true}
				 styleTextArea={styleTextArea}
			  />
				      </InputWithSuggestions>


        </div>

			  <div className='form-item width-100'>

 <aside className='weight-refernce-inputs'>
			  <div className='card-input'>
				<InputWithSuggestions
        field={FieldsObject.fieldWeight}
        value={formBookObject.textWeight}
        onChange={handleInputText}
				title="weight"
      >
			  <InputWithSelect
			    ref={weightRef}
				textWeightValue={formBookObject.textWeight}
				getInputText={handleInputText}
				field={FieldsObject.fieldWeight}
				title={t('bookingTitles.labelCargoWeight')}
				placeholder={t('bookingTitles.placeholderCargoWeight')}
				errorValue={formErrors?.textWeight}
				// hideSelect={true}
				notDecimal={false}
				showunitText={true}
				untiText={t('bookingTitles.unitCargoWeight')}
				inputMode="numeric"        // Only numeric keyboard
               // Restrict to numeric input
			   pattern="[0-9]*"           // Restrict to numeric input
			   onKeyPress={(e) => {
				   if (!/[0-9]/.test(e.key)) {
					   e.preventDefault(); // Block non-numeric characters
				   }
			   }}
			  />
</InputWithSuggestions>
			  </div>
 <section className='refernce' style={{margin:'26px 0px -12px 0px'}}>
			  <div className='card-input'>
				<InputWithSuggestions
        field={FieldsObject.fieldReferenceNumber}
        value={formBookObject.textReferenceNumber}
        onChange={handleInputText}
				title="weight"
      >
						  <InputWithSelect
				textWeightValue={formBookObject.textReferenceNumber}
				getInputText={handleInputText}
				field={FieldsObject.fieldReferenceNumber}
				title={t('bookingTitles.HaulageReference')}
				placeholder={t('bookingTitles.placeholderHaulageReference')}
				// errorValue={formErrors?.textReferenceNumber}
				// Icon={<WeightIcon/>}
				hideSelect={true}
				// showunitText={true}
				notDecimal={true}

			  />
      </InputWithSuggestions>

			  </div>

</section>
</aside>



		  </div>




			  <div className='form-item width-100'>


						  <div className="no-border">
  {/* <FormNoResults className="no-border"/> */}


  </div>
   {/* add inputs from formNoResults */}
   {/* <div className={`form-no-results ${className}`}> */}
  <div className='name-email-inputs-only'>

  <div className='form-item width-100'>
	<InputWithSuggestions
  field={FieldsObject.fieldTextPersonName} // Unique key for suggestions
  value={formBookObject.textPersonName}
  onChange={handleInputTextContact}
>
  <InputText
  ref={nameRef}
					  styleColor={styleColor}
					  getInputText={handleInputTextContact}
					  Icon={<FaUserCircle/>}
					  title={t('labelServices.name')}
					  placeholder={t('labelServices.placeholderName')}
					  field={FieldsObject.fieldTextPersonName}
					  value={formBookObject.textPersonName}
				  //   handleClick={handleClick}
				  errorValue={formErrors?.textPersonName}
				  />
					</InputWithSuggestions>
  </div>

  <div className='form-item width-100'>

	<InputWithSuggestions
        field={FieldsObject.fieldEmail}
        value={formBookObject.textPersonEmail}
        onChange={handleInputTextContact}
      >
					  <InputText
					  ref={emailRef}
					  styleColor={styleColor}
					  getInputText={handleInputTextContact}
					  Icon={<TfiEmail/>}
					  title={t('labelServices.email')}
					  placeholder={t('labelServices.placeholderEmail')}
					  field={FieldsObject.fieldEmail}
					  value={formBookObject.textPersonEmail}
				  //   handleClick={handleClick}
					  errorValue={formErrors?.textPersonEmailValid}
					  valid={validateEmail(formBookObject.textPersonEmail)} // Set valid based on email validation

					  />
						</InputWithSuggestions>
</div>

  </div>

  <div className='form-item width-100 input-box2'>
	<div className='inputPhone-Only-FormBooking'>
	<InputWithSuggestions
        field={FieldsObject.fieldTextPhoneNumber}
        value={formBookObject.textPhoneNumber}
        onChange={handleInputTextContact}
				title='phone'
      >
  <InputPhone
					  styleColor={styleColor}
					  getInputText={handleInputTextContact}
					  title={t('labelServices.numberPhone')}
					  placeholder={t('labelServices.placeholderNumberPhone')}
					  // Icon={<PhoneProfile/>}
					  field={FieldsObject.fieldTextPhoneNumber}
					  value={formBookObject.textPhoneNumber}
				  //   handleClick={handleClick}
					  errorValue={formErrors?.textPhoneNumber || formErrors?.textPhoneNumberValid}
					  seto={setFormBookObject}
					  valid={parsePhoneNumberFromString("+" + formBookObject.textPhoneNumber)?.isValid() || false} // Use direct validation

					  />
						      </InputWithSuggestions>

</div>
					  {/* { (formErrors?.textPhoneNumberValid && formErrors?.textPhoneNumberValid !=="valid") &&
						  <span className='input-warning'>
						  {
							  t('labelServices.InvalidPhone')
						  }
					  </span>
					  } */}

  </div>


<div className='checkBox-title-Only-FormBooking'>
  <p className='form-item width-100' style={{color:'#0D3453',fontWeight:'bold',fontSize:'16px',position:'relative',bottom:'37px'}}>
		  {t('labelHomePage.questionContact')}
  </p>

  <div className='form-no-results__checks'>
		  <CardCheckContact
		   handleChecked={handleChecked}
		    field={FieldsObject.fieldCheckPhone}
			 value={formBookObject.checkboxPhone}
			   icon={<PhoneIcon/>}
			    placeholder={t('labelServices.numberPhone')}/>
		  <CardCheckContact  handleChecked={handleChecked} field={FieldsObject.fieldCheckGmail} value={formBookObject.checkboxGmail}  icon={<TfiEmail/>} placeholder={t('labelServices.email')}/>
		  <CardCheckContact  handleChecked={handleChecked} field={FieldsObject.fieldCheckWhatsapp} value={formBookObject.checkboxWhatsapp}  icon={<WhatsappIcon/>} placeholder={t('labelServices.placeholderWhatsapp')} />

  </div>
  </div>
  {/* {(formErrors?.noChecks && formBookObject.checkboxPhone===false && formBookObject.checkboxGmail===false && formBookObject.checkboxWhatsapp ===false) &&
	  <p className='input-warning'>
		  {t('bookingTitles.labelNotChecks')}
	  </p>
  } */}


  <div className='form-no-results__button-parentss'>

  <button disabled={loadingForm} className='form-no-results__buttonsss' onClick={handleFormBook} >
			{t('actions.buttonNext')}
				  <span className={`${loadingForm && 'btn-ring'}`}></span>
  </button>



  </div>



  {/* end of add inputs from formNoResults  */}
			  </div>



		  </div>


	  </div>
	)
  }

  export default FormBooking
