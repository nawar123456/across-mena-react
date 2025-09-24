import { useEffect, useMemo, useRef, useState } from 'react';
import SelectBoxFormSea from '../../common/SelectBox/SelectBoxFormSea';
import InputWithSelect from '../../common/InputWithSelect/InputWithSelect';


import {ReactComponent as ContainerTypeIcon}  from '../../../../../assets/icons/container.svg';
import {ReactComponent as MenaIcon}  from '../../../../../assets/icons/mena_mersat.svg';
import {ReactComponent as DoorIcon}  from '../../../../../assets/icons/door-icon.svg';


import './FormSea.css';
import InputDatePicker from '../../common/DatePicker/DatePicker';
import { TfiEmail } from "react-icons/tfi";
import InputMail from '../../common/InputText/InputMail';
import InputText from '../../common/InputText/InputText';
import InputTextDesc from '../../common/InputText/InputTextDesc';
import InputPhone from '../../common/InputPhone/InputPhone';
import InputAccordion from '../../common/InputAccordion/InputAccordion';
import { fetchSections  } from '../../../../moduleTools/store/prohibitedTab/accordion.slice';
import {fetchPortBy, postSeaForm } from '../../../../moduleServices/store/seaTap/seaTap.action';
import {resetPorts ,editPorts, editPortsTo, resetPortTo} from '../../../../moduleServices/store/seaTap/seaTap.slice';

import { useDispatch, useSelector } from 'react-redux';
import { validForm, validateEmail } from '../../../../../utils/validation/validationForm';
import FormContainerService from '../../common/FormContainerService/FormContainerService';
import { formatDate } from '../../../../../utils/format/function';
import { containersArray } from '../../functions';
import useLoadGoogleMaps from '../../../../../hooks/useLoadGoogleMaps';
import { useTranslation } from 'react-i18next';
import AutoCompleteText from '../../common/AutoCompleteText/AutoCompleteText';
import parsePhoneNumberFromString from 'libphonenumber-js';
import { formatNumber } from '../../../../../utils/math/mathUtils';

