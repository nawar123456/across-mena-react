import { useEffect, useState ,useRef, Fragment,useMemo } from 'react';
// import InputText from '../../../moduleServices/components/common/InputText/InputText';
import InputWithSelect from '../../../moduleServices/components/common/InputWithSelect/InputWithSelect';
import './FormBooking.css';
// import './../FormNoResults/FormNoResults.css'
import { useDispatch,useSelector } from 'react-redux';
import { addDetailsBookObject, addPersonalsObject } from '../../store/home/home.slice';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { formatNumber } from '../../../../utils/math/mathUtils';
import styles from './index.module.css';
import FormAskManager from '../../pages/AskManager/FormAskManager';
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
// end no Result//
////////////////////////
// start import section tariffa ///
import Mark from "mark.js";
import { useParams} from 'react-router-dom';
import {fetchFeeCalculator, resetFeeCalculator , fetchOrigins , fetchCustomValues, getLastItemValue, getLastItemValueEmpty } from '../../../moduleTools/store/calculatorTap/customs.slice';
import { mathCeil, roundDollar  } from '../../../../utils/math/mathUtils';
import {clearData, clearSelectedCard } from '../../../moduleTools/store/prohibitedTab/accordion.slice';
import ModalAccordion from '../../../moduleTools/components/customsPage/ModalAccordion/ModalAccordion';
import LoaderModal from '../../../../components/LoaderModal/LoaderModal';
import ModalText from '../../../moduleTools/components/customsPage/ModalText/ModalText';
import { useCallback } from 'react';
import { ReactComponent as TreeView } from '../../../../assets/icons/tree-view.svg';
import {ReactComponent as DeleteIcon } from '../../../../assets/icons/x-mark.svg';
import {ReactComponent as PlusIcon } from '../../../../assets/icons/plus_icon2.svg';
import { Helmet } from 'react-helmet-async';

import alertWarn from '../../../../assets/images/alert.png';
import SkeletonResults from '../../../../components/Skeletons/SkeletonResults';

// end iport tariffa//
let timer ;

