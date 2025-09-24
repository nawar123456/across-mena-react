import {Fragment, useEffect, useMemo, useRef, useState } from 'react';
import SelectBox from '../../common/SelectBox/SelectBox';
import SelectBoxFormLand from '../../common/SelectBox/SelectBoxFormLand';

import InputWithSelect from '../../common/InputWithSelect/InputWithSelect';


import {ReactComponent as DoorIcon}  from '../../../../../assets/icons/door-icon.svg';


import './FormLand.css';
import InputDatePicker from '../../common/DatePicker/DatePicker';

import Flat from '../../../../../assets/images/satha.png'
import Tray from '../../../../../assets/images/tray.png'
import LocomotiveTrailer from '../../../../../assets/images/LocomotiveTrailer.png'
import Freezer from '../../../../../assets/images/Freezer.png'
import ClosedContainer from '../../../../../assets/images/ClosedContainer.png'

import InputText from '../../common/InputText/InputText';
import InputPhone from '../../common/InputPhone/InputPhone';
import { fetchSections  } from '../../../../moduleTools/store/prohibitedTab/accordion.slice';
import {postLandForm } from '../../../../moduleServices/store/landTap/landTap.action';
import {resetPorts ,editPorts, editPortsTo, resetPortTo} from '../../../../moduleServices/store/seaTap/seaTap.slice';

import { useDispatch, useSelector } from 'react-redux';
import { validForm, validateEmail } from '../../../../../utils/validation/validationForm';
import FormContainerService from '../../common/FormContainerService/FormContainerService';
// import SelectBoxPort from '../../common/SelectBoxPort/SelectBoxPort';
import { formatDate } from '../../../../../utils/format/function';
import { containersArray } from '../../functions';
import useLoadGoogleMaps from '../../../../../hooks/useLoadGoogleMaps';
import SliderType from '../../common/SliderType/SliderType';
import { useTranslation } from 'react-i18next';
import AutoCompleteText from '../../common/AutoCompleteText/AutoCompleteText';
import parsePhoneNumberFromString from 'libphonenumber-js';
import { formatNumber } from '../../../../../utils/math/mathUtils';
import InputTextServices from '../../common/Services/Sea/InputTextServices';
import InputTextAirPort from '../../common/Services/Air/InputTextAirPort';
import InputTextLand from '../../common/Services/Land/InputTextLand';

