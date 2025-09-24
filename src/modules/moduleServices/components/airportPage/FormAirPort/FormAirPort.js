import {Fragment, useEffect, useMemo, useRef, useState } from 'react';
import SelectBoxAirForm from '../../common/SelectBox/SelectBoxAirForm';
import InputWithSelectAirForm from '../../common/InputWithSelect/InputWithSelectAirForm';


import {ReactComponent as AirportIcon}  from '../../../../../assets/icons/AirportIcon.svg';
import {ReactComponent as DoorIcon}  from '../../../../../assets/icons/door-icon.svg';
import {ReactComponent as PlusIcon } from '../../../../../assets/icons/plus_icon2.svg';

import {ReactComponent as CheckIcon } from '../../../../../assets/icons/check-compare.svg';
import { useTranslation } from 'react-i18next';
import './FormAirPort.css';


import InputText from '../../common/InputText/InputText';
import InputPhone from '../../common/InputPhone/InputPhone';
import { fetchAllChapters  } from '../../../../moduleTools/store/prohibitedTab/accordion.slice';

import {fetchAirportBy ,postAirportForm} from '../../../../moduleServices/store/airportTap/airportTap.action';
import {resetAirport ,editAirport, editAirportTo, resetAirportTo} from '../../../../moduleServices/store/airportTap/airportTap.slice';

import { useDispatch, useSelector } from 'react-redux';
import { validForm, validateEmail } from '../../../../../utils/validation/validationForm';
import FormContainerService from '../../common/FormContainerService/FormContainerService';
import useLoadGoogleMaps from '../../../../../hooks/useLoadGoogleMaps';
import LabelResult from '../../common/LabelResult/LabelResult';
import { formatIntgerObly, formatNumber, mathCeil } from '../../../../../utils/math/mathUtils';
import AutoCompleteText from '../../common/AutoCompleteText/AutoCompleteText';
import { resetPortTo } from '../../../store/seaTap/seaTap.slice';
import InputDatePicker from '../../common/DatePicker/DatePicker';
import parsePhoneNumberFromString from 'libphonenumber-js';
import { formatDate } from '../../../../../utils/format/function';

let inputTimer;