const FormBooking = () => {


	// Start VariablesBooking
  const {t, i18n} = useTranslation();
	const {
    portsObject,
} = useSelector((state) => state.moduleMain.homeSlice);


  const FieldsObject = {
    fieldDescription:'textDescriptionBook',
    // fieldNumberPackages:'textNumberPackages',
    fieldReferenceNumber:'textReferenceNumber',
    fieldWeight:'textWeight',
    fieldCommodity:'textCommodity',
    // fieldCheck:'checkboxCommodity',
    // fieldEmail:'textEmail',
		fieldTextPersonName:'textPersonName',
		fieldTextPhoneNumber:'textPhoneNumber',
		fieldEmail:'textPersonEmail',
		fieldCheckGmail:'checkboxGmail',
		fieldCheckWhatsapp:'checkboxWhatsapp',
		fieldCheckPhone:'checkboxPhone',

  }

  const initialForm = useMemo(() => ({
    textDescriptionBook:"",
    // textNumberPackages:"",
    textReferenceNumber:"",
    textWeight:"",
    textCommodity:"",
    // checkboxCommodity:false,
    // textEmail:"",
    textPersonName:"",
    textPhoneNumber:"963",
    textPersonEmail:"",
    checkboxGmail:false,
    checkboxWhatsapp:false,
    checkboxPhone:false,
  }), []);

  const [formBookObject , setFormBookObject] = useState(initialForm);
  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
	const {
		loadingForm,
		// postAppointmentForm,
		// errorAppointmentForm

} = useSelector((state) => state.moduleMain.homeSlice);


  const handleInputText = (field,value)=>{

    // console.log(field,FieldsObject.fieldWeight,"FieldsObject.fieldWeight")

    if(field===FieldsObject.fieldWeight || field===FieldsObject.fieldNumberPackages){
        // console.log(value,"value")
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

		setFormBookObject((formBookObject)=>({...formBookObject, [field] : value }));

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
		color:'#0D3453'
}
  const handleFormBook = (e)=>{
    e.preventDefault();

    let errorObject = {};

    if(formBookObject?.textDescriptionBook.trim()==="" ){
        errorObject.textDescriptionBook = "الحقل  مطلوب"
        }
        // if(formBookObject?.textNumberPackages.trim()==="" ){
        //   errorObject.textNumberPackages = "الحقل  مطلوب"
        // }
    // if(formBookObject?.textReferenceNumber.trim()==="" ){
    //   errorObject.textReferenceNumber = "الحقل  مطلوب"
    //   }
      if(formBookObject?.textWeight.trim()==="" ){
      errorObject.textWeight = "الحقل  مطلوب"
      }
      if(formBookObject?.textCommodity.trim()==="" ){
        errorObject.textCommodity = "الحقل  مطلوب"
        }
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
	}

	if(formBookObject?.textPersonEmail.trim()==="" ){
			errorObject.textPersonEmail = "الحقل  مطلوب"
			}

	if(!validateEmail(formBookObject?.textPersonEmail)){
	errorObject.textPersonEmailValid = "الايميل غير صالح "
	}

	if(formBookObject.textPhoneNumber.trim().length===0){
			errorObject.textPhoneNumber = "الهاتف مطلوب"
	}else if(!parsePhoneNumberFromString("+"+formBookObject.textPhoneNumber)?.isValid()){
			errorObject.textPhoneNumberValid = "رقم الهاتف غير صالح "
	}

	let ComnmunicationMethod = "";

	if(formBookObject.checkboxGmail)
	ComnmunicationMethod = ` ${t('labelServices.email')} ,`;
	if(formBookObject.checkboxWhatsapp)
	ComnmunicationMethod +=` ${t('labelServices.placeholderWhatsapp')} ,`;
	if(formBookObject.checkboxPhone)
	ComnmunicationMethod +=` ${t('labelServices.numberPhone')} `;
 let myCommunicationMethodEdit = removeTrailingComma(ComnmunicationMethod);


 if(!ComnmunicationMethod){
	errorObject.noChecks = "الحقل  مطلوب";
 }

//// end of inputs form contact /////
  setFormErrors(errorObject);


  if(Object.keys(errorObject).length > 0){
    return;
  }


    dispatch(addDetailsBookObject({
      descriptionBook:formBookObject.textDescriptionBook,
      // numberPacages:formBookObject.textNumberPackages,
      refernceNumber:formBookObject.textReferenceNumber,
      textWeight:formBookObject.textWeight,
      textCommodity:formBookObject.textCommodity,
		  sender_name: formBookObject.textPersonName,
      phone_number: "+"+formBookObject.textPhoneNumber,
      email: formBookObject.textPersonEmail,
      Communication_method: myCommunicationMethodEdit,
    }));
		console.log(formBookObject.textPersonName)
		console.log(formBookObject.textCommodity)


    dispatch(addPersonalsObject({
      emailUser:formBookObject.textEmail,
    }));

    navigate('details-book' )

  }

  // const handleChecked = (field,value)=>{

  //   setFormBookObject((formSeaObject)=>({...formSeaObject, [field] : value }));


  // }

  const styleTextArea={
    height:'70px'
  }

// End of VariablesBooking



/////// start VariablesTariffa///
const {loadingFeeCalc,feeCalculator ,errorCalc, arrayCountries ,errorCountry , customValues , loadingCustomCalc ,getLastItem   } = useSelector((state) => state.customsCalculator);
const {isSearch } = useSelector((state) => state.accordion);

const [isArabCountryGroup,setIsArabCountryGroup]= useState(false);

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
  const initialStateCheck = useMemo(() => {
    return {
      isCheckedAgreement: false,
      isCheckedConsulate:false
    };
  }, []);

	const initialStateData=[{
    query :"",
    textNumberValue : '',
    textWeightValue : '',
    valueIndicativePrice : '',
    inputIndicativePrice : '',

    isCheckedLycra: false,
    isCheckedColored: false,
    isCheckedBrand: false,
    isCheckedTubes: false,
    isCheckedPrimary:false,
    isCheckedIndustrial:false,

    minimumTotalIndicative:'0',//firstlabel
    syrianTotalValue:'0',//secondLabel
    costInsurance:'0',//thirdLabel

    lessIndicativePrice:false,//15

    selectOrigin:null,
    selectTypeGoods:null,

    isDisabledOrigin:true,
    isDisabledWeight:true,
    isDisabledIndicative:true,
    isDisabledByGoods:true,

    selectSearchValue:{},

    focusOrigin :false,
    focusType:false,

  },]

    const [errors, setErrors] = useState([]);
    const [selectSourceError, setErrorSource] = useState(false);
    const [checkAgreementError, setErrorAgreement] = useState("");

    const [isInfoUniqe, setIsInfoUniqe] = useState({
      currentIndex:0,
      isFound:false,
      similarAt:0
    });

		const [selectSource,setSelectSource] = useState(null);
    const [focusSource, setFocusSource] = useState(false);

const [stateData, setStateData] = useState(initialStateData);
const [indexData, setIndexData] = useState(0)
const [stateIsChecked, setIsChecked] = useState(initialStateCheck);
const refsData = useRef(refsValue);

useEffect(()=>{

  // setFormSeaObject(initialFormSea)
  const dataRef = [...refsData.current];

  dataRef[0]["unitTitle"] = t('labelDutiesCalculator.unitTitleNumber');
  dataRef[0]["unitValue"] = t('labelDutiesCalculator.unitNumber');
  dataRef[0]["unitValue2"] = t('labelDutiesCalculator.unitWeight');


},[i18n.language])


const CalculateSumValue = (stateData,field) => {
	const finalResult=  useMemo(() => {
		let result= stateData.reduce((sum, item) => sum + parseFloat((item[field]).replace(/,/g, '')), 0);

		return formatNumber(result.toString())

	}, [stateData,field]);

	return finalResult;
	}

const multipliedInsurance  = useRef(0.0012);
const valueSyrianTrans = useRef('0');

const [query , setQuery] = useState("");
const [page , setPage] = useState(1)
const observer = useRef();

const [showThreeNumber, setShowThreeNumber] = useState(false);//show results of labels
const [showResults, setShowResults] = useState(false); // show after click احسب الرسوم

const {id}= useParams();
const[isID,setIsId]= useState(false);

const includesArabCountry = (array, val) =>{
  return array.includes(val);
}

const showResultsCalculator = (e)=>{
  e.preventDefault();

  if(stateIsChecked.isCheckedAgreement===false){
    setErrorAgreement(t('labelDutiesCalculator.errorAgremnt'))
    return;
  }else{
    setErrorAgreement("")
  }

  if(ValidationForm())
  return

	const results = stateData.map((item, index) => {
    let OneObject = {
      insurance:parseFloat(item.costInsurance.replace(/,/g, '')), // me سعر التامين
      origin:item.selectOrigin.label_ar, // me
      source:selectSource.label_ar,
      fee:item.selectSearchValue.fee,// 0.01 from api
      spending_fee:item.selectSearchValue.spending_fee,
      support_fee:item.selectSearchValue.support_fee,
      protection_fee:item.selectSearchValue.protection_fee,
      natural_fee:item.selectSearchValue.natural_fee,
      tax_fee:item.selectSearchValue.tax_fee,
      import_fee:item.selectSearchValue.Import_fee,
      raw_material:Number(item.isCheckedPrimary), //اولية me
      industrial:Number(item.isCheckedIndustrial), // صناعية تشيك  me
      total_tax:item.selectSearchValue.total_taxes.total_tax,

      partial_tax:item.selectSearchValue.total_taxes.partial_tax,
      arabic_stamp: item.selectSearchValue.total_taxes.arabic_stamp,
      weight:item.textWeightValue.trim()==='' ? 0 : parseFloat(item.textWeightValue.replace(/,/g, '')), // me الوزن
      cnsulate:Number(stateIsChecked.isCheckedConsulate), // me قنصلية
      price: parseFloat(item.inputIndicativePrice.replace(/,/g, '')), // me  سسعر استرشادي
      dolar:parseFloat(valueSyrianTrans.current), // me valuesyrian
    }


    if(includesArabCountry(item.selectOrigin.countryGroups,4)){
      setIsArabCountryGroup(true)
    }


    return OneObject;
});



if(showResults ===false) //will open and invoke
dispatch(fetchCustomValues(results))

setShowResults(previous => !previous);

}

const chooseValue =  useCallback((itemObject,index) => {
  if(Object.keys(itemObject)?.length === 0 )
  return;


  let data = [...stateData];
  const dataRef = [...refsData.current];

setShowThreeNumber(true);

data[index].selectSearchValue=itemObject;

valueSyrianTrans.current= (itemObject.dolar.price).toString();

data[index]["isDisabledOrigin"]=false;
data[index]["isDisabledByGoods"]=false;


dataRef[index]["searchRef"].current.value = itemObject.label;

if(getLastItem !==""){
  dispatch(getLastItemValueEmpty());
}

setQuery("");

data[index]["query"]="";

  dataRef[index]["showMessageImport"] = itemObject.export1;

  if(itemObject.unit==="كغ"  || itemObject.unit==="قيراط"){

    if(i18n.language==="en")
    dataRef[index]["unitValue2"] = itemObject.unit_en;
    else
    dataRef[index]["unitValue2"] = itemObject.unit;

    dataRef[index]["hideFourthTool"] = true;

  }

  else if(itemObject.unit==="1000 كيلو واط بالساعة" ){

    dataRef[index]["unitTitle"] = t('labelDutiesCalculator.unitTitleWatt');
    if(i18n.language==="en")
    dataRef[index]["unitValue"] = itemObject.unit_en;
    else
    dataRef[index]["unitValue"] = itemObject.unit;

    dataRef[index]["hideFourthTool"] = false;

  }
  else if(itemObject.unit==="عدد" || itemObject.unit==="عدد الأزواج" ){

    dataRef[index]["unitTitle"] = t('labelDutiesCalculator.unitTitleNumber');
    if(i18n.language==="en")
    dataRef[index]["unitValue"] = itemObject.unit_en;
    else
    dataRef[index]["unitValue"] = itemObject.unit;

    dataRef[index]["hideFourthTool"] = false;

  }
  else if(itemObject.unit==="متر" || itemObject.unit==="متر مربع" || itemObject.unit==="متر مكعب"){

    dataRef[index]["unitTitle"] = t('labelDutiesCalculator.unitTitleSize');
    if(i18n.language==="en")
    dataRef[index]["unitValue"] = itemObject.unit_en;
    else
    dataRef[index]["unitValue"] = itemObject.unit;


    dataRef[index]["hideFourthTool"] = false;
  }
  else if(itemObject.unit==="لتر"){

    dataRef[index]["unitTitle"] = t('labelDutiesCalculator.unitTitleCapacity');
    if(i18n.language==="en")
    dataRef[index]["unitValue"] = itemObject.unit_en;
    else
    dataRef[index]["unitValue"] = itemObject.unit;


    dataRef[index]["hideFourthTool"] = false;
  }

  //---------------------------------------------
  data[index]["textNumberValue"]="";
  data[index]["textWeightValue"]="";
  data[index]["inputIndicativePrice"]="";



 setSelectSource(null);

 data[index]["selectOrigin"]=null;
 data[index]["selectTypeGoods"]=null;


 //reset all ref .........etc
//  setIsChecked(initialStateCheck);

 data[index]["isCheckedLycra"]=false;
 data[index]["isCheckedColored"]=false;
 data[index]["isCheckedBrand"]=false;
 data[index]["isCheckedTubes"]=false;
 data[index]["isCheckedPrimary"]=false;
 data[index]["isCheckedIndustrial"]=false;

 dataRef[index]["valueLycra"] = false;
 dataRef[index]["valueColored"] = false;
 dataRef[index]["valueBrandTube"] = false;


  if(itemObject.price > 0){

      data[index]["isDisabledIndicative"]=true;
      data[index]["isDisabledWeight"]=false;

      data[index]["valueIndicativePrice"]=itemObject.price.toString();


      // setFirstValueLabel('0') // should be معادلة

  }else{

    data[index]["isDisabledIndicative"]=true;
    data[index]["isDisabledWeight"]=true;
    data[index]["valueIndicativePrice"]='';
    data[index]["minimumTotalIndicative"]=formatNumber(valueSyrianTrans.current);

  }

  setStateData(data);
  refsData.current=dataRef;

},[initialStateCheck, stateData.length,getLastItem]);

useEffect(()=>{

	if((feeCalculator.arrayFee?.length > 0 && id!=="calculator"&&isID===true && getLastItem==="") ||(feeCalculator.arrayFee?.length > 0 && getLastItem!=="") ){

		chooseValue(feeCalculator.arrayFee[0],indexData)
			return
		}

	},[isID,id,chooseValue,feeCalculator.arrayFee,getLastItem,indexData])

// 	const handleInputTextCalc = (field, value,index) =>{

//     let data = [...stateData];
//     // setStateData(data);
//     setIndexData(index);

//     let formattedValue = formatNumber(value);//داخل التاب بقلو اذا القيمة فاضيه رجع فاضيه فهيك بحذفو

//     if(field=== "numberValue"){

//       if(value.trim() ===''){ //ممكن احذفوا

//         data[index]["textNumberValue"]='';

//         setStateData(data);
//         return
//       }

//       data[index]["textNumberValue"]=formattedValue;

//     }

//     else if(field=== "weightValue"){

//       if(value.trim() ===''){

//         data[index]["textWeightValue"]='';

//         setStateData(data);

//         return
//       }

//       data[index]["textWeightValue"]=formattedValue;
//     }

//     else if(field=== "indicativeText"){

//       if(value.trim() ===''){
//         // setValueInput({...stateValueInput, valueIndicativePrice : '' });

//         data[index]["inputIndicativePrice"]='';
//         data[index]["lessIndicativePrice"]=false;

//         setStateData(data);

//         return
//       }



//       // setValueInput({...stateValueInput, valueIndicativePrice : formattedValue });

//       data[index]["inputIndicativePrice"]=formattedValue;


//     }

//     setStateData(data);
// }

useEffect(() => { // يتغير حسب المستخدم


  if(stateData[indexData] ===undefined)
  return


  if(stateData[indexData]["isDisabledIndicative"]===true &&stateData[indexData]["valueIndicativePrice"]  !=='0' && stateData[indexData]["valueIndicativePrice"].trim() !=='' )
  {

    if(refsData.current[indexData].hideFourthTool===false){
    if(stateData[indexData]["textNumberValue"] !== '0' && stateData[indexData]["textNumberValue"].trim() !==''){

      let stringWithouttextWeightValue = stateData[indexData]["textNumberValue"].replace(/,/g, '');
      let stringWithoutValueIndicativePricet = stateData[indexData]["valueIndicativePrice"].replace(/,/g, '');
      let resultFormatted = (parseFloat(stringWithouttextWeightValue)* parseFloat(stringWithoutValueIndicativePricet));


      const result = resultFormatted;

      const roundedResult = roundDollar(result);

      let stringWithoutInputIndicativePrice = stateData[indexData]["inputIndicativePrice"].replace(/,/g, '');

      let data = [...stateData];

      if(roundedResult > roundDollar( parseFloat(stringWithoutInputIndicativePrice))){

        data[indexData]["lessIndicativePrice"] = true;

      }else{

        data[indexData]["lessIndicativePrice"] = false;
      }


      data[indexData]["minimumTotalIndicative"] = formatNumber(roundedResult.toString());

      setStateData(data);


    }else{
      let data = [...stateData];
      data[indexData]["minimumTotalIndicative"] = '0';
      setStateData(data);
    }

  }else{

    if(stateData[indexData]["textWeightValue"] !== '0' && stateData[indexData]["textWeightValue"].trim() !==''){

      let stringWithouttextWeightValue = stateData[indexData]["textWeightValue"].replace(/,/g, '');
      let stringWithoutValueIndicativePricet = stateData[indexData]["valueIndicativePrice"].replace(/,/g, '');
      let resultFormatted = (parseFloat(stringWithouttextWeightValue)* parseFloat(stringWithoutValueIndicativePricet));


      let stringWithoutInputIndicativePrice = stateData[indexData]["inputIndicativePrice"].replace(/,/g, '');

      const result = resultFormatted;
      const roundedResult = roundDollar(result);

      let data = [...stateData];


      if(roundedResult > roundDollar( parseFloat(stringWithoutInputIndicativePrice))){

        data[indexData]["lessIndicativePrice"] = true;


      }else{

        data[indexData]["lessIndicativePrice"] = false;

      }

      data[indexData]["minimumTotalIndicative"] = formatNumber(roundedResult.toString());
      setStateData(data);

    }else{

      let data = [...stateData];
      data[indexData]["minimumTotalIndicative"] = '0';
      setStateData(data);
    }

  }

    if(stateData[indexData]["minimumTotalIndicative"] !=='0' ){

      let stringWithoutFirstValueLabel = stateData[indexData]["minimumTotalIndicative"].replace(/,/g, '');

      let resultFormatted = (parseFloat(stringWithoutFirstValueLabel)* parseFloat(valueSyrianTrans.current))

      let resultNearstTen =  mathCeil(resultFormatted);

    // setSecondValueLabel(formatNumber(resultNearstTen.toString()));

    let data = [...stateData];

    data[indexData]["syrianTotalValue"]=formatNumber(resultNearstTen.toString());

    setStateData(data);


    }else{
      // setSecondValueLabel('0')

      let data = [...stateData];

      data[indexData]["syrianTotalValue"]='0';

      setStateData(data);
    }


  }
  else{

    let data = [...stateData];

    if(stateData[indexData]["minimumTotalIndicative"] ==='0'){


    data[indexData]["minimumTotalIndicative"]=formatNumber(valueSyrianTrans.current);


    }

    if(stateData[indexData]["minimumTotalIndicative"] !=='0' &&  stateData[indexData]["inputIndicativePrice"].trim() !=='' ){

      let stringWithoutFirstValueLabel = stateData[indexData]["minimumTotalIndicative"].replace(/,/g, '');
      let stringWithoutValueIndicativePricet = stateData[indexData]["inputIndicativePrice"].replace(/,/g, '');
      let resultFormatted = (parseFloat(stringWithoutFirstValueLabel)* parseFloat(stringWithoutValueIndicativePricet));

      let resultNearstTen =  Math.round(Math.ceil(resultFormatted) / 10) * 10;

      // setSecondValueLabel(formatNumber(resultNearstTen.toString()));

      data[indexData]["syrianTotalValue"]=formatNumber(resultNearstTen.toString());

    }else{
      // setSecondValueLabel('0')
      data[indexData]["syrianTotalValue"]='0';
    }

    setStateData(data);

  }

  if(stateData[indexData]["syrianTotalValue"] !=='0'){

    let stringWithoutSecondValueLabel = stateData[indexData]["syrianTotalValue"].replace(/,/g, '');
    let resultFormatted = (parseFloat(stringWithoutSecondValueLabel)+ (multipliedInsurance.current *parseFloat(stringWithoutSecondValueLabel)));


    let resultNearstTen =  mathCeil(resultFormatted);

    let data = [...stateData];

    // setThirdValueLabel(formatNumber(resultNearstTen.toString()));

    data[indexData]["costInsurance"]=formatNumber(resultNearstTen.toString());
    setStateData(data);


  }else{
    // setThirdValueLabel('0')

    let data = [...stateData];

    data[indexData]["costInsurance"]='0';

    setStateData(data);

  }
  //---------------------------------------------
  setShowResults(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
},[indexData,stateData[indexData]?.isDisabledIndicative,stateData[indexData]?.valueIndicativePrice,stateData[indexData]?.minimumTotalIndicative,stateData[indexData]?.syrianTotalValue,stateData[indexData]?.textNumberValue,stateData[indexData]?.inputIndicativePrice,stateData[indexData]?.textWeightValue])

// const handleCheckedCalc = (field, value,index) =>{

// 	setShowResults(false);
// 	const dataRef = [...refsData.current];
// 	let data = [...stateData];

// 	if(index !== -1)
// 	setIndexData(index);


// 	if(field ==="checkLycra"){

// 		// setIsChecked({...stateIsChecked, isCheckedLycra : value });

// 		data[index]["isCheckedLycra"] = value;
// 		dataRef[index]["valueLycra"] = 0.05;

// 	}
// 	else if (field ==="checkColor") {

// 		// setIsChecked({...stateIsChecked, isCheckedColored : value });

// 		data[index]["isCheckedColored"] = value;
// 		dataRef[index]["valueColored"] = 0.1;
// 	}
// 	else if (field ==="checkBrand"){

// 		// setIsChecked({...stateIsChecked, isCheckedBrand : value });

// 		data[index]["isCheckedBrand"] = value;
// 		dataRef[index]["valueBrandTube"] = 1.5;
// 	}
// 	else if (field ==="checkTubes"){

// 		// setIsChecked({...stateIsChecked, isCheckedTubes : value });

// 		data[index]["isCheckedTubes"] = value;
// 		dataRef[index]["valueBrandTube"] = 0.1;

// 	}else if (field ==="checkPrimary"){

// 		// setIsChecked({...stateIsChecked, isCheckedPrimary : value });

// 		data[index]["isCheckedPrimary"] = value;
// 		setStateData(data);
// 		return
// 	}
// 	else if (field ==="checkIndustrial"){

// 		// setIsChecked({...stateIsChecked, isCheckedIndustrial : value });

// 		data[index]["isCheckedIndustrial"] = value;
// 		setStateData(data);
// 		return
// 	}
// 	else if (field ==="checkConsulate"){

// 		setIsChecked({...stateIsChecked, isCheckedConsulate : value });
// 		return
// 	}
// 	else if (field ==="checkAgreement"){

// 		setIsChecked({...stateIsChecked, isCheckedAgreement : value });

// 		return
// 	}

// 	if(value ===true){

// 		if(parseFloat(data[index]["valueIndicativePrice"]) > 0 && data[index]["valueIndicativePrice"].trim() !=='') // full
// 		{
// 			const result = parseFloat(data[index]["valueIndicativePrice"]) + (dataRef[index]["valueLycra"] + dataRef[index]["valueColored"] + dataRef[index]["valueBrandTube"]);
// 			const roundedResult = roundDollar(result);


// 			data[index]["valueIndicativePrice"] =  roundedResult.toString();

// 		}

// }else{
// 	if(parseFloat(data[index]["valueIndicativePrice"]) > 0 && data[index]["valueIndicativePrice"].trim() !==''){
// 		const result = parseFloat(data[index]["valueIndicativePrice"]) - (dataRef[index]["valueLycra"] + dataRef[index]["valueColored"] + dataRef[index]["valueBrandTube"]);

// 		if(result < 0){

// 			data[index]["valueIndicativePrice"] = "0";
// 			setStateData(data);

// 			return;
// 		}

// 		const roundedResult = roundDollar(result);

// 		data[index]["valueIndicativePrice"] = roundedResult.toString();




// 		// dataRef[index]["valueLycra"] = 0;
// 		// dataRef[index]["valueColored"] = 0;
// 		// dataRef[index]["valueBrandTube"] = 0;



// 	}
// 	else{


// 		dataRef[index]["valueLycra"] = 0;
// 		dataRef[index]["valueColored"] = 0;
// 		dataRef[index]["valueBrandTube"] = 0;
// 		}
// }

// setStateData(data);
// refsData.current=dataRef;

// }


const compareArray = (targetArray,arraysToCompare , targetDrobLabelObject='1')=>{

	if(targetDrobLabelObject==='1'){

		// Loop through each array in arraysToCompare
		for (let i = 0; i < arraysToCompare?.length; i++) {
			const currentArray = arraysToCompare[i];

			// Loop through targetArray and compare values with the current array
			for (let j = 0; j < targetArray?.length; j++) {
				const valueFromTarget = targetArray[j];
				// Check if the value exists in the current array
				if (currentArray.countryGroups.includes(valueFromTarget)) {

					return currentArray.price;


			}
		}
	}

	}else{

for (let i = 0; i < arraysToCompare?.length; i++) {

	const currentArray = arraysToCompare[i];
	// alert(targetArray)
	if(currentArray.countryGroups?.length > 0){
	// Loop through targetArray and compare values with the current array
	for (let j = 0; j < targetArray?.length; j++) {

		const valueFromTarget = targetArray[j];
		// Check if the value exists in the current array
		if (currentArray.countryGroups.includes(valueFromTarget) && currentArray.label===targetDrobLabelObject) {

			return currentArray.price;
	}
}

}else{

if ( currentArray.label === targetDrobLabelObject) {
	return currentArray.price;
}
	}
}
}


}

const  checkIndicativePrice = (currentPriceCountry,index)=>{

  let data = [...stateData];

  if(currentPriceCountry > 0 ){

    // stateData[index]["selectTypeGoods"]

    data[index]["isDisabledIndicative"]=true;
    data[index]["isDisabledWeight"]=false;


      const result = currentPriceCountry + (refsData.current[index].valueLycra +refsData.current[index].valueColored  + refsData.current[index].valueBrandTube);
      const roundedResult = roundDollar(result);


      data[index]["valueIndicativePrice"]=roundedResult.toString();

    }

    else{

    if(data[index]["selectSearchValue"].price > 0){ // البند يملك سعر


    data[index]["isDisabledIndicative"]=true;
    data[index]["isDisabledWeight"]=false;


    const result = data[index]["selectSearchValue"].price +  (refsData.current[index].valueLycra +refsData.current[index].valueColored  + refsData.current[index].valueBrandTube);
    const roundedResult = roundDollar(result);


    data[index]["valueIndicativePrice"]=roundedResult.toString();

    }

    else{// user will write (not inclue with brand tube lycra colored)

    data[index]["isDisabledIndicative"]=false;
    data[index]["isDisabledWeight"]=true;
    data[index]["valueIndicativePrice"]='';
    }

  }

  setStateData(data);


}

const dropDownWithOrigin = (field , getObject,index) =>{

  // Orgini not have label to send
  if(field==="selectOrigin"){
  if(stateData[index]["selectTypeGoods"] !==null && Object.keys(stateData[index]["selectTypeGoods"])?.length > 0 ){

    let currentPriceCountry =  compareArray(getObject.countryGroups,stateData[index]["selectSearchValue"].extras,stateData[index]["selectTypeGoods"].label );

    checkIndicativePrice(currentPriceCountry,index);


}
  else{
  // setErrorDropWithOrigin("هذا الحقل مطلوب");
}

} else if ( field ==="selectTypeGoods"){

  if(stateData[index]["selectOrigin"] !==null && Object.keys(stateData[index]["selectOrigin"])?.length > 0){
    let currentPriceCountry =  compareArray(stateData[index]["selectOrigin"].countryGroups,stateData[index]["selectSearchValue"].extras,getObject.label );

    checkIndicativePrice(currentPriceCountry,index);
  }
  else{
  // setErrorOrigin("هذا الحقل مطلوب");
  }

}

}

const handleSelect = (field , value,index) => {

	let getObject = value;
	setShowResults(false);
	let data = [...stateData];
	setIndexData(index);




	if(field==="selectOrigin"){

		let isExsited = isUniqeField(stateData,getObject.label_ar,stateData[index]["selectSearchValue"].label)

		if(isExsited!==-1){

	data[index]["selectOrigin"]=getObject;
	setStateData(data);

	setIsInfoUniqe({
		currentIndex: index,
		isFound: true,
		similarAt: isExsited ,
	});

	return
		}

		setIsInfoUniqe({
			currentIndex: index,
			isFound: false,
			similarAt: -1 ,
		});

		data[index]["selectOrigin"]=getObject;

		if(!getObject)
		return;


		if(getObject!==null && Object.keys(stateData[index]["selectSearchValue"])?.length >0 ){
			// setErrorOrigin("");
		}

	} else if (field==="selectTypeGoods"){

		data[index]["selectTypeGoods"]=getObject;

		if(!getObject)
		return;

		if(getObject!==null && Object.keys(stateData[index]["selectSearchValue"])?.length >0 ){

			// setErrorDropWithOrigin("");
		}

	} else if(field==="selectSource"){
		setSelectSource(getObject);


	}


	if(stateData[index]["selectSearchValue"].placeholder===null || stateData[index]["selectSearchValue"].placeholder===""){

		let currentPriceCountry ;

				if(stateData[index]["selectSearchValue"].extras?.length >0){

					currentPriceCountry =  compareArray(getObject.countryGroups,stateData[index]["selectSearchValue"].extras );
				}

				else{
					currentPriceCountry =-1 ; // there no contry to compare
					}

					checkIndicativePrice(currentPriceCountry,index);

	}else{

				dropDownWithOrigin(field , getObject,index);
	}

	setStateData(data);

	}

	const lastElement = (node) => {

    if(loadingFeeCalc) return;
    if(observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries)=> {

      if(entries[0].isIntersecting && page <feeCalculator.totalFee ){
        setPage((prev) => prev +1);
      }
    });

    if(node){
      observer.current.observe(node);

    let markInstance = new Mark(document.querySelector("#search-node"));
    markInstance.unmark({
      done: () => {
        markInstance.mark(query);
      }
    });
    }
  }


	useEffect(()=>{
    dispatch(resetFeeCalculator());

    // eslint-disable-next-line
  },[dispatch,query]);

  useEffect(()=>{

    const f=async()=>{
      await dispatch(fetchFeeCalculator({query:query,page})).unwrap();


    }

    if(page===1){
      dispatch(resetFeeCalculator());
      // alert("agin . pare === 1")

    }

    if(query?.length >=2){

     f();




    }else if(id!=="calculator"&&isID===true&&getLastItem===""){
      // searchRef.current.value=id;

      // const dataRef = [...refsData.current];
      // dataRef[0]["searchRef"].current.value=id;
      // refsData.current=dataRef;

      dispatch(fetchFeeCalculator({query:id,page}));
    }else if (getLastItem !=="" ){
      // const dataRef = [...refsData.current];
      // dataRef[indexData]["searchRef"].current.value="12";
      // refsData.current=dataRef;

      // searchRef.current.value = getLastItem.toString();
      dispatch(fetchFeeCalculator({query:getLastItem.toString(),page}));
    }

    // eslint-disable-next-line
  },[isID,dispatch,query ,page,id,getLastItem,indexData]);


  useEffect(()=>{
    if(arrayCountries?.length >0)
    return
    dispatch(fetchOrigins());

    // eslint-disable-next-line
  },[dispatch]);


  useEffect(()=>{

      if(getLastItem !==""){
        dispatch(getLastItemValueEmpty());
      }

        if(id ==="calculator"){
          setQuery('');


          setStateData(initialStateData);

          const dataRef = [...refsValue];

          // refsData.current=refsValue;
          dataRef[0]["searchRef"].current.value="";
          refsData.current=dataRef;


        setIsChecked(initialStateCheck);



        setShowThreeNumber(false);
        // setFirstValueLabel('0')

        setSelectSource(null);




      }

      if(id!=="calculator")
        setIsId(true);


    return () => {
        dispatch(getLastItemValue(""));
        // dispatch(resetFeeCalculator());
    }
    // eslint-disable-next-line
  },[dispatch,id])

  const handleChangeSearch = (e,index)=>{

    const dataRef = [...refsData.current];
    let data = [...stateData];
    data[index]["query"]=e.target.value;
    setIndexData(index);

  if(getLastItem !==""){
    dispatch(getLastItemValueEmpty());
  }



  if(data[index]["query"].trim()===''){
    setQuery('');
    data[index]["query"]='';

    data[index]["selectSearchValue"]={};

    data[index]["isDisabledOrigin"]=true;
    data[index]["isDisabledWeight"]=true;
    data[index]["isDisabledIndicative"]=true;
    data[index]["isDisabledByGoods"]=true;


    data[index]["textNumberValue"]='';
    data[index]["textWeightValue"]='';
    data[index]["valueIndicativePrice"]='';
    data[index]["inputIndicativePrice"]='';

    setIsChecked(initialStateCheck);

    data[index]["isCheckedLycra"]=false;
    data[index]["isCheckedColored"]=false;
    data[index]["isCheckedBrand"]=false;
    data[index]["isCheckedTubes"]=false;
    data[index]["isCheckedPrimary"]=false;
    data[index]["isCheckedIndustrial"]=false;


    dataRef[index]["valueLycra"] = 0;
    dataRef[index]["valueColored"]= 0;
    dataRef[index]["valueBrandTube"]= 0;

    setShowThreeNumber(false);// to show results of label

    // setFirstValueLabel('0')
    setSelectSource(null);

    data[index]["selectOrigin"]=null;
    data[index]["selectTypeGoods"]=null;


    data[index]["isCheckedIndustrial"]=false;
    data[index]["isCheckedIndustrial"]=false;
    data[index]["isCheckedIndustrial"]=false;


    // setErrorDropWithOrigin("");
    // setErrorOrigin("");

    dataRef[index]["hideFourthTool"] = true;

    setStateData(data);
    refsData.current=dataRef;

    return
  }

    if(id!=="calculator")
    setIsId(true);

    if(timer){
      clearTimeout(timer);
    }

    timer = setTimeout(()=>{

      setQuery(e.target.value);

      // data[index]["query"]=e.target.value;
      setStateData(data);

      setPage(1);
    }, 600)

  }
  const formatOptionLabel = ({label_ar, ImageURL }) => (

    <div className={styles['select-option']}>

      <span >{label_ar}</span>
      <div>

        {ImageURL && <img  className={styles['select-flag']} src={ImageURL} alt='country flag'/>}
      </div>

    </div>
  );

  const formatOptionLabel_en = ({label, ImageURL }) => (

    <div className={styles['select-option']}>

      <span >{label}</span>
      <div>

        {ImageURL && <img  className={styles['select-flag']} src={ImageURL} alt='country flag'/>}
      </div>

    </div>
  );

  const formatOptionLabel2 = ({label }) => (

    <div className={styles['select-option']}>

      <span >{label}</span>

    </div>
  );

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
      boxShadow: 'none',
      // first and second input in calc page
      background: isDisabled ? 'rgba(255, 255, 255, 0)': selectProps.inputValue ? '#fffdaf' : 'transparent',
      touchAction:'manipulation',
      width: '100% ',
      height: '55px ',
      padding: '0px 0px',
      '@media (max-width: 600px)': { minHeight:'10px' , height: '40px', fontSize:'16px' },
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

	const customFilter = (option, searchText) => {
    // Convert both the option label and search text to lowercase for case-insensitive comparison
    const optionLabel = option.label?.toLowerCase();
    const optionLabelAr = option.label_ar?.toLowerCase();
    const searchTextLower = searchText?.toLowerCase();

    // Return true if either label includes the search text
    return optionLabel?.includes(searchTextLower) || optionLabelAr?.includes(searchTextLower);
  };

	const [toggleModalText , setToggleModalText] = useState(false);
  const [toggleModalText1 , setToggleModalText1] = useState(false);

  const showPopUpAgreement = (e) =>{

    e.preventDefault()
    setToggleModalText(true);
  }

const showPopUpFees = (e,index) =>{

    e.preventDefault()
    setIndexData(index);

    if(isSearch===true)
    dispatch(clearData());

    //close accordion
    dispatch(clearSelectedCard());

    dispatch(getLastItemValue(""));
    setToggleModalText1(true);

}

  const handleClick = (e,index)=>{
    e.preventDefault();
    try{
    e.target.select();

    }
    catch(e){

    }
  }

	const handleFocus = (field,index) => {

    let data = [...stateData];

    if(field==="selectOrigin"){
    data[index]["focusOrigin"]=true;

    }
    else if(field==="selectSource"){

    setFocusSource(true)


    }
    else{
    data[index]["focusType"]=true;
    }

    setStateData(data);

  };

  const handleBlur = (field,index) => {

    let data = [...stateData];

    if(field==="selectOrigin"){
    data[index]["focusOrigin"]=false;

    }
    else if(field==="selectSource"){
    setFocusSource(false);

    }
    else{
      data[index]["focusType"]=false;
      }

    setStateData(data);

  };



  const ValidationForm = ()=>{
    const arrayErrors = stateData.map((item,index) => {
      const fieldErrors = {};

      // Check conditions for each field and store errors
      if (item.textNumberValue === '' &&refsData.current[index].hideFourthTool===false ) {
        fieldErrors.textNumberValue = 'Value is required';
      }

      if (item.textWeightValue === '') {
        fieldErrors.textWeightValue = 'Value is required';
      }

      if (item.inputIndicativePrice === '' || (item["valueIndicativePrice"] !=='' &&item["lessIndicativePrice"]===true)) {
        fieldErrors.inputIndicativePrice = 'Value is required OR lessIndicativePrice';
      }

      if (item.selectOrigin === null) {
        fieldErrors.selectOrigin = 'Value is required';
      }

      if (Object.keys(item.selectSearchValue).length===0) {
        fieldErrors.selectSearchValue = 'Value is required';
      }

      if(Object.keys(item["selectSearchValue"])?.length !== 0 && item["selectSearchValue"].placeholder &&item.selectTypeGoods===null){
        fieldErrors.selectTypeGoods = 'Value is required';
      }



      // Add conditions for other fields as needed

      return fieldErrors;
    });

    // Update errors state
    setErrors(arrayErrors);


    if(selectSource===null){
      setErrorSource(true)
    }else{
      setErrorSource(false)
    }


       // Example array of objects
      const arrayOfObjects = arrayErrors;

      // Function to check if an object is empty
      const isEmptyObject = (obj) => Object.keys(obj).length === 0 && obj.constructor === Object;

      // Check if all objects in the array are empty
      const isAllObjectsEmpty = arrayOfObjects.every(isEmptyObject);

    if(isAllObjectsEmpty===false || selectSource===null ){

      return true

    }else{
      return false
    }
  }

  const isUniqeField = (array,inputOne="",inputSecond="") =>{

    let isExistedAt = array.findIndex(obj => obj.selectOrigin?.label_ar === inputOne && obj.selectSearchValue?.label === inputSecond);

    return isExistedAt;
  }

  const searchReff = useRef(null);
  const handleAddFieldSet= (e)=>{

    e.preventDefault();

    if(ValidationForm())// if true form has error
    return


    setShowResults(false);

    let newStateObject = {
      textNumberValue : '',
      textWeightValue : '',
      valueIndicativePrice : '',
      inputIndicativePrice : '',

      isCheckedLycra: false,
      isCheckedColored: false,
      isCheckedBrand: false,
      isCheckedTubes: false,
      isCheckedPrimary:false,
      isCheckedIndustrial:false,

      minimumTotalIndicative:'0',//firstlabel
      syrianTotalValue:'0',//secondLabel
      costInsurance:'0',//thirdLabel

      lessIndicativePrice:false,

      selectOrigin:null,
      selectTypeGoods:null,

      isDisabledOrigin:true,
      isDisabledWeight:true,
      isDisabledIndicative:true,
      isDisabledByGoods:true,

      selectSearchValue:{},

      focusOrigin :false,
      focusType:false,
      focusSource:false,

    }

    let newRefsObject = {
      showMessageImport:"1",
      unitTitle:t('labelDutiesCalculator.unitTitleNumber'),
      unitValue:t('labelDutiesCalculator.unitNumber'),
      unitValue2:t('labelDutiesCalculator.unitWeight'),
      hideFourthTool:true,
      searchRef:searchReff,
      valueBrandTube:0,
      valueColored:0,
      valueLycra:0,
    }


    setStateData([...stateData,newStateObject]);
    refsData.current = [...refsData.current, newRefsObject];
  }


	const handleDeleteFieldSet = (index)=>{
    const deleteVal = [...stateData];
    const deleteRef = [...refsData.current];


    deleteVal.splice(index,1);
    deleteRef.splice(index, 1);

    setStateData(deleteVal);
    deleteRef.current=deleteRef;

  }














////// End VariablesTariffa ////





  return (
    <div className='form-booking'>

        <div className='booking_row1'>

					{portsObject.portFrom}-----{portsObject.portTo}
            <p className='row1__title'>
            {t('bookingTitles.labelWhatShipping')}
            </p>
{/*
            <div className='form-item width-100'>
            <InputText
               getInputText={handleInputText}
              //  Icon={<ContainerIcon/>}
              //  placeholder="ادخل وصف البضائع التي تقوم بشحنها"
               title={t('bookingTitles.labelCommodity')}
               field={FieldsObject.fieldCommodity}
               value={formBookObject.textCommodity}
              //  handleClick={handleClick}
               errorValue={formErrors?.textCommodity}
            />

        </div> */}
            {stateData.map((item,index) =>{

							<div className={`${styles['input-box']} ${styles['width-100']}` }>
            <div className={styles['search-parent']}>

            <div className={styles['search-box']}>

            <div className={styles['entryarea']}>
            <input required
            autoComplete="off"
            title=''
            className={styles['input-search']}
            type='text'
            ref={refsData.current[index]?.["searchRef"]}
            onClick={(e)=>handleClick(e,index)}
            onChange={(e)=> handleChangeSearch(e,index)}
            style={{borderRadius:id!=="calculator" &&'9px',  border:((errors[index]?.selectSearchValue &&refsData.current[index]?.["searchRef"]?.current?.value?.trim()==="" ) || (isInfoUniqe.currentIndex===index && isInfoUniqe.isFound) ) && '1px solid #f60000'}}
            disabled={id!=="calculator" && true }


            />
            <div className={`${styles['input-title']} ${id!=="calculator" && styles['active']}`} style={{lineHeight: id!=="calculator" &&'5px' , background: id!=="calculator" &&'transparent'}}>{t('labelDutiesCalculator.customsitem')}</div>
            </div>

            <button className={styles['btn-accordain']} onClick={(e)=>showPopUpFees(e,index)} style={{display: id!=="calculator" && 'none' }}>
            <span className={styles['btn-title']}>
            {t('labelDutiesCalculator.browseTariffs')}
            </span>
            <TreeView className={styles['btn-icon']}/>
            </button>
            {
            toggleModalText1 &&
            (
            <ModalAccordion toggleModalText={toggleModalText1} setToggleModalText = {setToggleModalText1}/>
            )
            }
            </div>

            {
            (stateData[index]["query"]?.length >= 2 )? (
            <div id="search-node" className={styles['search-list']}>
              { feeCalculator.arrayFee?.length>0 ?
                (feeCalculator.arrayFee.map((item ,i) => {
                  if(feeCalculator.arrayFee?.length === i + 1){

                    return(

                      <>
                      <div className={styles['list-item']} key={i} ref={lastElement} onClick={()=>chooseValue(item,index)} >
                        <p className={styles['item-title']}>
                          {item.label}
                        </p>
                      </div>

                     {
                     (loadingFeeCalc) &&
                     <div className={styles['list-item']}>
                      <p>
                      {t('labelDutiesCalculator.waitingLoad')}
                      </p>
                      </div>
                      }
                      </>

                )}else{

                  return(

                    item.label &&
                    <div className={styles['list-item']} key={i} onClick={()=>chooseValue(item,index)}>
                        <p className={styles['item-title']}>
                        {item.label}
                      </p>
                    </div>

                    )

                }
                })

                )
                :

                <div  className={styles['list-item']} style={{ borderBottom:'none'}}>
                  {
                (loadingFeeCalc  ) ?
              <div className={styles['list-item']} style={{paddingTop:'0px'}}>
               <p>
               {t('labelDutiesCalculator.waitingLoad')}
                </p>
                </div>
                :

                (loadingFeeCalc ===false && errorCalc ===null && stateData[index]["query"]?.length >= 2 && feeCalculator.arrayFee?.length===0 )?
                <p style={{fontWeight:'bold'}} >{t('labelDutiesCalculator.resultsSearch')}</p>


               :(errorCalc !==null ) &&
                <p style={{fontWeight:'bold' , color:'red'}} >{errorCalc}</p>





                  }
                </div>
              }



            </div>

            ): null
            }

            {refsData.current[index]?.showMessageImport==="0" &&stateData[index]["isDisabledOrigin"]===false &&
            <span className={styles['input-warning']}>
              {t('labelDutiesCalculator.noImport')}
            </span>
            }

            </div>
          </div>

					})}



        </div>

        <div className='booking_row2'>
        <p className='row2__title'>
        {t('bookingTitles.labelDetailsCargoCard')}
        </p>

        <div className='form-item width-100'>
            <InputText
               getInputText={handleInputText}
              //  Icon={<ContainerIcon/>}
               placeholder={t('bookingTitles.placeholderCargoDescription')}
               title={t('bookingTitles.labelCargoDescription')}
               field={FieldsObject.fieldDescription}
               value={formBookObject.textDescriptionBook}
              //  handleClick={handleClick}
               errorValue={formErrors?.textDescriptionBook}
               isTextArea={true}
               styleTextArea={styleTextArea}
            />

        </div>

        <div className='card-tools'>


            <div className='card-input'>
            <InputWithSelect
              textWeightValue={formBookObject.textWeight}
              getInputText={handleInputText}
              field={FieldsObject.fieldWeight}
              title={t('bookingTitles.labelCargoWeight')}
              placeholder={""}
              errorValue={formErrors?.textWeight}
              // hideSelect={true}
              showunitText={true}
              untiText={t('bookingTitles.unitCargoWeight')}

            />

            </div>

            <div className='card-input'>
						<InputWithSelect
              textWeightValue={formBookObject.textReferenceNumber}
              getInputText={handleInputText}
              field={FieldsObject.fieldReferenceNumber}
              title={t('bookingTitles.HaulageReference')}
              // placeholder={"أدخل عدد الطرود"}
              // errorValue={formErrors?.textReferenceNumber}
              // Icon={<WeightIcon/>}
              hideSelect={true}
              // showunitText={true}
              notDecimal={true}

            />

            </div>



        </div>

            <div className='card-tools'>






        </div>


            <div className='form-item width-100'>


						<div className="no-border">
{/* <FormNoResults className="no-border"/> */}


</div>
 {/* add inputs from formNoResults */}
 {/* <div className={`form-no-results ${className}`}> */}
<div className=''>

<div className='form-item width-100'>
<InputText
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
</div>

<div className='form-item width-100 input-box2'>
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
					/>

					{ (formErrors?.textPhoneNumberValid && formErrors?.textPhoneNumberValid !=="valid") &&
						<span className='input-warning'>
						{
							t('labelServices.InvalidPhone')
						}
					</span>
					}
</div>

<div className='form-item width-100'>
					<InputText
					styleColor={styleColor}
					getInputText={handleInputTextContact}
					Icon={<TfiEmail/>}
					title={t('labelServices.email')}
					placeholder={t('labelServices.placeholderEmail')}
					field={FieldsObject.fieldEmail}
					value={formBookObject.textPersonEmail}
				//   handleClick={handleClick}
					errorValue={formErrors?.textPersonEmailValid}
					/>

					{ (formErrors?.textPersonEmailValid && formErrors?.textPersonEmailValid !=="valid") &&
						<span className='input-warning'>
						{ t('labelServices.InvalidEmail')}
						</span>
					}
</div>

<p className='form-item width-100' style={{color:'0D3453'}}>
		{t('labelHomePage.questionContact')}
</p>

<div className='form-no-results__check'>
		<CardCheckContact  handleChecked={handleChecked} field={FieldsObject.fieldCheckPhone} value={formBookObject.checkboxPhone}  icon={<PhoneIcon/>} placeholder={t('labelServices.numberPhone')}/>
		<CardCheckContact  handleChecked={handleChecked} field={FieldsObject.fieldCheckGmail} value={formBookObject.checkboxGmail}  icon={<TfiEmail/>} placeholder={t('labelServices.email')}/>
		<CardCheckContact  handleChecked={handleChecked} field={FieldsObject.fieldCheckWhatsapp} value={formBookObject.checkboxWhatsapp}  icon={<WhatsappIcon/>} placeholder={t('labelServices.placeholderWhatsapp')}/>

</div>
{(formErrors?.noChecks && formBookObject.checkboxPhone===false && formBookObject.checkboxGmail===false && formBookObject.checkboxWhatsapp ===false) &&
	<p className='input-warning'>
		{t('bookingTitles.labelNotChecks')}
	</p>
}


<div className='form-no-results__button-parent'>

<button disabled={loadingForm} className='form-no-results__button' onClick={handleFormBook} >
				2Form
				<span className={`${loadingForm && 'btn-ring'}`}></span>
</button>
</div>

</div>


{/* end of add inputs from formNoResults  */}
            </div>



        </div>


    </div>
  )
}

export default FormBooking