let inputTimer ;
const FormLand = ({targetRef}) => {
  
  const {t,i18n} = useTranslation();

  const inputSearchFrom = useRef(null);
  const inputRefFrom = useRef(null);
  const dropDownRefFrom = useRef(null);
  const [queryFrom,setQueryFrom]= useState("");

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


  const inputSearchTo = useRef(null);
  const inputRefTo = useRef(null);
  const dropDownRefTo = useRef(null);
  const [queryTo,setQueryTo]= useState("");

  const [loaderTimerWriting , setLoadingTimerWriting ] = useState(false);
  const [loaderTimerWriting2, setLoadingTimerWriting2 ] = useState(false);


  const dispatch = useDispatch();
  const {loading,sections,error } =  useSelector((state) => state.accordion);
  const {loadingForm,
    postForm,
    // errorForm
  } = useSelector((state) => state.moduleServices.landFormSlice);
  
  const {
    Ports,
    PortsTo    
  } = useSelector((state) => state.moduleServices.seaFormSlice);
  
  const [loadingCity,setLoadingCity] = useState(false);
  const [loadingCity2,setLoadingCity2] = useState(false);

  useLoadGoogleMaps();

  const getSections = (async ()=>{

    try{


    await dispatch(fetchSections()).unwrap();

    }catch(err){
      return "error";
    }

  });

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


  const FieldsObject = {
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
    titleLoad:t('labelServices.goodsLoaded'),
    titleDisCharge:t('labelServices.goodsDischarge'),
    placeholderLoad:t('labelServices.placeholderGoodsLand'),
    placeholderDischarge:t('labelServices.placeholderGoodsLand'),

    loadIcon:<DoorIcon/>,
    dischargeIcon:<DoorIcon/>,
    textWeightValue:"",
    selectUnit:{value:2, label:t('labelServices.keloGram')},
    selectUnitToggle:t('labelServices.keloGram'),

    selectDate:null,
    counter:// by index will know whitch object should change 
    [{img:LocomotiveTrailer,title:t('labelServices.truckLocomotiveAndTrailer'), valueCount:0},
    {img:Freezer,title:t('labelServices.truckFreezer'), valueCount:0},
    {img:Flat,title:t('labelServices.truckFlat'), valueCount:0},
    {img:ClosedContainer,title:t('labelServices.truckClosedContainer'), valueCount:0},
    {img:Tray,title:t('labelServices.truckTipper'), valueCount:0},
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

  const [formSeaObject , setFormSeaObject] = useState(initialFormSea);

  useEffect(()=>{

    setFormSeaObject(initialFormSea);
    inputSearchFrom.current.value="";
    inputSearchTo.current.value="";

    setSetcionsObject(initialSectionsObject)


  },[i18n.language])
  
  const [formErrors, setFormErrors] = useState({});


    const getResultsCities = (value) => {
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

  const getResultsCitiesTo = (value) => {
    const input = value;

    if (input) {
      // Use AutocompleteService to get predictions
      const autocompleteService = new window.google.maps.places.AutocompleteService();
      setLoadingCity2(true);
      autocompleteService.getPlacePredictions(
        { input, types: ['(cities)'] },
        (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            dispatch(editPortsTo(results));
            setLoadingCity2(false);

          } else {
            setLoadingCity2(false);

            dispatch(resetPortTo())
          }
        }
      );
    } else {
      dispatch(resetPortTo())
      setLoadingCity2(false);
      
    }
    
};

useEffect(()=>{

  if(queryFrom.length>=2){
    if(formSeaObject.titleLoad===t('labelServices.goodsLoaded')){
      getResultsCities(queryFrom)
    }

  }

  else if(queryTo.length >=2){
    if(formSeaObject.titleDisCharge===t('labelServices.goodsDischarge')){
      getResultsCitiesTo(queryTo)
    }
  }


},[dispatch,queryFrom,queryTo,loaderTimerWriting,loaderTimerWriting2])


  const handleInputText = (field,value)=>{


        if (field ===FieldsObject.fieldFromPort ){
          if(formSeaObject.titleLoad===t('labelServices.loadingPort') && value.length >=2){
        
            setFormSeaObject((formSeaObject)=>({...formSeaObject, [FieldsObject.fieldFromPort] : null }));

        
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



        } else if (field ===FieldsObject.fieldToPort){

          if(formSeaObject.titleDisCharge===t('labelServices.dischargePort') && value.length >=2){

            setFormSeaObject((formSeaObject)=>({...formSeaObject, [FieldsObject.fieldToPort] : null }));

        
        }else {
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
        
    }else
    {

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

          setFormSeaObject((formSeaObject)=>({...formSeaObject, [field] : value }));
      
          if (field ===FieldsObject.fieldFromPort ){
            let inputShow = `${value?.description} `;


          //value?.origin?.label || value?.name
          inputSearchFrom.current.value=inputShow;
  
          //first click 
          if (value?.description){
  
            dispatch(resetPorts());
            setQueryFrom("");
            
          }
  
  
  
  
          }
          else if (field ===FieldsObject.fieldToPort ){
            let inputShow = `${value?.description} `;


          //value?.origin?.label || value?.name
          inputSearchTo.current.value=inputShow;
  
          //first click 
          if (value?.description){
  
            dispatch(resetPortTo());
            setQueryTo("");
          }
          }
    }


    const handleClick = (e)=>{
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


        const validFormObject = validForm(formSeaObject,"landForm");

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
          goods_weight:formSeaObject.textWeightValue,
          goods_unit:formSeaObject?.selectUnitToggle,
          goods_description:formSeaObject.textDescriptionGoods,
          goods_type:formSeaObject.selectTypeGoods.label ,
          shipment_date:formatDate(formSeaObject.selectDate),
          sender_name:formSeaObject.textPersonName,
          company_name:formSeaObject.textCompanyName,
          phone_number:formSeaObject.textPhoneNumber,
          loading_address: formSeaObject.selectFromPort?.structured_formatting?.main_text ,
          discharge_address:formSeaObject.selectToPort?.structured_formatting?.main_text,
          email:formSeaObject.textPersonEmail,
          trucks:containersArray(formSeaObject.counter,"landForm")
        }


        dispatch(postLandForm(postParamObject));
        
        };

        useEffect(()=>{
          if(Object.keys(postForm).length>0){
            setFormSeaObject(initialFormSea);
            // reset searchRef
            inputSearchFrom.current.value="";
            inputSearchTo.current.value="";
          }

        },[postForm,initialFormSea])

        const styleTextArea={
          height:'80px',
        }

    return (

    <div ref={targetRef}>

    <FormContainerService>
  
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
        loadingWriting={loaderTimerWriting}
        errorValue={formErrors?.selectToPort}
        errorApi={null}// with quey will kmow to display
        // refInput= {inputRefFrom}
        refSearch={inputSearchFrom}
        refDropDown={dropDownRefFrom}
        query={queryFrom}
        handleClickColor={handleClick}
        loadingCity={loadingCity}
        isLoading={loadingCity}
        refInput={refFromPort}

        />
            </div>

            <div className='card-input'>
        <AutoCompleteText
        placeholder={formSeaObject.placeholderDischarge} 
        Icon={formSeaObject.dischargeIcon}
        field={FieldsObject.fieldToPort} 
        options={PortsTo}
        valueSelect={valueSelect}
        value={formSeaObject.selectToPort  }
        titleInput={formSeaObject.titleDisCharge}
        handleInputText={handleInputText}
        resetPorts={resetPortTo}
        loadingWriting={loaderTimerWriting2}
        errorValue={formErrors?.selectToPort}
        errorApi={null}// with quey will kmow to display
        // refInput= {inputRefTo}
        refSearch={inputSearchTo}
        refDropDown={dropDownRefTo}
        query={queryTo}
        handleClickColor={handleClick}
        loadingCity={loadingCity2}
        isLoading={loadingCity2}
        refInput={refToPort}


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
              valueCheck={formSeaObject.valueCheck}

              field={FieldsObject.fieldWeightText} 
              fieldUnit={FieldsObject.fieldWeightUnit}
              title={t('labelServices.totalGoodsWeight') }
              placeholder={t('labelServices.placeholderEnterTotalGoodsWeight') }
              errorValue={formErrors?.textWeightValue}
              errorUnit={formErrors?.selectUnit}
              // Icon={<WeightIcon/>}
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
            <SelectBoxFormLand 
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

            <div className='form-item width-100' style={{marginBottom:'-3px'}}>
            <InputTextServices 
               getInputText={handleInputText} 
              //  Icon={<ContainerIcon/>} 
               placeholder={t('labelServices.placeholderEnterDetailedGoodsDescription')}
               title={t('labelServices.goodsDescription')}
               field={FieldsObject.fieldDescription}
               value={formSeaObject.textDescriptionGoods}
               handleClick={handleClick}
              //  errorValue={formErrors?.textDescriptionGoods}
              styleTextArea={styleTextArea}
              isTextArea={true}


            />
            </div>



            <div className='form-item width-100'>
              <SliderType
              title={t('labelServices.truckType')}
              arrayItems={formSeaObject.counter}
              setDecrement={setDecrement}
              setIncrement={setIncrement}
              handleCountText={handleCountText}
              errorValue={formErrors?.counter}
              ref={refContainer}
              />
            </div>

            <div className='container-profile-land'>
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
              <InputTextLand 
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
              inputRef={refPhone}
              valid={parsePhoneNumberFromString("+" + formSeaObject.textPhoneNumber)?.isValid() || false}
                             />
              { (formErrors?.textPhoneNumberValid && formErrors?.textPhoneNumberValid !=="valid") &&
                <span className='input-warning'>
                {t('labelServices.InvalidPhone')}
              </span>
              }
              </div>

              <div className='mailLandForm'>
              <InputTextAirPort 
              getInputText={handleInputText} 
              // Icon={<MailProfile/>} 
              title={t('labelServices.email')}
              placeholder={t('labelServices.placeholderEmail')}
              field={FieldsObject.fieldEmail}
              value={formSeaObject.textPersonEmail}
              handleClick={handleClick}
              errorValue={formErrors?.textPersonEmailValid}
              ref={emailRef}
              valid={validateEmail(formSeaObject.textPersonEmail)} // Set valid based on email validation

              />

              { (formErrors?.textPersonEmailValid && formErrors?.textPersonEmailValid !=="valid") && 
                <span className='input-warning'>
                {t('labelServices.InvalidEmail')}
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

export default FormLand