const FormAirPort = ({targetRef}) => {
    const {t,i18n} = useTranslation();
    const dispatch = useDispatch();
    const {loading22,sectionChildren,error22 } =  useSelector((state) => state.accordion);

    
  const inputSearchFrom = useRef(null);
  const inputRefFrom = useRef(null);
  const dropDownRefFrom = useRef(null);
  const [queryFrom,setQueryFrom]= useState("");

  const inputSearchTo = useRef(null);
  const inputRefTo = useRef(null);
  const dropDownRefTo = useRef(null);
  const [queryTo,setQueryTo]= useState("");


  const [loaderTimer , setLoadingTimer] = useState(false);
  const [loaderTimer2 , setLoadingTimer2] = useState(false);

  const [loaderTimerWriting , setLoadingTimerWriting ] = useState(false);
  const [loaderTimerWriting2, setLoadingTimerWriting2 ] = useState(false);

  const refTypeMove = useRef(null);
  const refFromPort = useRef(null);
  const refToPort = useRef(null);
  const refWeight = useRef(null);
  const refDate = useRef(null);
  const refTypeGoods = useRef(null);
  const refDescription = useRef(null);
  const refContainer = useRef(null);
  const refName = useRef(null);
  const refPhone = useRef(null);
  const refEmail = useRef(null);
  const emailRef = useRef(null);
  const refParcelsNumber=useRef(null);
  const refParcelsLength=useRef(null);
  const refParcelsWeight=useRef(null);
  const refParcelsHeight=useRef(null);


    const {
      loadingForm,
      postForm,
      // errorForm

      AirPorts,
      loadingAirPorts,
      errorAirPort,

  
      loadingAirPortsTo,
      errorAirPortTo,
      AirPortsTo,

    } = useSelector((state) => state.moduleServices.airportFormSlice);

    const [loadingCity,setLoadingCity] = useState(false);
    const [loadingCityTo,setLoadingCityTo] = useState(false);
    
    useLoadGoogleMaps();

    const getChapters = (async ()=>{
  
      try{


      await dispatch(fetchAllChapters()).unwrap();

      }catch(err){
        return "error";
      }
  
    });

    const actualWeight = useRef("");
    const voulmatricWeight = useRef("");
    const [isActualLess , setIsActualLess] = useState(-1);

    const CalculateActualWeight = (stateData,field1,field2) => {
      const finalResult=  useMemo(() => {
        let result= stateData.reduce((sum, item) => sum + (parseFloat((item[field1])?.replace(/,/g, ''))*parseFloat((item[field2])?.replace(/,/g, ''))), 0);

        let ceilNumber = mathCeil(result)

        if(Number(actualWeight.current)===ceilNumber){
          setIsActualLess(-1)
        }else if (Number(actualWeight.current) < ceilNumber ){
          setIsActualLess(1)
        }else if(Number(actualWeight.current) > ceilNumber){
          setIsActualLess(0)
        }else{
          setIsActualLess(-1)
        }

        return formatNumber(ceilNumber.toString())
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [stateData[indexData][field1],stateData[indexData][field2]]);

      actualWeight.current=finalResult;

      

      return finalResult;
      }

    const CalculateVolumaticWeight = (stateData,field1,field2,field3,field4) => {
      const finalResult=  useMemo(() => {
        let result= stateData.reduce((sum, item) => sum + ((parseFloat((item[field1])?.replace(/,/g, '')) * parseFloat((item[field2])?.replace(/,/g, '')) * parseFloat((item[field3])?.replace(/,/g, ''))) / 5000)*parseInt((item[field4])?.replace(/,/g, '')), 0);
      
        let ceilNumber = mathCeil(result)

        if(Number(actualWeight.current)===ceilNumber){
          setIsActualLess(-1)
        }else if (Number(actualWeight.current) < ceilNumber ){
          setIsActualLess(1)
        }else if(Number(actualWeight.current) > ceilNumber){
          setIsActualLess(0)
        }else{
          setIsActualLess(-1)
        }

        return formatNumber(ceilNumber.toString())   
      
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [stateData[indexData][field1],stateData[indexData][field2],stateData[indexData][field3],stateData[indexData][field4]]);
      
      voulmatricWeight.current=finalResult;

      

      return finalResult;
      }

    const FieldsObject = {

      fieldMoveType:'typeMove',
      fieldFromPort:'selectFromPort',
      fieldToPort:'selectToPort',
      fieldName:'textPersonName',
      fieldCompany:'textCompanyName',
      fieldPhone:'textPhoneNumber',
      fieldEmail:'textPersonEmail',
      fieldTypeGoods:'selectTypeGoodsChapter',
      fieldWeightText:'textWeightValue',
      fieldWeightUnit:'selectUnit',
      fieldWeightUnitToggle:'selectUnitToggle',

      fieldNumberPackagestValue:'textNumberPackagestValue',
      fieldLengthPackagesValue:'textLengthPackagesValue',
      fieldWidthPackagesValue:'textWidthPackagesValue',
      fieldHeightPackagestValue:'textHeightPackagestValue',
      fieldDate:'selectDate',
    }

    const initialFormSea = useMemo(() => ({
      typeMove:null,
      titleLoad:t('labelServices.loadingAirport'),
      titleDisCharge:t('labelServices.dischargeAirPort'),
      placeholderLoad:t('labelServices.placeholderAirPort'),
      placeholderDischarge:t('labelServices.placeholderAirPort'),
      loadIcon:<AirportIcon/>,
      dischargeIcon:<AirportIcon/>,
      selectDate:null,

      textPersonName:"",
      textCompanyName:"",
      textPhoneNumber:"963",
      textPersonEmail:"",
      selectFromPort:null,
      selectToPort:null,

    }), [i18n.language]);

    const initialStateData=[{
      selectTypeGoodsChapter:null,
      textWeightValue:"",
      selectUnit:{value:2, label:t('labelServices.keloGram')},
      selectUnitToggle:t('labelServices.keloGram'),

      textNumberPackagestValue:"",
      textLengthPackagesValue:"",
      textWidthPackagesValue:"",
      textHeightPackagestValue:"",
    },]

    const [indexData, setIndexData] = useState(0)
    const [formMultipleCards, setFormMultipleCards] = useState(initialStateData);

    const [formSeaObject , setFormSeaObject] = useState(initialFormSea);

    const initialChaptersObject = useMemo(()=>{
      return [
        {id:1, label: t('chaptersAccordion.label1') },
        {id:2, label: t('chaptersAccordion.label2') },
        {id:3, label: t('chaptersAccordion.label3') },
        {id:4, label: t('chaptersAccordion.label4') },
        {id:5, label: t('chaptersAccordion.label5') },
        {id:6, label: t('chaptersAccordion.label6') },
        {id:7, label: t('chaptersAccordion.label7') },
        {id:8, label: t('chaptersAccordion.label8') },
        {id:9, label: t('chaptersAccordion.label9') },
        {id:10, label: t('chaptersAccordion.label10') },
        {id:11, label: t('chaptersAccordion.label11') },
        {id:12, label: t('chaptersAccordion.label12') },
        {id:13, label: t('chaptersAccordion.label13') },
        {id:14, label: t('chaptersAccordion.label14') },
        {id:15, label: t('chaptersAccordion.label15') },
        {id:16, label: t('chaptersAccordion.label16') },
        {id:17, label: t('chaptersAccordion.label17') },
        {id:18, label: t('chaptersAccordion.label18') },
        {id:19, label: t('chaptersAccordion.label19') },
        {id:20, label: t('chaptersAccordion.label20') },
        {id:21, label: t('chaptersAccordion.label21') },
        {id:22, label: t('chaptersAccordion.label22') },
        {id:23, label: t('chaptersAccordion.label23') },
        {id:24, label: t('chaptersAccordion.label24') },
        {id:25, label: t('chaptersAccordion.label25') },
        {id:26, label: t('chaptersAccordion.label26') },
        {id:27, label: t('chaptersAccordion.label27') },
        {id:28, label: t('chaptersAccordion.label28') },
        {id:29, label: t('chaptersAccordion.label29') },
        {id:30, label: t('chaptersAccordion.label30') },
        {id:31, label: t('chaptersAccordion.label31') },
        {id:32, label: t('chaptersAccordion.label32') },
        {id:33, label: t('chaptersAccordion.label33') },
        {id:34, label: t('chaptersAccordion.label34') },
        {id:35, label: t('chaptersAccordion.label35') },
        {id:36, label: t('chaptersAccordion.label36') },
        {id:37, label: t('chaptersAccordion.label37') },
        {id:38, label: t('chaptersAccordion.label38') },
        {id:39, label: t('chaptersAccordion.label39') },
        {id:40, label: t('chaptersAccordion.label40') },
        {id:41, label: t('chaptersAccordion.label41') },
        {id:42, label: t('chaptersAccordion.label42') },
        {id:43, label: t('chaptersAccordion.label43') },
        {id:44, label: t('chaptersAccordion.label44') },
        {id:45, label: t('chaptersAccordion.label45') },
        {id:46, label: t('chaptersAccordion.label46') },
        {id:47, label: t('chaptersAccordion.label47') },
        {id:48, label: t('chaptersAccordion.label48') },
        {id:49, label: t('chaptersAccordion.label49') },
        {id:50, label: t('chaptersAccordion.label50') },
        {id:51, label: t('chaptersAccordion.label51') },
        {id:52, label: t('chaptersAccordion.label52') },
        {id:53, label: t('chaptersAccordion.label53') },
        {id:54, label: t('chaptersAccordion.label54') },
        {id:55, label: t('chaptersAccordion.label55') },
        {id:56, label: t('chaptersAccordion.label56') },
        {id:57, label: t('chaptersAccordion.label57') },
        {id:58, label: t('chaptersAccordion.label58') },
        {id:59, label: t('chaptersAccordion.label59') },
        {id:60, label: t('chaptersAccordion.label60') },
        {id:61, label: t('chaptersAccordion.label61') },
        {id:62, label: t('chaptersAccordion.label62') },
        {id:63, label: t('chaptersAccordion.label63') },
        {id:64, label: t('chaptersAccordion.label64') },
        {id:65, label: t('chaptersAccordion.label65') },
        {id:66, label: t('chaptersAccordion.label66') },
        {id:67, label: t('chaptersAccordion.label67') },
        {id:68, label: t('chaptersAccordion.label68') },
        {id:69, label: t('chaptersAccordion.label69') },
        {id:70, label: t('chaptersAccordion.label70') },
        {id:71, label: t('chaptersAccordion.label71') },
        {id:72, label: t('chaptersAccordion.label72') },
        {id:73, label: t('chaptersAccordion.label73') },
        {id:74, label: t('chaptersAccordion.label74') },
        {id:75, label: t('chaptersAccordion.label75') },
        {id:76, label: t('chaptersAccordion.label76') },
        {id:77, label: t('chaptersAccordion.label77') },
        {id:78, label: t('chaptersAccordion.label78') },
        {id:79, label: t('chaptersAccordion.label79') },
        {id:80, label: t('chaptersAccordion.label80') },
        {id:81, label: t('chaptersAccordion.label81') },
        {id:82, label: t('chaptersAccordion.label82') },
        {id:83, label: t('chaptersAccordion.label83') },
        {id:84, label: t('chaptersAccordion.label84') },
        {id:85, label: t('chaptersAccordion.label85') },
        {id:86, label: t('chaptersAccordion.label86') },
        {id:87, label: t('chaptersAccordion.label87') },
        {id:88, label: t('chaptersAccordion.label88') },
        {id:89, label: t('chaptersAccordion.label89') },
        {id:90, label: t('chaptersAccordion.label90') },
        {id:91, label: t('chaptersAccordion.label91') },
        {id:92, label: t('chaptersAccordion.label92') },
        {id:93, label: t('chaptersAccordion.label93') },
        {id:94, label: t('chaptersAccordion.label94') },
        {id:95, label: t('chaptersAccordion.label95') },
        {id:96, label: t('chaptersAccordion.label96') },
        {id:97, label: t('chaptersAccordion.label97') },

        ]
      }
    ,[i18n.language]);

    const [chaptersObject,setChaptersObject]= useState(initialChaptersObject);


    useEffect(()=>{

      setFormSeaObject(initialFormSea);
      setFormMultipleCards(initialStateData)

      inputSearchFrom.current.value="";
      inputSearchTo.current.value="";

      setChaptersObject(initialChaptersObject)

  
    },[i18n.language])

    const [formErrors, setFormErrors] = useState({});
    const [errorsFormMultipleCards, setErrorsFormMultipleCards] = useState([]);


    let m = <AirportIcon style={{width:'100%', height:'100%'}}/>;
    let d = <DoorIcon style={{width:'100%', height:'100%'}}/>;

    const optionsTypeMove = [
          {id:1, from:t('labelServices.fromAirPort'), fromIcon:m , to:t('labelServices.toAirPort'),toIcon:m ,titleLoad:t('labelServices.loadingAirport') , titleDisCharge:t('labelServices.dischargeAirPort'),placeholderLoad:t('labelServices.placeholderAirPort'),placeholderDischarge:t('labelServices.placeholderAirPort')},
          {id:2, from:t('labelServices.fromDoor'), fromIcon:d, to:t('labelServices.toDoor'),toIcon:d  ,titleLoad:t('labelServices.goodsLoaded')  , titleDisCharge:t('labelServices.goodsDischarge'),placeholderLoad:t('labelServices.placeholderGoodsLand'),placeholderDischarge:t('labelServices.placeholderGoodsLand')},
          {id:3, from:t('labelServices.fromAirPort'), fromIcon:m, to:t('labelServices.toDoor'),toIcon:d  ,titleLoad:t('labelServices.loadingAirport') , titleDisCharge:t('labelServices.goodsDischarge'),placeholderLoad:t('labelServices.placeholderAirPort'),placeholderDischarge:t('labelServices.placeholderGoodsLand')},
          {id:4, from:t('labelServices.fromDoor'), fromIcon:d, to:t('labelServices.toAirPort'),toIcon:m  ,titleLoad:t('labelServices.goodsLoaded')  , titleDisCharge:t('labelServices.dischargeAirPort'),placeholderLoad:t('labelServices.placeholderGoodsLand'),placeholderDischarge:t('labelServices.placeholderAirPort')},
    ]

      const getResultsVities = (value) => {
        const input = value;
  
        if (input) {
          // Use AutocompleteService to get predictions
          const autocompleteService = new window.google.maps.places.AutocompleteService();
          setLoadingCity(true);
          autocompleteService.getPlacePredictions(
            { input, types: ['(cities)'] },
            (results, status) => {
              if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                dispatch(editAirport(results));
                setLoadingCity(false);
  
              } else {
                setLoadingCity(false);
  
                dispatch(resetAirport())
              }
            }
          );
        } else {
          dispatch(resetAirport())
          setLoadingCity(false);
          
        }
        
    };

    const getResultsVitiesTo = (value) => {
      const input = value;

      if (input) {
        // Use AutocompleteService to get predictions
        const autocompleteService = new window.google.maps.places.AutocompleteService();
        setLoadingCityTo(true);
        autocompleteService.getPlacePredictions(
          { input, types: ['(cities)'] },
          (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              dispatch(editAirportTo(results));
              setLoadingCityTo(false);

            } else {
              setLoadingCityTo(false);

              dispatch(resetAirportTo())
            }
          }
        );
      } else {
        dispatch(resetAirportTo())
        setLoadingCityTo(false);
      }
      
  };

      const handleInputText = (field,value,index=-1)=>{
  
          if (field ===FieldsObject.fieldFromPort ){
          // setQuery(value);
          if(value.length >=2){
          
          if(formSeaObject.titleLoad===t('labelServices.loadingAirport'))
          setFormSeaObject((formSeaObject)=>({...formSeaObject, [FieldsObject.fieldFromPort] : null }));
          // else{
          //   getResultsVities(value)
          // }
          }else{
            setFormSeaObject((formSeaObject)=>({...formSeaObject, [FieldsObject.fieldFromPort] : null }));
          }

          
        if (inputTimer) {
          clearTimeout(inputTimer);
        }

        setLoadingTimerWriting(true);

        if(value.trim().length < 2){// 1 or 0 
          dispatch(resetAirport());
          setQueryFrom("")
        }

        inputTimer = setTimeout(() => {
          setLoadingTimerWriting(false)
          setQueryFrom(value)
  
        }, 1300);


          } else if (field ===FieldsObject.fieldToPort){

            if(value.length >=2){
              if(formSeaObject.titleDisCharge===t('labelServices.dischargeAirPort')){
                setFormSeaObject((formSeaObject)=>({...formSeaObject, [FieldsObject.fieldToPort] : null }));

              }

            }else{
              setFormSeaObject((formSeaObject)=>({...formSeaObject, [FieldsObject.fieldToPort] : null }));
            }

            if (inputTimer) {
              clearTimeout(inputTimer);
            }
            setLoadingTimerWriting2(true);

            if(value.trim().length < 2){// 1 or 0 
              dispatch(resetAirportTo());
              setQueryTo("")
            }

            inputTimer = setTimeout(() => {
              setLoadingTimerWriting2(false)
              setQueryTo(value)
        
            }, 1300);

          }
          
          else {
            if(index ===-1 ){

              
            setFormSeaObject((formSeaObject)=>({...formSeaObject, [field] : value }));
            
            if(field===FieldsObject.fieldPhone && (formErrors?.textPhoneNumberValid ||formErrors?.textPhoneNumberValid==="valid" )){
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


            }else{

              setIndexData(index);
              let data = [...formMultipleCards];

              if(field===FieldsObject.fieldNumberPackagestValue ){

                if(formatIntgerObly(value)||value.trim()===""){
                data[index][field]=value;
                setFormMultipleCards(data);
                }
              }else{

              let formattedValue = formatNumber(value);

              data[index][field]=formattedValue;
              setFormMultipleCards(data);
              }
            }
            
          }
  
      }

      const valueSelect = (field , value,index=-1)=>{
  
          if(field===FieldsObject.fieldMoveType){
              setFormSeaObject((formSeaObject)=>({...formSeaObject, [field] : value }));
              setFormSeaObject((formSeaObject)=>({...formSeaObject, titleLoad : value.titleLoad }));
              setFormSeaObject((formSeaObject)=>({...formSeaObject, titleDisCharge : value.titleDisCharge }));
              setFormSeaObject((formSeaObject)=>({...formSeaObject, placeholderLoad : value.placeholderLoad }));
              setFormSeaObject((formSeaObject)=>({...formSeaObject, placeholderDischarge : value.placeholderDischarge }));
              setFormSeaObject((formSeaObject)=>({...formSeaObject, loadIcon : value.fromIcon }));
              setFormSeaObject((formSeaObject)=>({...formSeaObject, dischargeIcon : value.toIcon }));
              setFormSeaObject((formSeaObject)=>({...formSeaObject, selectFromPort : null }));
              setFormSeaObject((formSeaObject)=>({...formSeaObject, selectToPort : null }));
              
              // reset searchRef
              inputSearchFrom.current.value="";
              inputSearchTo.current.value="";

          }else {
            if(index ===-1){

            setFormSeaObject((formSeaObject)=>({...formSeaObject, [field] : value }));
            
            if (field ===FieldsObject.fieldFromPort ){
              let inputShow ="";
              if(value?.name){
                inputShow = `${value?.name}`
              }else{
                if(value?.description){
                  inputShow = `${value?.description} `
                }else{
                inputShow = `${value?.origin?.label || value?.origin?.label_ar} `
                }
              }
            //value?.origin?.label || value?.name
            inputSearchFrom.current.value=inputShow;
      
            //first click 
            if(value && value?.origin && value?.origin?.airports){
              dispatch(resetAirport()); //حاليا علقتها 
              // setPortsFromArray([]);
      
              setLoadingTimer(true);
      
              setTimeout(() => {
                const newOptions = value.origin.airports.map(port => ({ port_country:value.origin?.label||value.origin?.label_ar, port_flag:value.origin.ImageURL,  name: port.name , airport_code: port.airport_code }));
                // setArrayCountry(newOptions);
                dispatch(editAirport(newOptions));
      
      
                setLoadingTimer(false)
          
          
            }, 600);
      
            }else if ((value?.name && value?.airport_code)||(value?.description)){
      
              dispatch(resetAirport());
              setQueryFrom("");
              
            }
      
      
            }
            else if (field ===FieldsObject.fieldToPort ){
      
              let inputShow ="";
              if(value?.name){
                inputShow = `${value?.name}`
              }else{
                if(value?.description){
                  inputShow = `${value?.description} `
                }else{
                inputShow = `${value?.origin?.label || value?.origin?.label_ar} `
                }
              }
      
              inputSearchTo.current.value=inputShow;
            
              if(value && value?.origin && value?.origin?.airports){
                dispatch(resetAirportTo()); //حاليا علقتها 
                // setPortsToArray([]);
      
                setLoadingTimer2(true);
      
                setTimeout(() => {
                  const newOptions = value.origin.airports.map(port => ({ port_country:value.origin?.label||value.origin?.label_ar, port_flag:value.origin.ImageURL,  name: port.name , airport_code: port.airport_code }));
                  // setArrayCountry(newOptions);
                  dispatch(editAirportTo(newOptions));
      
                  setLoadingTimer2(false)
            
            
              }, 600);
      
            }else if ((value?.name && value?.airport_code)||(value?.description)){
      
                dispatch(resetAirportTo());
                setQueryTo("");
      
              }
      
            
            }
          
          }else {
              setIndexData(index);
              let data = [...formMultipleCards];
              data[index][field]=value;
              setFormMultipleCards(data);
            }
          }
        
      }

      const handleClick = (e,index=-1)=>{
      e.preventDefault();
      try{
      e.target.select();
      }
      catch(e){
      
      }
      }

      const optionsUnit = useMemo(() => ([
        { value: '1', label: t('labelServices.ton') },
        { value: '2', label: t('labelServices.keloGram')  }
    ]),[i18n.language]);


      const handleSelectUnit =(e,index=-1)=>{
  
        setIndexData(index);
          // setFormSeaObject((formSeaObject)=>({...formSeaObject, selectUnit : e }));
          let data = [...formMultipleCards];
          data[index]['selectUnit']=e ;
          setFormMultipleCards(data);
          
      }

      const handleCheckToggle=(value,valueCheck,index=-1)=>{

        setIndexData(index);
        // setFormSeaObject((formSeaObject)=>({...formSeaObject, selectUnit : e }));
        let data = [...formMultipleCards];
        data[index]['selectUnitToggle']=value ;
        data[index]['valueCheck']=valueCheck ;

        setFormMultipleCards(data);


        // setFormSeaObject((formSeaObject)=>({...formSeaObject, selectUnitToggle : value , valueCheck:valueCheck }));
      }

      const ValidationForm = ()=>{
        const arrayErrors = formMultipleCards.map((item,index) => {
          const fieldErrors = {};
    
    
          if (item.textWeightValue === '') {
            fieldErrors.textWeightValue = 'Value is required';
          }

          if (item.textNumberPackagestValue === '') {
            fieldErrors.textNumberPackagestValue = 'Value is required';
          }

          if (item.textLengthPackagesValue === '') {
            fieldErrors.textLengthPackagesValue = 'Value is required';
          }

          if (item.textWidthPackagesValue === '') {
            fieldErrors.textWidthPackagesValue = 'Value is required';
          }

          if (item.textHeightPackagestValue === '') {
            fieldErrors.textHeightPackagestValue = 'Value is required';
          }
    
          if (item.selectUnit === null) {
            fieldErrors.selectUnit = 'Value is required';
          }

          if (item.selectTypeGoodsChapter === null) {
            fieldErrors.selectTypeGoodsChapter = 'Value is required';
          }
          // Add conditions for other fields as needed
    
          return fieldErrors;
        });
    
        // Update errors state
        setErrorsFormMultipleCards(arrayErrors);
    
           // Example array of objects
          const arrayOfObjects = arrayErrors;
    
          // Function to check if an object is empty
          const isEmptyObject = (obj) => Object.keys(obj).length === 0 && obj.constructor === Object;
    
          // Check if all objects in the array are empty
          const isAllObjectsEmpty = arrayOfObjects.every(isEmptyObject);
    
        if(isAllObjectsEmpty===false ){
          
          return true
    
        }else{
          return false
        }
      }

      const handleSubmit = (e) => {
        
          e.preventDefault();


          const validFormObject = validForm(formSeaObject,"airport");
          const validMultipleForm=ValidationForm();
  
          setFormErrors(validFormObject);

          if (Object.keys(validFormObject).length > 0) {
            const priorityOrder = [
              { key: "typeMove", ref: refTypeMove },
              { key: "selectFromPort", ref: refFromPort },
              { key: "selectToPort", ref: refToPort },
              { key: "textWeightValue", ref: refWeight },
              { key: "selectDate", ref: refDate },
              { key: "selectTypeGoods", ref: refTypeGoods },
              { key: "textDescriptionGoods", ref: refDescription },
              { key: "counter", ref: refContainer },
              { key: "textPersonName", ref: refName },
              { key: "textPhoneNumber", ref: refPhone },
              { key: "textPhoneNumberValid", ref: refPhone },
              { key: "textPersonEmailValid", ref: refParcelsNumber },
              { key: "textPersonEmailValid", ref: refParcelsLength },
              { key: "textPersonEmailValid", ref: refParcelsWeight },
              { key: "textPersonEmailValid", ref: refParcelsHeight },
              

            ];
            for (let item of priorityOrder) {
              if (validFormObject[item.key] && item.ref?.current) {
                item.ref.current.scrollIntoView?.({ behavior: "smooth", block: "center" });
            
                // Handle both DatePicker (setFocus) and native inputs (focus)
                if (typeof item.ref.current.setFocus === 'function') {
                  refDate.current.scrollIntoView?.({ behavior: "smooth", block: "center" });
                  refDate.current.setFocus?.(); // specific for DatePicker              
                } else if (typeof item.ref.current.focus === 'function') {
                  item.ref.current.focus(); // normal input
                }
            
                break;
              }
            }
            
        
            return;
          }
    
        

          const good_air = formMultipleCards.map((item, index) => {

            let OneObject = {
              goods_type: `${item.selectTypeGoodsChapter.label}`,
              goods_weight: `${item.textWeightValue} ${item.selectUnitToggle}`,
              number_package: `${item.textNumberPackagestValue}`,
              Package_width: `${item.textWidthPackagesValue} ${t('labelServices.placeholderUnitPackages')}`,
              Package_height: `${item.textHeightPackagestValue} ${t('labelServices.placeholderUnitPackages')}`,
              Package_length: `${item.textLengthPackagesValue} ${t('labelServices.placeholderUnitPackages')}`
            }
        
            return OneObject;
        });

  
          let postParamObject = {
            movement_type:formSeaObject.typeMove.from +" "+ formSeaObject.typeMove.to ,
            sender_name:formSeaObject.textPersonName,
            company_name:formSeaObject.textCompanyName,
            actual_weight:actualWeight.current,
            volumetric_weight:voulmatricWeight.current,
            phone_number:formSeaObject.textPhoneNumber,
            loading_address:formSeaObject.titleLoad===t('labelServices.loadingAirport') ?  formSeaObject.selectFromPort?.name : `${formSeaObject.selectFromPort?.description}`,
            discharge_address:formSeaObject.titleDisCharge===t('labelServices.dischargeAirPort') ? formSeaObject.selectToPort?.name :`${formSeaObject.selectToPort?.description}`,

            // loading_address:formSeaObject.titleLoad===t('labelServices.loadingAirport') ?`${(formSeaObject.selectFromPort?.origin?.label_ar || formSeaObject.selectFromPort?.origin?.label)  ? (formSeaObject.selectFromPort?.origin?.label_ar||formSeaObject.selectFromPort?.origin?.label) : formSeaObject.selectFromPort?.port_country} , ${formSeaObject.selectFromPort?.airport_code} , ${formSeaObject.selectFromPort?.name}` : `${formSeaObject.selectFromPort?.description}`,
            // discharge_address:formSeaObject.titleDisCharge===t('labelServices.dischargeAirPort') ? `${(formSeaObject.selectToPort?.origin?.label_ar || formSeaObject.selectToPort?.origin?.label)  ? (formSeaObject.selectToPort?.origin?.label_ar || formSeaObject.selectToPort?.origin?.label) : formSeaObject.selectToPort?.port_country}  , ${formSeaObject.selectToPort?.airport_code} , ${formSeaObject.selectToPort?.name}` :`${formSeaObject.selectToPort?.description}`,
            email:formSeaObject.textPersonEmail,
            good_air: good_air,
            shipment_date:formatDate(formSeaObject.selectDate),
          }

          dispatch(postAirportForm(postParamObject));
          };

          useEffect(()=>{
            if(Object.keys(postForm).length>0){

              setFormSeaObject(initialFormSea);
              setFormMultipleCards(initialStateData)

              // reset searchRef
              inputSearchFrom.current.value="";
              inputSearchTo.current.value="";

            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
          },[postForm,initialFormSea])

          useEffect(()=>{


        
            if(queryFrom.length>=2){
              if(formSeaObject.titleLoad===t('labelServices.loadingAirport')){
                dispatch(fetchAirportBy({ query: queryFrom, queryType: 'from' }))
              }else{
                getResultsVities(queryFrom)
              }
        
            }
        
            else if(queryTo.length >=2){
              if(formSeaObject.titleDisCharge===t('labelServices.dischargeAirPort')){
                dispatch(fetchAirportBy({ query: queryTo, queryType: 'to' }))
              }else{
                getResultsVitiesTo(queryTo)
              }
            }
            // else if(queryTo.trim().length < 2){
              // setPortsToArray([]);
            //   dispatch(resetPorts())
            // }
        
          },[dispatch,queryFrom,queryTo,loaderTimerWriting,loaderTimerWriting2])
      
          
    const handleAddFieldSet = (e)=>{

      e.preventDefault();


      let newStateObject = {
        selectTypeGoodsChapter:null,
        textWeightValue:"",
        selectUnit:{value:2, label:t('labelServices.keloGram')},
        textNumberPackagestValue:"",
        textLengthPackagesValue:"",
        textWidthPackagesValue:"",
        textHeightPackagestValue:"",
      }

      setFormMultipleCards([...formMultipleCards,newStateObject]);

    }

    const styleTextArea={
      height:'80px',
    }

    
    return (
    <div className='airport-form-container' ref={targetRef}>
    
    <FormContainerService zIndex={1}>

            <div className='form-item width-100'>
            <SelectBoxAirForm 
            placeholder={t('labelServices.placeholderMovementType')}
            options={optionsTypeMove} 
            isSearch={false} 
            value={formSeaObject.typeMove} 
            field={FieldsObject.fieldMoveType} 
            valueSelect={valueSelect}
            isLoading={false}
            errorValue={formErrors?.typeMove}
            // Icon={<ContainerMove/>}
            title={t('labelServices.movementType')}
            setFormSeaObject={setFormSeaObject}
            ref={refTypeMove}
            />
            </div>

            <div className='card-tools'>
            <div className='card-input'>

        <AutoCompleteText
        placeholder={formSeaObject.placeholderLoad} 
        Icon={formSeaObject.loadIcon}
        field={FieldsObject.fieldFromPort} 
        options={AirPorts}
        valueSelect={valueSelect}
        value={formSeaObject.selectFromPort  }
        titleInput={formSeaObject.titleLoad}
        handleInputText={handleInputText}
        resetPorts={resetAirport}
        isLoading={loadingAirPorts }// with quey will kmow to display
        loadingTimerSelected={loaderTimer}
        loadingWriting={loaderTimerWriting}
        errorValue={formErrors?.selectToPort}
        errorApi={errorAirPort}// with quey will kmow to display
        // refInput= {inputRefFrom}
        refSearch={inputSearchFrom}
        refDropDown={dropDownRefFrom}
        query={queryFrom}
        handleClickColor={handleClick}
        loadingCity={loadingCity}
        refInput={refFromPort}

        />
          
            </div>

            <div className='card-input'>
            <AutoCompleteText
        titleInput={formSeaObject.titleDisCharge}
        Icon={formSeaObject.dischargeIcon}
        placeholder={formSeaObject.placeholderDischarge} 
        field={FieldsObject.fieldToPort} 
        value={formSeaObject.selectToPort }
        options={AirPortsTo}
        valueSelect={valueSelect}
        
        handleInputText={handleInputText}
        resetPorts={resetAirportTo}
        isLoading={loadingAirPortsTo}// with quey will kmow to display
        loadingTimerSelected={loaderTimer2}
        loadingWriting={loaderTimerWriting2}

        errorValue={formErrors?.selectToPort}
        errorApi={errorAirPortTo} // with quey will kmow to display
        refInput= {refToPort} 
        refSearch={inputSearchTo}
        refDropDown={dropDownRefTo}
        query={queryTo}
        handleClickColor={handleClick}
        loadingCity={loadingCityTo}
        /> 

            </div>
            </div>
    
    </FormContainerService>
    

    {formMultipleCards.map((item,index) =>{
              return(
                <Fragment key={index}>
                <FormContainerService>

                <div className='form-item width-100'>
                        <SelectBoxAirForm 
                        placeholder={t('labelServices.placeholderselectGoodsType')}
                        title={t('labelServices.goodsType')}
                        options={chaptersObject} 
                        isSearch={true} 
                        value={item.selectTypeGoodsChapter}
                        field={FieldsObject.fieldTypeGoods} 
                        valueSelect={valueSelect}
                        index={index}
                        isLoading={false}
                        getSections={getChapters}
                        cursor={"text"}
                        errorValue={errorsFormMultipleCards[index]?.selectTypeGoodsChapter}
                        typyForm={"Sea"}
                        ref={refTypeGoods}

                        />
                        {error22 && //index current with index that keep it 
                          <span className='input-warning'>
                          {error22} 
                        </span>
                        }
                </div>
            
                <div className='card-tools'>
                    {
                      index===0 &&
                    <div className={index===0 ? 'card-input--3' : 'card-input'}>
                          <InputDatePicker 
                          field={FieldsObject.fieldDate} 
                          selectDate={formSeaObject.selectDate} 
                          valueSelect={valueSelect} 
                          placeholder={t('labelServices.placeholderSelectDate')}
                          title={t('labelServices.actualTimeOfArrival')}
                          errorValue={formErrors?.selectDate}
                          ref={refDate}
                          />
                    </div>
                    }
            
                    <div className={index===0 ? 'card-input--3' : 'card-input'}>
            
                          <InputWithSelectAirForm 
                          textWeightValue={item.textWeightValue} 
                          selectUnit={item.selectUnit}  
                          optionsArray={optionsUnit}
                          getInputText={handleInputText}
                          getinputSelect={handleSelectUnit}

                          getCheckToggle={handleCheckToggle}
                          valueCheck={item.valueCheck}

                          field={FieldsObject.fieldWeightText}
                          fieldUnit={FieldsObject.fieldWeightUnit}
                          title={t('labelServices.totalGoodsWeight')}
                          placeholder={t('labelServices.placeholderEnterTotalGoodsWeight')}
                          errorValue={errorsFormMultipleCards[index]?.textWeightValue}
                          errorUnit={errorsFormMultipleCards[index]?.selectUnit}
                          // Icon={<WeightIcon/>}
                          index={index}
                          ref={refWeight}

                        /> 

                        </div>
            
                        <div className={index===0 ? 'card-input--3' : 'card-input'}>
            
                          <InputWithSelectAirForm 
                          textWeightValue={item.textNumberPackagestValue} 
                          getInputText={handleInputText}
                          field={FieldsObject.fieldNumberPackagestValue} 
                          title={t('labelServices.packagesNumber')}
                          placeholder={t('labelServices.placeholderEnterPackagesNumber')}
                          errorValue={errorsFormMultipleCards[index]?.textNumberPackagestValue}
                          // Icon={<WeightIcon/>}
                          hideSelect={true}
                          index={index}
                        /> 
            
                        </div>
                </div>

                <div className='card-tools'>
            
                <div className='card-input--3'>
                <InputWithSelectAirForm 
                          textWeightValue={item.textLengthPackagesValue} 
                          getInputText={handleInputText}
                          field={FieldsObject.fieldLengthPackagesValue} 
                          title={t('labelServices.packagesLength')}
                          placeholder={t('labelServices.placeholderEnterPackagesLength')}
                          errorValue={errorsFormMultipleCards[index]?.textLengthPackagesValue}
                          // Icon={<WeightIcon/>}
                          showunitText={true}
                          index={index}
                        /> 
                </div>
            
                <div className='card-input--3'>
                <InputWithSelectAirForm 
                          textWeightValue={item.textWidthPackagesValue} 
                          getInputText={handleInputText}
                          field={FieldsObject.fieldWidthPackagesValue} 
                          title={t('labelServices.packagesWidth')}
                          placeholder={t('labelServices.placeholderEnterPackagesWidth')}
                          errorValue={errorsFormMultipleCards[index]?.textWidthPackagesValue}
                          // Icon={<WeightIcon/>}
                          showunitText={true}
                          index={index}
            
                        /> 
                </div>
            
                <div className='card-input--3'>
                <InputWithSelectAirForm 
                          textWeightValue={item.textHeightPackagestValue} 
                          getInputText={handleInputText}
                          field={FieldsObject.fieldHeightPackagestValue} 
                          title={t('labelServices.packagesHeight')}
                          placeholder={t('labelServices.placeholderEnterPackagesHeight')}
                          errorValue={errorsFormMultipleCards[index]?.textHeightPackagestValue}
                          // Icon={<WeightIcon/>}
                          showunitText={true}
                          index={index}
                        /> 
                </div>
            
                </div>
            
                {formMultipleCards.length -1 ===index &&
                  <div className={'form-plus'}  >
                      <button className={'form-add'}  >
                        <PlusIcon className={'plus-icon'} onClick={handleAddFieldSet}  />
                      </button>
                  </div>
                }
            
                </FormContainerService>
                </Fragment>
    )})}


    <FormContainerService>
        <div className='card-tools'>

        <div className='card-input' >
        
        <LabelResult
        title={t('labelServices.actualWeight')}
        unit={"Kg"}
        result={CalculateActualWeight(formMultipleCards,FieldsObject.fieldWeightText,FieldsObject.fieldNumberPackagestValue)}
        iconCompare={isActualLess !==-1 ? isActualLess===0 && <CheckIcon/> : null}
        />

        </div>

        <div className='card-input' >

            <LabelResult
            title={t('labelServices.volumetricWeight')}
            unit={"Kg"}
            result={CalculateVolumaticWeight(formMultipleCards,FieldsObject.fieldLengthPackagesValue,FieldsObject.fieldWidthPackagesValue,FieldsObject.fieldHeightPackagestValue,FieldsObject.fieldNumberPackagestValue)}
            iconCompare={isActualLess !==-1 ? isActualLess===1 &&<CheckIcon/> : null}

            />

        </div>

        </div>
        {isActualLess !==-1 &&
        <p className='card-tools--text'>
            { isActualLess===0 ? t('labelServices.textActualWeight') : t('labelServices.textVolumWeight')  }
        </p>
        }
    </FormContainerService>

    <FormContainerService>

            <div className='container-profile'>
            <div className='card-profile'>

              <div>
              <InputText 
              getInputText={handleInputText}
              // Icon={<UserProfile/>} 
              title={t('labelServices.name')}
              placeholder={t('labelServices.placeholderName')}
              field={FieldsObject.fieldName}
              value={formSeaObject.textPersonName}
              handleClick={handleClick}
              errorValue={formErrors?.textPersonName}
              ref={refName}
              />
              
              </div>

              <div>
              <InputText 
              getInputText={handleInputText} 
              // Icon={<CompanyProfile/>} 
              placeholder={t('labelServices.placeholderCompany')}
              title={t('labelServices.company')}
              field={FieldsObject.fieldCompany}
              value={formSeaObject.textCompanyName}
              handleClick={handleClick}

              />
              </div>

              <div className='input-box2'>
              {/* <InputText Icon={<PhoneProfile/>} placeholder="رقم الهاتف"/> */}
              <InputPhone 
              getInputText={handleInputText}
              title={t('labelServices.numberPhone')}
              placeholder={t('labelServices.placeholderNumberPhone')}
              // Icon={<PhoneProfile/>}
              field={FieldsObject.fieldPhone}
              value={formSeaObject.textPhoneNumber}
              handleClick={handleClick}
              errorValue={formErrors?.textPhoneNumber || formErrors?.textPhoneNumberValid}
              seto={setFormSeaObject}
              valid={parsePhoneNumberFromString("+" + formSeaObject.textPhoneNumber)?.isValid() || false}

              />
              { (formErrors?.textPhoneNumberValid && formErrors?.textPhoneNumberValid !=="valid") &&
                <span className='input-warning'>
                {t('labelServices.InvalidPhone')} 
              </span>
              }
              </div>

              <div className='mailAirPortForm'>
              <InputText 
              getInputText={handleInputText} 
              // Icon={<MailProfile/>} 
              title={t('labelServices.email')}
              placeholder={t('labelServices.placeholderEmail')}
              field={FieldsObject.fieldEmail}
              value={formSeaObject.textPersonEmail}
              handleClick={handleClick}
              errorValue={formErrors?.textPersonEmailValid}
              valid={validateEmail(formSeaObject.textPersonEmail)} // Set valid based on email validation
              ref={emailRef}
              />

              { (formErrors?.textPersonEmailValid && formErrors?.textPersonEmailValid !=="valid") && 
                <span className='input-warning'>
                {t('labelServices.InvalidEmail')} 
                </span>
              }
              </div>

            </div>
            </div>
    
    </FormContainerService>

        <div className='form-btn'>
            <button disabled={loadingForm} onClick={handleSubmit} className="input-submit">
            {loadingForm ? "" : t('actions.buttonRequest')} 
            <span className={`${loadingForm && 'btn-ring'}`}></span>
          </button>

        </div>
          {
            Object.keys(formErrors).length > 0 &&
            <div className='error-note'>
            {t('labelServices.warningLabel')} 
            </div>
          }
    </div>

    
    )
}

export default FormAirPort
