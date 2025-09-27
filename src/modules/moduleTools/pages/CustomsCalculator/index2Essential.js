
import { useEffect, useState ,useRef, Fragment } from 'react';

import Select from "react-select";
import Mark from "mark.js";
import { useParams} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import {fetchFeeCalculator, resetFeeCalculator , fetchOrigins , fetchCustomValues, getLastItemValue, getLastItemValueEmpty } from '../../store/calculatorTap/customs.slice';
import {clearData, clearSelectedCard } from '../../store/prohibitedTab/accordion.slice';

import heroImage from '../../../../assets/images/calculator.webp';
import alertWarn from '../../../../assets/images/alert.png';
import {ReactComponent as DeleteIcon } from '../../../../assets/icons/x-mark.svg';
import {ReactComponent as PlusIcon } from '../../../../assets/icons/plus_icon2.svg';

import { ReactComponent as TreeView } from '../../../../assets/icons/tree-view.svg';


import { mathCeil, roundDollar ,formatNumber } from '../../../../utils/math/mathUtils';

//custom hooks

import {SecondaryHero,Heading} from '../../../../components';
import MainContainer from '../../../../components/MainContainer/MainContainer';
import FormContainer from '../../components/common/FormContainer/FormContainer';
import GoToTop from '../../../../components/GoToTop/GoToTop';


//const

import styles from './index.module.css';
import SkeletonResults from '../../../../components/Skeletons/SkeletonResults';
import { useCallback } from 'react';
import { useMemo } from 'react';
import ModalText from '../../components/customsPage/ModalText/ModalText';
import ModalAccordion from '../../components/customsPage/ModalAccordion/ModalAccordion';
import LoaderModal from '../../../../components/LoaderModal/LoaderModal';
import SEO from '../../../../components/SEO/SEO';
import { getSEOData } from '../../../../const/seoTitles';
import { useTranslation } from 'react-i18next';

let timer ;