let inputTimer;
const FormSea = ({targetRef}) => {
const [isSubmitted, setIsSubmitted] = useState(false);

  const dispatch = useDispatch();
  const {loading,sections,error } =  useSelector((state) => state.accordion);

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

  // Refs for validation focus
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



  const {
    loadingForm,
    postForm,

    Ports,
    loadingPorts,
    errorPort,

    PortsTo,
    loadingPortsTo,
    errorPortTo,
  } = useSelector((state) => state.moduleServices.seaFormSlice);


  const [loadingCity,setLoadingCity] = useState(false);
  const [loadingCityTo,setLoadingCityTo] = useState(false);

  useLoadGoogleMaps();
  const { t, i18n } = useTranslation();



  const getSections = (async ()=>{

    try{

    await dispatch(fetchSections()).unwrap();

    }catch(err){
      return "error";
    }

  });


  const FieldsObject = {

    fieldMoveType:'typeMove',
    fieldFromPort:'selectFromPort',
    fieldToPort:'selectToPort',
    fieldWeightText:'textWeightValue',
    fieldWeightUnit:'selectUnit',
    fieldWeightUnitToggle:'selectUnitToggle',

    fieldDate:'selectDate',
    fieldTypeGoods:'selectTypeGoods',
    fieldDescription:'textDescriptionGoods',
    fieldName:'textPersonName',
    fieldCompany:'textCompanyName',
    fieldPhone:'textPhoneNumber',
    fieldEmail:'textPersonEmail',
  }

  const initialFormSea = useMemo(() => ({
    typeMove:null,
    titleLoad:t('labelServices.loadingPort'),
    titleDisCharge:t('labelServices.dischargePort'),
    placeholderLoad:t('labelServices.placeholderPort'),
    placeholderDischarge:t('labelServices.placeholderPort'),
    textPhoneNumber:"963",
    loadIcon:<MenaIcon/>,
    dischargeIcon:<MenaIcon/>,
    textWeightValue:"",
    selectUnit:{value:2, label:t('labelServices.keloGram')},
    selectUnitToggle:t('labelServices.keloGram'),
    valueCheck:false,
    selectDate:null,
    counter:// by index will know whitch object should change 
    [{img:<ContainerTypeIcon/>,title:`${t('labelServices.container1')}`, details:`${t('labelServices.maximumContainerLoad')} ${'28.280'} ${t('labelServices.ton')}`, valueCount:0},
    {img:<ContainerTypeIcon/>,title:`${t('labelServices.container2')}`, details:`${t('labelServices.maximumContainerLoad')} ${'26.740'} ${t('labelServices.ton')}`, valueCount:0},
    {img:<ContainerTypeIcon/>,title:`${t('labelServices.container3')}`, details:`${t('labelServices.maximumContainerLoad')} ${'29.480'} ${t('labelServices.ton')}`, valueCount:0},
    {img:<ContainerTypeIcon/>,title:`${t('labelServices.container4')}`, details:`${t('labelServices.maximumContainerLoad')} ${'26.650 /28.670'} ${t('labelServices.ton')}`, valueCount:0},
    ],
    textPersonName:"",
    textCompanyName:"",
    textPhoneNumber:"963",
    textPersonEmail:"",
    selectTypeGoods:null,
    textDescriptionGoods:"",
    selectFromPort:null,
    selectToPort:null,
  }), [i18n.language]);

  const initialSectionsObject = useMemo(()=>{
    return [
      {id:1, label: t('sectionsAccordion.label1') },
      {id:2, label: t('sectionsAccordion.label2') },
      {id:3, label: t('sectionsAccordion.label3') },
      {id:4, label: t('sectionsAccordion.label4') },
      {id:5, label: t('sectionsAccordion.label5') },
      {id:6, label: t('sectionsAccordion.label6') },
      {id:7, label: t('sectionsAccordion.label7') },
      {id:8, label: t('sectionsAccordion.label8') },
      {id:9, label: t('sectionsAccordion.label9') },
      {id:10, label: t('sectionsAccordion.label10') },
      {id:11, label: t('sectionsAccordion.label11') },
      {id:12, label: t('sectionsAccordion.label12') },
      {id:13, label: t('sectionsAccordion.label13') },
      {id:14, label: t('sectionsAccordion.label14') },
      {id:15, label: t('sectionsAccordion.label15') },
      {id:16, label: t('sectionsAccordion.label16') },
      {id:17, label: t('sectionsAccordion.label17') },
      {id:18, label: t('sectionsAccordion.label18') },
      {id:19, label: "delete" },
      {id:20, label: t('sectionsAccordion.label20')},
      {id:21, label: "delete" },
      ]
    }
  ,[i18n.language]);

  const [sectionsObject,setSetcionsObject]= useState(initialSectionsObject);

  const optionsUnit = useMemo(() => ([
    { value: '1', label: t('labelServices.ton') },
    { value: '2', label: t('labelServices.keloGram')  }
]),[i18n.language]);

  const [formSeaObject , setFormSeaObject] = useState(initialFormSea);

  const styleTextArea={
    height:'80px',
  }

  useEffect(()=>{

    setFormSeaObject(initialFormSea);
    inputSearchFrom.current.value="";
    inputSearchTo.current.value="";

    setSetcionsObject(initialSectionsObject)


  },[i18n.language])



  const [formErrors, setFormErrors] = useState({});

  let m = <MenaIcon style={{width:'100%', height:'100%'}}/>;
  let d = <DoorIcon style={{width:'100%', height:'100%'}}/>;


  const optionsTypeMove = [
        {id:1, from:t('labelServices.fromPort'), fromIcon:m , to:t('labelServices.toPort'),toIcon:m ,titleLoad:t('labelServices.loadingPort') , titleDisCharge:t('labelServices.dischargePort'),placeholderLoad:t('labelServices.placeholderPort'),placeholderDischarge:t('labelServices.placeholderPort')},
        {id:2, from:t('labelServices.fromDoor'), fromIcon:d, to:t('labelServices.toDoor'),toIcon:d  ,titleLoad:t('labelServices.goodsLoaded') , titleDisCharge:t('labelServices.goodsDischarge'),placeholderLoad:t('labelServices.placeholderGoodsLand'),placeholderDischarge:t('labelServices.placeholderGoodsLand')},
        {id:3, from:t('labelServices.fromPort'), fromIcon:m, to:t('labelServices.toDoor'),toIcon:d  ,titleLoad:t('labelServices.loadingPort') , titleDisCharge:t('labelServices.goodsDischarge'),placeholderLoad:t('labelServices.placeholderPort'),placeholderDischarge:t('labelServices.placeholderGoodsLand')},
        {id:4, from:t('labelServices.fromDoor'), fromIcon:d, to:t('labelServices.toPort'),toIcon:m  ,titleLoad:t('labelServices.goodsLoaded') , titleDisCharge:t('labelServices.dischargePort'),placeholderLoad:t('labelServices.placeholderGoodsLand'),placeholderDischarge:t('labelServices.placeholderPort')},
    ];


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
              dispatch(editPorts(results));
              setLoadingCity(false);

            } else {
              setLoadingCity(false);

              dispatch(resetPorts())
            }
          }
        );
      } else {
        dispatch(resetPorts())
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
            dispatch(editPortsTo(results));
            setLoadingCityTo(false);

          } else {
            setLoadingCityTo(false);

            dispatch(resetPortTo())
          }
        }
      );
    } else {
      dispatch(resetPortTo())
      setLoadingCityTo(false);

    }
    
};


    const handleInputText = (field,value)=>{
      if (field ===FieldsObject.fieldFromPort ){
      if(value.length >=2){

        if(formSeaObject.titleLoad===t('labelServices.loadingPort') ){

          setFormSeaObject((formSeaObject)=>({...formSeaObject, [FieldsObject.fieldFromPort] : null }));
      }



      }else{

        setFormSeaObject((formSeaObject)=>({...formSeaObject, [FieldsObject.fieldFromPort] : null }));
        }

        if (inputTimer) {
          clearTimeout(inputTimer);
        }

        setLoadingTimerWriting(true);

        if(value.trim().length < 2){// 1 or 0 
          dispatch(resetPorts());
          setQueryFrom("")
        }


      inputTimer = setTimeout(() => {
        setLoadingTimerWriting(false)
        setQueryFrom(value)

      }, 1300);
      
      }

      else if(field===FieldsObject.fieldToPort){

        if(value.length >=2){
        if(formSeaObject.titleDisCharge===t('labelServices.dischargePort')){

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
        dispatch(resetPortTo());
        setQueryTo("")
      }


    inputTimer = setTimeout(() => {
      setLoadingTimerWriting2(false)
      setQueryTo(value)

    }, 1300);
    
    
      }

    else{

      
      if(field===FieldsObject.fieldWeightText){
        
        setFormSeaObject((formSeaObject)=>({...formSeaObject, [field] : formatNumber(value) }));
        return

      }

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

    }

}



  const valueSelect = (field , value)=>{

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

  }else{
        

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
      if(value && value?.origin && value?.origin?.ports){
        dispatch(resetPorts()); //حاليا علقتها 
        // setPortsFromArray([]);

        setLoadingTimer(true);

        setTimeout(() => {
          const newOptions = value.origin.ports.map(port => ({ port_country:value.origin?.label||value.origin?.label_ar, port_flag:value.origin.ImageURL,  name: port.name , port_code: port.port_code }));
          // setArrayCountry(newOptions);
          dispatch(editPorts(newOptions));


          setLoadingTimer(false)
    
    
      }, 600);

      }else if ((value?.name && value?.port_code)||(value?.description)){

         dispatch(resetPorts());
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
      
        if(value && value?.origin && value?.origin?.ports){
          dispatch(resetPortTo()); //حاليا علقتها 
          // setPortsToArray([]);

          setLoadingTimer2(true);

          setTimeout(() => {
            const newOptions = value.origin.ports.map(port => ({ port_country:value.origin?.label||value.origin?.label_ar, port_flag:value.origin.ImageURL,  name: port.name , port_code: port.port_code }));
            // setArrayCountry(newOptions);
            dispatch(editPortsTo(newOptions));

            setLoadingTimer2(false)
      
      
        }, 600);

      }else if ((value?.name && value?.port_code)||(value?.description)){

          dispatch(resetPortTo());
          setQueryTo("");

        }

      
      }

    }
      // setInputSearch(value?.origin?.label)
  }


    const handleClick = (e)=>{
    e.preventDefault();
    try{
      e.target.select();
    }
    catch(e){
    
    }
    }


    const handleSelectUnit =(e)=>{

        setFormSeaObject((formSeaObject)=>({...formSeaObject, selectUnit : e }));
    }

  
    const setDecrement = (index)=>{
      let data = [...formSeaObject.counter];
      data[index].valueCount = formSeaObject.counter[index].valueCount - 1;

      setFormSeaObject((formSeaObject)=>({...formSeaObject, counter:data }));

    }

    const setIncrement = (index) =>{
      let data = [...formSeaObject.counter];
      data[index].valueCount = formSeaObject.counter[index].valueCount + 1;

      setFormSeaObject((formSeaObject)=>({...formSeaObject, counter:data }));

    }

    const handleCountText =(index,value)=>{
      let data = [...formSeaObject.counter];
      data[index].valueCount = value;

      setFormSeaObject((formSeaObject)=>({...formSeaObject, counter:data }));

    }

    const handleCheckToggle=(value,valueCheck,index=-1)=>{
      setFormSeaObject((formSeaObject)=>({...formSeaObject, selectUnitToggle : value , valueCheck:valueCheck }));

    }


    const handleSubmit = (e) => {
      e.preventDefault();
      setIsSubmitted(true);

      const validFormObject = validForm(formSeaObject, "seaForm");
      setFormErrors(validFormObject);
    
      // if there are errors depend on validFormObject
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
          { key: "textPersonEmailValid", ref: refEmail },
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

    
    
      let postParamObject = {
        goods_weight: formSeaObject.textWeightValue,
        goods_unit: formSeaObject?.selectUnitToggle,
        goods_description: formSeaObject.textDescriptionGoods,
        goods_type: formSeaObject.selectTypeGoods?.label,
        movement_type: formSeaObject.typeMove?.from + " " + formSeaObject.typeMove?.to,
        shipment_date: formatDate(formSeaObject.selectDate),
        sender_name: formSeaObject.textPersonName,
        company_name: formSeaObject.textCompanyName,
        phone_number: formSeaObject.textPhoneNumber,
        loading_address: formSeaObject.titleLoad === t('labelServices.loadingPort')
          ? formSeaObject.selectFromPort?.name
          : `${formSeaObject.selectFromPort?.description}`,
        discharge_address: formSeaObject.titleDisCharge === t('labelServices.dischargePort')
          ? formSeaObject.selectToPort?.name
          : `${formSeaObject.selectToPort?.description}`,
        email: formSeaObject.textPersonEmail,
        containers: containersArray(formSeaObject.counter, "seaForm")
      };
    
      dispatch(postSeaForm(postParamObject));
      // console.log('seaForm',postParamObject)
    };
    

        useEffect(()=>{
          if(Object.keys(postForm).length>0){
            setFormSeaObject(initialFormSea);

            let data = [...formSeaObject.counter];

                  data[0].valueCount = 0;
                  data[1].valueCount = 0;
                  data[2].valueCount = 0;
                  data[3].valueCount = 0;

            setFormSeaObject((formSeaObject)=>({...formSeaObject, counter:data }));

            
            // reset searchRef
            inputSearchFrom.current.value="";
            inputSearchTo.current.value="";
          }

        },[postForm,initialFormSea])

        useEffect(()=>{

      
          if(queryFrom.length>=2){
            if(formSeaObject.titleLoad===t('labelServices.loadingPort')){
              dispatch(fetchPortBy({ query: queryFrom, queryType: 'from' }))
            }else{
              getResultsVities(queryFrom)
            }
      
          }
      
          else if(queryTo.length >=2){
            if(formSeaObject.titleDisCharge===t('labelServices.dischargePort')){
              dispatch(fetchPortBy({ query: queryTo, queryType: 'to' }))
            }else{
              getResultsVitiesTo(queryTo)
            }
          }

      
        },[dispatch,queryFrom,queryTo,loaderTimerWriting,loaderTimerWriting2])


      
    return (

      <div ref={targetRef}>
    <FormContainerService>

      {/* <MapComponent/> */}

            <div className='form-item width-100'>
            <SelectBoxFormSea 
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
        options={Ports}
        valueSelect={valueSelect}
        value={formSeaObject.selectFromPort  }
        titleInput={formSeaObject.titleLoad}
        handleInputText={handleInputText}
        resetPorts={resetPorts}
        isLoading={loadingPorts }// with quey will kmow to display
        loadingTimerSelected={loaderTimer}
        loadingWriting={loaderTimerWriting}
        errorValue={formErrors?.selectToPort}
        errorApi={errorPort}// with quey will kmow to display
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
        options={PortsTo}
        valueSelect={valueSelect}
        
        handleInputText={handleInputText}
        resetPorts={resetPortTo}
        isLoading={loadingPortsTo}// with quey will kmow to display
        loadingTimerSelected={loaderTimer2}
        loadingWriting={loaderTimerWriting2}

        errorValue={formErrors?.selectToPort}
        errorApi={errorPortTo} // with quey will kmow to display
        refInput= {refToPort} 
        refSearch={inputSearchTo}
        refDropDown={dropDownRefTo}
        query={queryTo}
        handleClickColor={handleClick}
        loadingCity={loadingCityTo}
        /> 
            </div>

            </div>


            <div className='card-tools'>
            <div className='card-input'>


              <InputWithSelect 
              textWeightValue={formSeaObject.textWeightValue} 
              selectUnit={formSeaObject.selectUnit}  
              optionsArray={optionsUnit}
              getInputText={handleInputText}
              getinputSelect={handleSelectUnit}
              getCheckToggle={handleCheckToggle}
              field={FieldsObject.fieldWeightText}
              fieldUnit={FieldsObject.fieldWeightUnit}
              title={t('labelServices.totalGoodsWeight')}
              placeholder={t('labelServices.placeholderEnterTotalGoodsWeight')}
              errorValue={formErrors?.textWeightValue}
              errorUnit={formErrors?.selectUnit}
              valueCheck={formSeaObject.valueCheck}
              ref={refWeight}


              /> 

            </div>

            <div className='card-input'>
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
            </div>

            <div className='form-item width-100'>
            <SelectBoxFormSea 
            placeholder={t('labelServices.placeholderselectGoodsType')}
            title={t('labelServices.goodsType')}
            options={sectionsObject} 
            isSearch={true} 
            value={formSeaObject.selectTypeGoods} 
            field={FieldsObject.fieldTypeGoods} 
            valueSelect={valueSelect}
            isLoading={false}
            getSections={getSections}
            cursor={"text"}
            errorValue={formErrors?.selectTypeGoods}
            typyForm={"Sea"}
            ref={refTypeGoods}
            />
            {error &&
              <span className='input-warning'>
              {error} 
            </span>
            }
            </div>

            <div className='form-item width-100' style={{marginBottom:'-8px'}}>
            <InputTextDesc 
               getInputText={handleInputText} 
              //  Icon={<ContainerIcon/>} 
               placeholder={t('labelServices.placeholderEnterDetailedGoodsDescription')}
               title={t('labelServices.goodsDescription')}
               field={FieldsObject.fieldDescription}
               value={formSeaObject.textDescriptionGoods}
               handleClick={handleClick}
               errorValue={formErrors?.textDescriptionGoods}
               isTextArea={true}
               styleTextArea={styleTextArea}
               inputRef={refDescription}


            />
            </div>

            <div className='form-item width-100'>
              <InputAccordion 
              placeholder={t('labelServices.placeholderContainerType')}
              title={t('labelServices.containerType')}
              content={formSeaObject.counter}
              setDecrement={setDecrement}
              setIncrement={setIncrement}
              handleCountText={handleCountText}
              errorValue={formErrors?.counter}
              ref={refContainer}

              // Icon={<ContainerTypeIcon/>}

              />
            </div>


            <div className='container-profile'>
            <div className='card-profile'>

              <div className='name-sea'>
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

              <div className='company-sea'>
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

              <div className='input-box-sea'>
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
              inputRef={refPhone}
              //valid={parsePhoneNumberFromString("+" + setFormSeaObject.textPhoneNumber)?.isValid() || false} // Use direct validation
              valid={parsePhoneNumberFromString("+" + formSeaObject.textPhoneNumber)?.isValid() || false}
              />
         
              </div>

              <div className='mailSeaPortForm'>
              {/* <InputMail 
              isSubmitted={isSubmitted}
              getInputText={handleInputText} 
              // Icon={<MailProfile/>} 
              title={t('labelServices.email')}
              placeholder={t('labelServices.placeholderEmail')}
              field={FieldsObject.fieldEmail}
              value={formSeaObject.textPersonEmail}
              handleClick={handleClick}
              errorValue={formErrors?.textPersonEmailValid}
              inputRef={refEmail}
              /> */}

                  <InputText
                          ref={emailRef}
                          getInputText={handleInputText}
                          Icon={<TfiEmail/>}
                          title={t('labelServices.email')}
                          placeholder={t('labelServices.placeholderEmail')}
                          field={FieldsObject.fieldEmail}
                          value={formSeaObject.textPersonEmail}
                        //   handleClick={handleClick}
                          errorValue={formErrors?.textPersonEmailValid}
                          valid={validateEmail(formSeaObject.textPersonEmail)} // Set valid based on email validation
              
                          />

              { (formErrors?.textPersonEmailValid && formErrors?.textPersonEmailValid !=="valid") && 
                <span className='input-warning'>
                { t('labelServices.InvalidEmail')}
                </span>
              }
              </div>
            </div>
            </div>

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

    </FormContainerService>
    </div>
    )
}

export default FormSea