const CustomsCalculator = () => {

  const {t, i18n} = useTranslation();
  
  // Get SEO data based on current language
  const currentLang = i18n.language || 'ar';
  const seoData = getSEOData('customsCalculator', currentLang);

  const dispatch = useDispatch();
  const {loadingFeeCalc,feeCalculator ,errorCalc, arrayCountries ,errorCountry , customValues , loadingCustomCalc ,getLastItem   } = useSelector((state) => state.customsCalculator);
  const {isSearch } = useSelector((state) => state.accordion);

  const [isArabCountryGroup,setIsArabCountryGroup]= useState(false);
//-----------------------------------------------------------------------

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

  //----------------------------------------------------------------------

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


//----------------------------------------------------------------------

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


//----------------------------------------------------------------------
const CalculateSumValue = (stateData,field) => {
const finalResult=  useMemo(() => {
  let result= stateData.reduce((sum, item) => sum + parseFloat((item[field]).replace(/,/g, '')), 0);

  return formatNumber(result.toString())

}, [stateData,field]);

return finalResult;
}



//-----------------------------------------------------------------
const multipliedInsurance  = useRef(0.0012);
const valueSyrianTrans = useRef('0');
//-----------------------------------------------------------------

const [query , setQuery] = useState("");
const [page , setPage] = useState(1);

//-----------------------------------------------------------------
const observer = useRef();
//-----------------------------------------------------------------
const [showThreeNumber, setShowThreeNumber] = useState(false);//show results of labels
const [showResults, setShowResults] = useState(false); // show after click احسب الرسوم

const {id}= useParams();

const[isID,setIsId]= useState(false);
// console.log(isID,"isID") // always false until change to input of type goods
//-----------------------------------------------------------------
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


//++++++++++++++++++++++++++++++++++++++++++++++++++++

const handleInputText = (field, value,index) =>{

    let data = [...stateData];
    // setStateData(data);
    setIndexData(index);

    let formattedValue = formatNumber(value);//داخل التاب بقلو اذا القيمة فاضيه رجع فاضيه فهيك بحذفو

    if(field=== "numberValue"){

      if(value.trim() ===''){ //ممكن احذفوا

        data[index]["textNumberValue"]='';

        setStateData(data);
        return
      }

      data[index]["textNumberValue"]=formattedValue;

    }

    else if(field=== "weightValue"){

      if(value.trim() ===''){

        data[index]["textWeightValue"]='';

        setStateData(data);

        return
      }

      data[index]["textWeightValue"]=formattedValue;
    }

    else if(field=== "indicativeText"){

      if(value.trim() ===''){
        // setValueInput({...stateValueInput, valueIndicativePrice : '' });

        data[index]["inputIndicativePrice"]='';
        data[index]["lessIndicativePrice"]=false;

        setStateData(data);

        return
      }



      // setValueInput({...stateValueInput, valueIndicativePrice : formattedValue });

      data[index]["inputIndicativePrice"]=formattedValue;


    }

    setStateData(data);
}


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

  const handleChecked = (field, value,index) =>{

    setShowResults(false);
    const dataRef = [...refsData.current];
    let data = [...stateData];

    if(index !== -1)
    setIndexData(index);


    if(field ==="checkLycra"){

      // setIsChecked({...stateIsChecked, isCheckedLycra : value });

      data[index]["isCheckedLycra"] = value;
      dataRef[index]["valueLycra"] = 0.05;

    }
    else if (field ==="checkColor") {

      // setIsChecked({...stateIsChecked, isCheckedColored : value });

      data[index]["isCheckedColored"] = value;
      dataRef[index]["valueColored"] = 0.1;
    }
    else if (field ==="checkBrand"){

      // setIsChecked({...stateIsChecked, isCheckedBrand : value });

      data[index]["isCheckedBrand"] = value;
      dataRef[index]["valueBrandTube"] = 1.5;
    }
    else if (field ==="checkTubes"){

      // setIsChecked({...stateIsChecked, isCheckedTubes : value });

      data[index]["isCheckedTubes"] = value;
      dataRef[index]["valueBrandTube"] = 0.1;

    }else if (field ==="checkPrimary"){

      // setIsChecked({...stateIsChecked, isCheckedPrimary : value });

      data[index]["isCheckedPrimary"] = value;
      setStateData(data);
      return
    }
    else if (field ==="checkIndustrial"){

      // setIsChecked({...stateIsChecked, isCheckedIndustrial : value });

      data[index]["isCheckedIndustrial"] = value;
      setStateData(data);
      return
    }
    else if (field ==="checkConsulate"){

      setIsChecked({...stateIsChecked, isCheckedConsulate : value });
      return
    }
    else if (field ==="checkAgreement"){

      setIsChecked({...stateIsChecked, isCheckedAgreement : value });

      return
    }

    if(value ===true){

      if(parseFloat(data[index]["valueIndicativePrice"]) > 0 && data[index]["valueIndicativePrice"].trim() !=='') // full
      {
        const result = parseFloat(data[index]["valueIndicativePrice"]) + (dataRef[index]["valueLycra"] + dataRef[index]["valueColored"] + dataRef[index]["valueBrandTube"]);
        const roundedResult = roundDollar(result);


        data[index]["valueIndicativePrice"] =  roundedResult.toString();

      }

  }else{
    if(parseFloat(data[index]["valueIndicativePrice"]) > 0 && data[index]["valueIndicativePrice"].trim() !==''){
      const result = parseFloat(data[index]["valueIndicativePrice"]) - (dataRef[index]["valueLycra"] + dataRef[index]["valueColored"] + dataRef[index]["valueBrandTube"]);

      if(result < 0){

        data[index]["valueIndicativePrice"] = "0";
        setStateData(data);

        return;
      }

      const roundedResult = roundDollar(result);

      data[index]["valueIndicativePrice"] = roundedResult.toString();




      // dataRef[index]["valueLycra"] = 0;
      // dataRef[index]["valueColored"] = 0;
      // dataRef[index]["valueBrandTube"] = 0;



    }
    else{


      dataRef[index]["valueLycra"] = 0;
      dataRef[index]["valueColored"] = 0;
      dataRef[index]["valueBrandTube"] = 0;
      }
  }

  setStateData(data);
  refsData.current=dataRef;

}

  //-------------------------------------------------------------------
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

    if(page===1){
      dispatch(resetFeeCalculator());
      // alert("agin . pare === 1")

    }

    if(query?.length >=2){




    dispatch(fetchFeeCalculator({query:query,page}));


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
    }, 500)

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
      background: isDisabled ? 'rgba(221, 221, 221, 0.5)': selectProps.inputValue ? '#fffdaf' : 'transparent',
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

  /*------------------------------------------------------------ */


  const customFilter = (option, searchText) => {
    // Convert both the option label and search text to lowercase for case-insensitive comparison
    const optionLabel = option.label?.toLowerCase();
    const optionLabelAr = option.label_ar?.toLowerCase();
    const searchTextLower = searchText?.toLowerCase();

    // Return true if either label includes the search text
    return optionLabel?.includes(searchTextLower) || optionLabelAr?.includes(searchTextLower);
  };

  /*--------------------------------------------------------------------------- */

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

  return (
    <>
    <SEO 
      title={seoData.title}
      description={seoData.description}
      keywords={seoData.keywords}
      image="https://acrossmena.net/images/og-calculator.jpg"
      url="https://acrossmena.net/customs-duties-calculator/calculator"
      type="tool"
      lang={currentLang}
    />

    <GoToTop/>
    {/* <SecondaryHero title={t('title.titleCustomsDutiesCaculator')} image={heroImage}/> */}
    <section className='pd-y'>
    <Heading showUnderDevelop={true} title={t('title.titleCustomsDutiesCaculator')} body={t('section.detailsCustomsDutiesCalculator')}/>

    <LoaderModal hide={`${loadingFeeCalc===true && getLastItem !=="" ? "" : 'loader-modal--hiden'}`}/>

    <MainContainer hasPadding={true}>
      <FormContainer>

        <div className={styles['input-details']}>

            {stateData.map((item,index) =>{
              return(
                <Fragment key={index}>
                <fieldset  className={styles.fieldset}  style={{border: (isInfoUniqe.currentIndex===index && isInfoUniqe.isFound) && '1px solid #F60000' , boxShadow:  (isInfoUniqe.currentIndex===index && isInfoUniqe.isFound) && '9px 9px 4.5px rgba(246, 0, 0, 0.16), 0px 0px 1.5px rgba(246, 0, 0, 0.16)'}} >
                    <legend className={styles.legend}>{`${t('labelDutiesCalculator.item')} ${index+1}`}</legend>

                    {index !==0 &&
                      <span className={styles['form-delete']} onClick={()=>handleDeleteFieldSet(index)}>
                      <DeleteIcon/>
                    </span>
                    }

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

            { stateData[index]["query"]?.length >= 2 ? (
            <div id="search-node" className={styles['search-list']}>
              { feeCalculator.arrayFee?.length>0 ?
                (feeCalculator.arrayFee.map((item ,i) => {
                  if(feeCalculator.arrayFee?.length === i + 1){

                    return(
                      <div className={styles['list-item']} key={i} ref={lastElement} onClick={()=>chooseValue(item,index)} >
                        <p className={styles['item-title']}>
                          {item.label}
                        </p>
                      </div>

                )}else{

                  return(
                    <div className={styles['list-item']} key={i} onClick={()=>chooseValue(item,index)}>
                        <p className={styles['item-title']}>
                        {item.label}
                      </p>
                    </div>)
                }
                })

                )
                :
                <div className={styles['list-item']} style={{borderBottom:'none'}}>
                  {
                <>
                {loadingFeeCalc ===false && errorCalc ===null && stateData[index]["query"]?.length >= 2 && feeCalculator.arrayFee?.length===0 &&
                <p style={{fontWeight:'bold'}} >{t('labelDutiesCalculator.resultsSearch')}</p>
                }

               { errorCalc !==null  &&
                <p style={{fontWeight:'bold' , color:'red'}} >{errorCalc}</p>
              }
                </>
                  }
                </div>
              }

              {
                loadingFeeCalc &&
              <div className={styles['list-item']} style={{paddingTop:'0px'}}>
               <p>
               {t('labelDutiesCalculator.waitingLoad')}
                </p>
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

        {
        Object.keys(stateData[index]["selectSearchValue"])?.length !== 0 && stateData[index]["selectSearchValue"].placeholder &&
          <div  onClick={(e)=>handleClick(e,index)} className={`${styles['input-box']} ${styles['width-100']}` }>

            <div className={styles['entryarea']}>
            <span className={`${styles['input-title']}  ${ stateData[index]["focusType"] || stateData[index]["selectTypeGoods"] ? styles['active'] : ''}`}>{stateData[index]["selectSearchValue"].placeholder} </span>
          <Select
                  value={stateData[index]["selectTypeGoods"]}
                  placeholder=""
                  formatOptionLabel={formatOptionLabel2}

                  noOptionsMessage={()=> {t('labelDutiesCalculator.noOptions')}}
                  options={stateData[index]["selectSearchValue"].extras}
                  onChange={(e)=>handleSelect("selectTypeGoods",e,index)} // assign onChange function
                  isClearable={true}
                  styles={customStyle(errors[index]?.selectTypeGoods,stateData[index]["selectTypeGoods"])}
                  menuShouldScrollIntoView={false}
                  onFocus={() => handleFocus("selectTypeGoods",index)} // Handle focus event
                  onBlur={() => handleBlur("selectTypeGoods",index)}   // Handle blur event
                  // className={errorDropWithOrigin && styles['border-warning']}
                  isSearchable={false} // Disable search

                  />
            </div>


          </div>
        }


          {
          Object.keys(stateData[index]["selectSearchValue"])?.length !== 0 && Object.keys(stateData[index]["selectSearchValue"].extras)?.length !== 0 &&
          <>
          {
          stateData[index]["selectSearchValue"].extras[0]['lycra'] &&
          <div className={`${styles['input-box']} ${styles['width-gap-120']}`} style={stateData[index]["selectSearchValue"].extras[0]['lycra'] && stateData[index]["selectSearchValue"].extras[0]['colored_thread']===false ?{width:'100%'} : {}}>
          <div className={styles['checkbox-parent']}>
          <label htmlFor={`lycraCheck${index}`} className={styles['input-title']} style={{marginBottom:'0px'}}>{t('labelDutiesCalculator.lycraLabel')}</label>
            <input  id={`lycraCheck${index}`} checked={stateData[index]["isCheckedLycra"]} onChange={(e) => handleChecked("checkLycra",e.target.checked,index)} className={styles['checkbox-text']} type='checkbox' />
          </div>
          </div>
          }
          {
          stateData[index]["selectSearchValue"].extras[0]['colored_thread'] &&
          <div className={`${styles['input-box']} ${styles['width-gap-120']} `} style={stateData[index]["selectSearchValue"].extras[0]['lycra'] && stateData[index]["selectSearchValue"].extras[0]['colored_thread'] && stateData[index]["selectSearchValue"].placeholder?.length <=0 ?{width:'66%'} : {}}  >
          <div className={styles['checkbox-parent']}>
          <label htmlFor={`coloredCheck${index}`} className={styles['input-title']} style={{marginBottom:'0px'}} >{t('labelDutiesCalculator.coloredLabel')}</label>
            <input id={`coloredCheck${index}`} checked={stateData[index]["isCheckedColored"]} onChange={(e) => handleChecked("checkColor",e.target.checked,index)} className={styles['checkbox-text']} type='checkbox'  required />
          </div>
          </div>
          }

          {
          stateData[index]["selectSearchValue"].extras[0]['Brand'] &&
          <div className={`${styles['input-box']} ${styles['width-100']}`}>
          <div className={styles['checkbox-parent']}>
          <label htmlFor={`brandCheck${index}`} className={styles['input-title']} style={{marginBottom:'0px'}}>{t('labelDutiesCalculator.brandLabel')}</label>
            <input id={`brandCheck${index}`} checked={stateData[index]["isCheckedBrand"]} onChange={(e) => handleChecked("checkBrand",e.target.checked,index)}  className={styles['checkbox-text']} type='checkbox'  required />
          </div>
          </div>
          }

          {
          stateData[index]["selectSearchValue"].extras[0]['tubes'] &&
          <div className={`${styles['input-box']} ${styles['width-100']}`}>
          <div className={styles['checkbox-parent']}>
          <label htmlFor={`tubesCheck${index}`} className={styles['input-title']} style={{marginBottom:'0px'}}>{t('labelDutiesCalculator.tubesLabel')}</label>
            <input id={`tubesCheck${index}`} checked={stateData[index]["isCheckedTubes"]} onChange={(e) => handleChecked("checkTubes",e.target.checked,index)} className={styles['checkbox-text']} type='checkbox'  required />
          </div>
          </div>
          }
        </>
          }


          {Object.keys(stateData[index]["selectSearchValue"])?.length !== 0 && stateData[index]["selectSearchValue"].fee===0.01 &&
          <>
          <div className={`${styles['input-box']} ${styles['width-gap-28']} ${styles['pr-30']}` } >
          <div className={styles['checkbox-parent']}>
          <label htmlFor={`industrialCheck${index}`} className={styles['input-title']} style={{marginBottom:'0px'}}>{t('labelDutiesCalculator.industrialLabel')}</label>
            <input id={`industrialCheck${index}`} checked={stateData[index]["isCheckedIndustrial"]} onChange={(e) => handleChecked("checkIndustrial" , e.target.checked,index)} className={styles['checkbox-text']} type='checkbox'  />
          </div>
          </div>

          <div className={`${styles['input-box']} ${styles['width-gap-28']} ${styles['pr-15']}` } style={stateData[index]["selectSearchValue"].extras?.length <=0 ? {width:'66%'}:stateData[index]["selectSearchValue"].extras[0]['lycra']===false && stateData[index]["selectSearchValue"].extras[0]['colored_thread']===false && stateData[index]["selectSearchValue"].extras[0]['tubes']===false && stateData[index]["selectSearchValue"].extras[0]['Brand']===false  ? {width:'75%'}: {}} >
          <div className={styles['checkbox-parent']}>
          <label htmlFor={`primacyCheck${index}`} className={styles['input-title']} style={{marginBottom:'auto'}}>{t('labelDutiesCalculator.elementaryLabel')}</label>
            <input id={`primacyCheck${index}`} checked={stateData[index]["isCheckedPrimary"]} onChange={(e) => handleChecked("checkPrimary" , e.target.checked,index)} className={styles['checkbox-text']} type='checkbox'  />
          </div>
          </div>

          </>
          }


          <div onClick={(e)=>handleClick(e,index)} className={index !==0 && Object.keys(stateData[index]["selectSearchValue"])?.length === 0 ? `${styles['input-box']} ${styles['width-gap-20']}` :   Object.keys(stateData[index]["selectSearchValue"])?.length === 0 ? `${styles['input-box']} ${styles['width-orginal-20']}` :(refsData.current[index]?.hideFourthTool===false &&index===0)?`${styles['input-box']} ${styles['width-gap-20']}` :(index===0) ? `${styles['input-box']} ${styles['width-orginal-20']}` : (refsData.current[index]?.hideFourthTool===false) ? `${styles['input-box']} ${styles['width-orginal-20']}` : `${styles['input-box']} ${styles['width-gap-20']}`}>

          <div className={styles['entryarea']}>
            <span className={`${styles['input-title']}  ${ stateData[index]["focusOrigin"]  || stateData[index]["selectOrigin"] ? styles['active'] : ''}`}>{t('labelDutiesCalculator.origin')}</span>
                <Select
                  value={item["selectOrigin"]}
                  formatOptionLabel={i18n.language==="en" ? formatOptionLabel_en : formatOptionLabel}
                  placeholder=""
                  noOptionsMessage={()=>( errorCountry !==null ? <span style={{lineHeight:'25px' , color:'red'}}>{errorCountry}  <br/> <span style={{color:'black'}}>Please reload page</span></span>  :  t('labelDutiesCalculator.noOptions')) }
                  options={arrayCountries}
                  onChange={(e)=>handleSelect("selectOrigin",e,index)} // assign onChange function
                  isClearable={true}
                  styles={customStyle(errors[index]?.selectOrigin,stateData[index]["selectOrigin"],isInfoUniqe,index)}
                  isDisabled={item["isDisabledOrigin"]}
                  menuShouldScrollIntoView={false}
                  // className={ errorOrigin && styles['border-warning'] }
                  onFocus={() => handleFocus("selectOrigin",index)} // Handle focus event
                  onBlur={() => handleBlur("selectOrigin",index)}   // Handle blur event
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

          {index ===0 &&
          <div onClick={(e)=>handleClick(e,index)} className={Object.keys(stateData[index]["selectSearchValue"])?.length === 0 ? `${styles['input-box']} ${styles['width-orginal-20']}` : refsData.current[index]?.hideFourthTool===false ?`${styles['input-box']} ${styles['width-gap-20']}` :  `${styles['input-box']} ${styles['width-orginal-20']}`}>

            <div className={styles['entryarea']}>
              <span className={`${styles['input-title']}  ${focusSource || selectSource ? styles['active'] : ''}`}>{t('labelDutiesCalculator.source')}</span>
                  <Select
                    value={selectSource}
                    formatOptionLabel={i18n.language==="en" ? formatOptionLabel_en : formatOptionLabel}
                    placeholder=""
                    noOptionsMessage={()=>( errorCountry !==null ? <span style={{lineHeight:'25px' , color:'red'}}>{errorCountry}  <br/> <span style={{color:'black'}}>Please reload page</span></span>  :  t('labelDutiesCalculator.noOptions')) }
                    options={arrayCountries}
                    onChange={(e)=>handleSelect("selectSource",e,index)} // assign onChange function
                    isClearable={true}
                    styles={customStyle(selectSourceError,selectSource)}
                    isDisabled={item.isDisabledOrigin}
                    menuShouldScrollIntoView={false}
                    onFocus={() => handleFocus("selectSource",index)} // Handle focus event
                    onBlur={() => handleBlur("selectSource",index)}   // Handle blur event
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
          }

          {
          Object.keys(stateData[index]["selectSearchValue"])?.length > 0 ?
          refsData.current[index]?.hideFourthTool===false?
          <>
          <div className={`${styles['input-box']}  ${(refsData.current[index]?.hideFourthTool===false &&index===0) ? styles['width-gap-20'] : styles['width-orginal-20']} ` }>
            {/* <div className={`${styles['input-parent']}`}> */}
            <div className={styles['entryarea']}>

            <input  inputMode="decimal" onClick={(e)=>handleClick(e,index)}
            // disabled={isDisabledWeight}
            value={stateData[index]["textNumberValue"]}
            onChange={(e) => handleInputText("numberValue",e.target.value,index)}
            className={`${styles['input-text']} `}
            type='text'
            required
            style={{border:(errors[index]?.textNumberValue && stateData[index]["textNumberValue"].trim()==="") && '1px solid #f60000'}}

            />

            <div  className={styles['input-title']}>
              {refsData.current[index].unitTitle }
            </div>

            </div>

            <span className={styles['input-units']} style={stateData[index]["isDisabledWeight"]  ? {backgroundColor:'transparent'} : {}} >{refsData.current[index].unitValue}</span>

            {/* </div> */}
          </div>

        </> : null
        :null
      }

            <div className={index !==0 && Object.keys(stateData[index]["selectSearchValue"])?.length === 0 ? `${styles['input-box']} ${styles['width-gap-20']}` :   Object.keys(stateData[index]["selectSearchValue"])?.length === 0 ? `${styles['input-box']} ${styles['width-orginal-20']}` :(refsData.current[index]?.hideFourthTool===false &&index===0)?`${styles['input-box']} ${styles['width-orginal-20']}` :(index===0) ? `${styles['input-box']} ${styles['width-orginal-20']}` : (refsData.current[index]?.hideFourthTool===false) ? `${styles['input-box']} ${styles['width-orginal-20']}` : `${styles['input-box']} ${styles['width-gap-20']}`}>

            <div className={styles['entryarea']}>

            {/* <div className={`${styles['input-parent']}`}> */}
            <input inputMode="decimal" autoComplete="off" id={`weightInput${index}`} title=''  required
            value={item["textWeightValue"]}
            onChange={(e) => handleInputText("weightValue",e.target.value,index)}
            onClick={(e)=>handleClick(e,index)}
            className={`${styles['input-text']}`}
            type='text'
            disabled={Object.keys(stateData[index]["selectSearchValue"])?.length === 0 ? true : false}
            style={{border:(errors[index]?.textWeightValue && stateData[index]["textWeightValue"].trim()==="") && '1px solid #f60000'}}
            />

            <div  className={styles['input-title']}>{t('labelDutiesCalculator.weight')}</div>
            {/* </div> */}
            </div>
            <span className={styles['input-units']} style={Object.keys(stateData[index]["selectSearchValue"])?.length === 0  ? {backgroundColor:'transparent'} : {}} >{refsData.current[index].unitValue2}</span>

          </div>

          <div className={index !==0 && Object.keys(stateData[index]["selectSearchValue"])?.length === 0 ? `${styles['input-box']} ${styles['width-gap-20']}` :   Object.keys(stateData[index]["selectSearchValue"])?.length === 0 ? `${styles['input-box']} ${styles['width-orginal-20']}` :(refsData.current[index]?.hideFourthTool===false &&index===0)?`${styles['input-box']} ${styles['width-orginal-20']}` :(index===0) ? `${styles['input-box']} ${styles['width-orginal-20']}` : (refsData.current[index]?.hideFourthTool===false) ? `${styles['input-box']} ${styles['width-orginal-20']}` : `${styles['input-box']} ${styles['width-gap-20']}`}>

            {/* <div  className={`${styles['input-parent']}`}> */}
            <div className={styles['entryarea']}>

            <input
            inputMode="decimal"
            autoComplete="off"
            required
            title=''
            disabled={stateData[index]["isDisabledByGoods"]}
            value={stateData[index]["inputIndicativePrice"]}
            onChange={(e) => handleInputText("indicativeText", e.target.value,index)}
            className={styles['input-text']}
            type='text'
            style={{border:(errors[index]?.inputIndicativePrice && stateData[index]["inputIndicativePrice"].trim()==="")&& '1px solid #f60000'}}

            />

            <div  className={`${styles['input-title']} `}>
              {t('labelDutiesCalculator.priceTotalLabel')}
            </div>

            </div>
            {/* </div> */}
            <span className={styles['input-units']} style={stateData[index]["isDisabledIndicative"] ? {backgroundColor:'transparent'} : {}} > $ </span>
            {/* { isDisabledIndicative===true &&stateValueInput.valueIndicativePrice !==''  ? " سعر الواحدة لدى الجمارك :" : "قيمة الإجمالية" } */}



          </div>
          {stateData[index]["isDisabledIndicative"]===true &&stateData[index]["valueIndicativePrice"] !=='' &&
            <div className={`${refsData.current[index]?.hideFourthTool===true? styles['input-notes2'] : styles['input-notes']}`}>
          <p className={styles['notes-info1']} >
            {t('labelDutiesCalculator.noteMinimumPrice')} {stateData[index]["valueIndicativePrice"]} $
          </p>
          {
          stateData[index]["valueIndicativePrice"] !=='' &&
          stateData[index]["lessIndicativePrice"]===true &&(
          Object.keys(stateData[index]["selectSearchValue"])?.length > 0 &&
          refsData.current[index]?.hideFourthTool===false?
          stateData[index]["textNumberValue"] !== '0' && stateData[index]["textNumberValue"].trim() !=='' && stateData[index]["inputIndicativePrice"].trim() !=='' &&
          <p className={styles['notes-info2']} >
            {t('labelDutiesCalculator.depends')} {refsData.current[index].unitTitle} {t('labelDutiesCalculator.noteMustMinimun')} {stateData[index]["minimumTotalIndicative"]}$
          </p>
          :
          stateData[index]["textWeightValue"] !== '0' && stateData[index]["textWeightValue"].trim() !=='' && stateData[index]["inputIndicativePrice"].trim() !=='' &&
          <p className={styles['notes-info2']} >
          {t('labelDutiesCalculator.noteDependsonWeight')} {stateData[index]["minimumTotalIndicative"]}$
          </p>
          )
          }
          </div>
          }

          {(isInfoUniqe.currentIndex===index && isInfoUniqe.isFound)&&
                  <p style={{marginTop:'25px'}} className={styles['input-warning']}>
                     {t('labelDutiesCalculator.noteItemAndOrigin')}
                     <br/>
                    <span style={{color:'#333'}}>{t('labelDutiesCalculator.noteItemAndOrigin2')}</span>
                  </p>
          }

                </fieldset>

                </Fragment>
              )
            })}

        <div className={styles['form-plus']} style={{display: id!=="calculator"  && 'none' }}  >
          <button className={styles['form-add']} disabled={isInfoUniqe?.isFound ? true : false} >
            <PlusIcon className={styles['plus-icon']} onClick={handleAddFieldSet} style={{backgroundColor: isInfoUniqe?.isFound && '#BABABA'}} />
          </button>
        </div>

        {/* ______________________________________________________________________ */}
        <fieldset className={styles['fieldset-values']}>
          <legend className={styles['legend-values']}>{t('labelDutiesCalculator.totalValue')}</legend>

          <div style={{margin:'10px 0px 10px 0px'}} className={`${styles['input-box']} ${styles['flex-full']}`}>
            <span  className={styles['input-title']}>
            {/* {  isDisabledIndicative===true &&stateValueInput.valueIndicativePrice !=='' ? " القيمة الإجمالية بالدولار :" : " قيمة التحويل بالسوري :" } */}
            {t('labelDutiesCalculator.conversionRate')} :
            </span>

            <span className={showThreeNumber ? `${styles['input-results']}` :` ${styles['hide-math-container']}` }>

            <span className={styles['label-unit']}>
                {/* {isDisabledIndicative===true &&stateValueInput.valueIndicativePrice !=='' ? "$" : "SY"} */}
                {t('labelDutiesCalculator.priceUnitSyrian')}
            </span>
              {valueSyrianTrans.current}
            </span>
          </div>


          <div style={{margin:'10px 0px 10px 0px'}} className={`${styles['input-box']} ${styles['width-gap-40']}`}>
            <span className={styles['input-title']}>{t('labelDutiesCalculator.totalValueSyrian')} : </span>

            <span
            className={showThreeNumber ? `${styles['input-results']}` :` ${styles['hide-math-container']}` }>
            <span className={styles['label-unit']}>
            {t('labelDutiesCalculator.priceUnitSyrian')}
            </span>
              {
              // secondValueLabel costInsurance
              CalculateSumValue(stateData,'syrianTotalValue')
              }
              </span>

          </div>


          <div style={{margin:'10px 0px 10px 0px'}} className={`${styles['input-box']} ${styles['width-gap-40']}`}>
            <span className={styles['input-title']}> {t('labelDutiesCalculator.valueGoodsWithInsurance')} : </span>
            <span className={showThreeNumber ? `${styles['input-results']}` :` ${styles['hide-math-container']}` }>
            <span className={styles['label-unit']}>
            {t('labelDutiesCalculator.priceUnitSyrian')}
            </span>
              {

                // thirdValueLabel
                CalculateSumValue(stateData,'costInsurance')

              }
              </span>
          </div>

          {/* <div className={Object.keys(selectSearchValue)?.length !== 0 && selectSearchValue.fee===0.01 ? `${styles['input-box']} ${styles['width-gap-28']} ${styles['pr-0']}` : `${styles['input-box']} ${styles['width-100']} ${styles['pr-30']}` }> */}
          <div className={styles['checkbox-parent']}>

            <input id='checkConsulateId' checked={stateIsChecked.isCheckedConsulate} onChange={(e) => handleChecked("checkConsulate" , e.target.checked,-1)}   className={styles['checkbox-text']}  type='checkbox' />
            <label htmlFor='checkConsulateId'
            >{t('labelDutiesCalculator.certifiedConsulate')}</label>
          </div>

        </fieldset>


          <div className={`${styles['checkbox-parent']} ${styles['mt-30']}`}>
          <input id="checkAgreement"  checked={stateIsChecked.isCheckedAgreement} onChange={(e) => handleChecked("checkAgreement" , e.target.checked,-1)} className={styles['checkbox-text']} type='checkbox'  />
          <span  className={styles['terms-title']} onClick={showPopUpAgreement}>{t('labelDutiesCalculator.agreeTermsConditions')}</span>

          { checkAgreementError && <span className={styles['input-warning']} style={{width:'100%', padding:'0px', margin:'0px'}}>{checkAgreementError}</span>}

          </div>
          {
            toggleModalText &&
            (
            <ModalText toggleModalText={toggleModalText} setToggleModalText = {setToggleModalText}/>

            )
          }


            {/* الرسوم والضرائب */}
          <div className={styles['form-btn']}>
            <input
            className={styles['input-submit']}
            onClick={(e)=>showResultsCalculator(e)}
            style={showResults ? {background:'#ffc400'} : {}}
            type='submit'
            value={showResults ? t('labelDutiesCalculator.calculateFeesAndTaxes') : t('labelDutiesCalculator.calculateCustomsFees') }
            disabled={isInfoUniqe.isFound ? true : false}
            />
          {
          (checkAgreementError || selectSourceError===true || !errors.every(obj => Object.keys(obj).length ===  0) ) &&
          <p className={styles['results-warning']} >
            {t('labelDutiesCalculator.fillOut')}
          </p>
          }
          </div>

          {/* {stateIsChecked.isCheckedAgreement===true && (stateValueInput.inputIndicativePrice.trim() !=='' && stateValueInput.inputIndicativePrice !=='0')&& (isDisabledWeight===true || ((stateValueInput.textNumberValue.trim() !=='' && stateValueInput.textNumberValue !=='0')&& isDisabledWeight===false) || ((stateValueInput.textWeightValue.trim() !=='' && stateValueInput.textWeightValue !=='0')&& isDisabledWeight===false)) && selectOrigin !==null ?
          null
          :
          ""
        } */}
        </div>

        {
        loadingCustomCalc ?
        (
          <div className={showResults ? styles['math-container'] :` ${styles['hide-math-container']}` }>

          <SkeletonResults/>

        </div>
        )
        :
        (

          <div className={showResults ? styles['math-container'] :` ${styles['hide-math-container']}` }>
          <div className={styles['math-right']}>
          <div>
            <span className={styles['math-item-title']}>
              {/* {
              selectOrigin &&
              (selectOrigin?.label_ar==="Islamic Republic of Iran" ||selectOrigin.label_ar==="جمهورية ايران الاسلامية") ? " الرسم الجمركي حسب الإتفاقية الإيرانية:"  : " الرسم الجمركي:"
              } */}
              { t('labelDutiesCalculator.customsFees')} :
            </span>
            <span className={styles['math-item-value']}>
              {
                formatNumber(mathCeil(Number(customValues.total_customs_fee)).toString())
              }
            </span>
          </div>

          <div>
          <span className={styles['math-item-title']}>
             { t('labelDutiesCalculator.consumptionFee')} :
            </span>
            <span className={styles['math-item-value']}>
            {
            formatNumber(mathCeil(Number(customValues.total_spending_fee)).toString())
            }
            </span>
          </div>

          <div>
          <span className={styles['math-item-title']}>
              {t('labelDutiesCalculator.RsmZra')} :
            </span>
            <span className={styles['math-item-value']}>
              {
            formatNumber(mathCeil(Number(customValues.total_category_price)).toString())
              }
            </span>
          </div>

          <div>
          <span className={styles['math-item-title']}>
          {t('labelDutiesCalculator.localGovernoratefee')} :
            </span>
            <span className={styles['math-item-value']}>
            {
            formatNumber(mathCeil(Number(customValues.total_conservative_locality)).toString())
            }
            </span>
          </div>

          <div>
          <span className={styles['math-item-title']}>
          {t('labelDutiesCalculator.supportAndDevelopmentOfLocalProductionFee')} :
            </span>
            <span className={styles['math-item-value']}>
            {
            formatNumber(mathCeil(Number(customValues.total_fee_supporting_local_production)).toString())
            }
            </span>
          </div>

          <div>
          <span className={styles['math-item-title']}>
          {t('labelDutiesCalculator.rehabilitationAndProtectionOfCitiesAndFacilitiesFee')} :
            </span>
            <span className={styles['math-item-value']}>
            {
            formatNumber(mathCeil(Number(customValues.total_cities_protection_fee)).toString())
            }
            </span>
          </div>

          <div>
          <span className={styles['math-item-title']}>
          {t('labelDutiesCalculator.droughtAndNaturalDisasterFundFee')} :
            </span>
            <span className={styles['math-item-value']}>
            {
            formatNumber(mathCeil(Number(customValues.total_natural_disaster_fee)).toString())
            }
            </span>
          </div>


          <div>
          <span className={styles['math-item-title']}>
             {t('labelDutiesCalculator.advanceOnIncomeTaxFee')} :
            </span>
            <span className={styles['math-item-value']}>
            {
            formatNumber(mathCeil(Number(customValues.total_income_tax_fee)).toString())
            }
            </span>
          </div>

          <div>
          <span className={styles['math-item-title']}>
                {t('labelDutiesCalculator.RsmNoKnasolet')} :
          </span>
            <span className={styles['math-item-value']}>
              <span>
                $
              </span>
            {
            formatNumber(mathCeil(Number(customValues.total_consulate_fee)).toString())
            }
            </span>
          </div>


          {/* {selectOrigin &&
          selectOrigin.countryGroups.map((number,index) => {

            if(number ===4){
              return ( */}
          {selectSource &&
          isArabCountryGroup && includesArabCountry(selectSource.countryGroups,4)&&
          <div>
            <span className={styles['math-item-title']}>
            {t('labelDutiesCalculator.RsmTras')} :
            </span>
            <span className={styles['math-item-value']}>
            {

            formatNumber(mathCeil(Number(customValues.total_import_license_fee)).toString())

            }
            </span>
          </div>
          }

          <div>
          <span style={{fontWeight:'bold'}} className={styles['math-item-title']}>
          {t('labelDutiesCalculator.totalTaxes')} :
            </span>
            <span className={styles['math-item-final']} >
            {
            formatNumber(mathCeil(Number(customValues.total_final_fee)).toString())
            }
            </span>
          </div>
          </div>
           {/* math-right */}

          <div className={styles['math-left']}>
          <div>
          <span className={styles['math-item-title']}>
              {t('labelDutiesCalculator.stampsAndValueAddedTaxes')}
            </span>
            <span className={styles['math-item-value']}>
            {
            formatNumber(mathCeil(Number(customValues.total_added_taxes)).toString())
            }
            </span>
          </div>

          <div>
          <span className={styles['math-item-title']}>
          {t('labelDutiesCalculator.mandatoryInsuranceFee')} :
            </span>
            <span className={styles['math-item-value']}>
            {
            formatNumber(mathCeil(Number(customValues.total_insurance_fee)).toString())
            }
            </span>
          </div>
          <div>
          <span className={styles['math-item-title']}>
          {t('labelDutiesCalculator.stampFee')} :
            </span>
            <span className={styles['math-item-value']}>
            {
            formatNumber(mathCeil(Number(customValues.total_stamp_fee)).toString())
            }
            </span>
          </div>

          <div>
            <span className={styles['math-item-title']}>
            {t('labelDutiesCalculator.localGovernorateTax')} :
            </span>
            <span className={styles['math-item-value']}>
            {
            formatNumber(mathCeil(Number(customValues.total_provincial_local_tax)).toString())
            }
            </span>
          </div>

          <div>
          <span className={styles['math-item-title']}>
            {t('labelDutiesCalculator.advanceOnIncomeTax')} :
            </span>
            <span className={styles['math-item-value']}>
            {
            formatNumber(mathCeil(Number(customValues.total_advance_income_tax)).toString())
            }
            </span>
          </div>

          <div>
          <span className={styles['math-item-title']}>
          {t('labelDutiesCalculator.nationalContributionFeeForReconstruction')} :
            </span>
            <span className={styles['math-item-value']}>
            {
            formatNumber(mathCeil(Number(customValues.total_reconstruction_fee)).toString())
            }
            </span>
          </div>

          <div>
          <span className={styles['math-item-title']}>
          {t('labelDutiesCalculator.KramaNoL')} :
            </span>
            <span className={styles['math-item-value']}>
            {
            formatNumber(mathCeil(Number(customValues.total_consulate_tax)).toString())
            }
            </span>
          </div>

          {selectSource &&
          isArabCountryGroup && includesArabCountry(selectSource.countryGroups,4)&&
          <div>
            <span className={styles['math-item-title']}>
            {t('labelDutiesCalculator.BdlImport')} :
            </span>
            <span className={styles['math-item-value']}>
            {
            formatNumber(mathCeil(Number(customValues.total_Granting_import_license)).toString())
            }
            </span>
          </div>
        }


          <div className={styles.last}>

          <span style={{fontWeight:'bold'}} className={styles['math-item-title']}>
          {t('labelDutiesCalculator.totalTaxes2')} :
            </span>
            <span className={styles['math-item-final']} >
            {
            formatNumber(mathCeil(Number(customValues.total_final_taxes)).toString())
            }
            </span>
          </div>

          </div>
          {/* math-left */}

          <div className={styles.line}>
            <span className={styles['line-info']} >
            {t('labelDutiesCalculator.TotalTrabTax')} :
            </span>
            <span className={styles['line-number']} >
            {
            formatNumber(mathCeil(Number(customValues.total_final_total)).toString())
            }
            </span>
          </div>
        </div>
        )

        }
      </FormContainer>


      <div className={showResults ? styles['parent-warning'] : `${styles['hide-math-container']}`} >
        <img className={styles['warning-image']}  src={alertWarn} alt='warn icon'/>
        <p className={styles['warning-text']}>
        {t('labelDutiesCalculator.disClaimer')}
        </p>
      </div>


    </MainContainer>

    </section>

    </>
  )
}


export default CustomsCalculator
