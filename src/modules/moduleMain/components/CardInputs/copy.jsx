import SelectBox from "../../../moduleServices/components/common/SelectBox/SelectBox";
import './CardInputs.css';

import { useEffect, useMemo, useRef, useState } from "react";
import {ReactComponent as MenaIcon}  from '../../../../assets/icons/Mena_Line.svg';
import {editPorts, editPortsTo, resetPortTo, resetPorts } from '../../../moduleServices/store/seaTap/seaTap.slice';
import {fetchPortBy } from '../../../moduleServices/store/seaTap/seaTap.action';
import {fetchTripsBy} from '../../store/home/home.action';

import { useSelector,useDispatch } from "react-redux";


import {ReactComponent as ContainerMove}  from '../../../../assets/icons/container-icon.svg';
import ContainerMoveImage from '../../../../assets/icons/container-icon.svg'
import { useLocation, useNavigate } from "react-router-dom";
import { addPortsObject, savePortsObject } from "../../store/home/home.slice";
import { useTranslation } from "react-i18next";
import AutoCompleteText from "../../../moduleServices/components/common/AutoCompleteText/AutoCompleteText";
import './index.css'
import InputWithSuggestions from "../FormBooking/InputWithSuggestions";
let inputTimer;

const CardInputs = ({portsObjectSave}) => {
	const [hasError, setHasError] = useState(false);
	const [recentPortsFrom, setRecentPortsFrom] = useState([]);
	const [recentPortsTo, setRecentPortsTo] = useState([]);

    const dispatch = useDispatch();
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
    const { t, i18n } = useTranslation();


    const inputSearchFrom = useRef(null);
    const inputRefFrom = useRef(null);
    const dropDownRefFrom = useRef(null);
    // const [portsFromArray, setPortsFromArray] = useState([])
    const [queryFrom,setQueryFrom]= useState("");


    const inputSearchTo = useRef(null);
    const inputRefTo = useRef(null);
    const dropDownRefTo = useRef(null);
    // const [portsToArray, setPortsToArray] = useState([])
    const [queryTo,setQueryTo]= useState("");



		const handleCounterChange = (index, delta) => {
			setCounters((prevCounters) => {
				const updated = [...prevCounters];
				updated[index] = Math.max(0, updated[index] + delta); // Prevent negative counters
				return updated;
			});
		};

		const isFromPortEmpty=''
    const {
        Ports,
        loadingPorts,
        errorPort,

        PortsTo,
        loadingPortsTo,
        errorPortTo,
      } = useSelector((state) => state.moduleServices.seaFormSlice);

      const {
        portsObject,
				loadingForm
      } = useSelector((state) => state.moduleMain.homeSlice)

    const FieldsObject = {
        fieldFromPort:'selectFromPort',
        fieldToPort:'selectToPort',
        fieldDate:'selectDate',
        fieldContainer:'selectContainer'
    }

		const filteredPorts = recentPortsFrom.filter(
			(item) => !item.origin?.ports // Exclude items with the `ports` property in `origin`
		);

		useEffect(() => {
			const storedRecentPortsFrom = JSON.parse(localStorage.getItem('recentPortsFrom')) || [];
			const storedRecentPortsTo = JSON.parse(localStorage.getItem('recentPortsTo')) || [];
			setRecentPortsFrom(storedRecentPortsFrom);
			setRecentPortsTo(storedRecentPortsTo);
		}, []);

		const updateRecentPorts = (field, selectedValue) => {
			if (field === FieldsObject.fieldFromPort) {
				setRecentPortsFrom((prev) => {
					const updated = [selectedValue, ...prev.filter((item) => item.name !== selectedValue.name)];
					localStorage.setItem('recentPortsFrom', JSON.stringify(updated.slice(0, 10))); // Save only last 3
					return updated.slice(0, 10);
				});
			} else if (field === FieldsObject.fieldToPort) {
				setRecentPortsTo((prev) => {
					const updated = [selectedValue, ...prev.filter((item) => item.name !== selectedValue.name)];
					localStorage.setItem('recentPortsTo', JSON.stringify(updated.slice(0, 10))); // Save only last 3
					return updated.slice(0, 10);
				});
			}
		};
		const handleInputChange = (field, value) => {
			setFormSeaObject((prev) => ({
				...prev,
				[field]: value,
			}));
		};
    const initialFormSea = useMemo(() => ({
        titleLoad:t('labelServices.loadingPort'),
        titleDisCharge:t('labelServices.dischargePort'),
        placeholderLoad:t('bookingTitles.placeholderPortFrom'),
        placeholderDischarge:t('bookingTitles.placeholderPortTo'),
        loadIcon:<MenaIcon/>,
        dischargeIcon:<MenaIcon/>,
        counter:// by index will know whitch object should change
        [{img:ContainerMoveImage,title:`${t('labelServices.container1')}`,titleForApi:'20ft',details:`${t('labelServices.maximumContainerLoad')} ${'28.300kg & 33m'}`},

        {img:ContainerMoveImage,title:`${t('labelServices.container2')}`,titleForApi:'40ft', details:`${t('labelServices.maximumContainerLoad')} ${'28.800kg & 55m'}`},
        // {img:ContainerMoveImage,title:'40feet_freeser', details:`${t('labelServices.maximumContainerLoad')} ${'29.480'}`, unit:`${'m'}`},
        {img:ContainerMoveImage,title:`${t('labelServices.container4')}`,titleForApi:'40HC',details:`${t('labelServices.maximumContainerLoad')} ${'28.690kg & 76m'}`},
        ],

        selectFromPort:null,
        selectToPort:null,
        selectContainer:null,



    }), [i18n.language]);

		const [counters, setCounters] = useState(
			initialFormSea.counter.map(() => 0) // Initialize counters to 0
		);

    const [formSeaObject , setFormSeaObject] = useState(initialFormSea);
    const [loaderTimer , setLoadingTimer] = useState(false);

    const [loaderTimer2 , setLoadingTimer2] = useState(false);
    const [loaderTimerWriting , setLoadingTimerWriting ] = useState(false);
    const [loaderTimerWriting2, setLoadingTimerWriting2 ] = useState(false);



		// const updateRecentPorts = (field, selectedValue) => {
		// 	if (field === FieldsObject.fieldFromPort) {
		// 		setRecentPortsFrom((prev) => {
		// 			const updated = [selectedValue, ...prev.filter((item) => item.name !== selectedValue.name)];
		// 			return updated.slice(0, 3); // Keep only the last 3
		// 		});
		// 	} else if (field === FieldsObject.fieldToPort) {
		// 		setRecentPortsTo((prev) => {
		// 			const updated = [selectedValue, ...prev.filter((item) => item.name !== selectedValue.name)];
		// 			return updated.slice(0, 3);
		// 		});
		// 	}
		// };
  useEffect(() => {

    const handleClickOutside = (event) => {

      if( (inputRefFrom.current && inputRefFrom.current.contains(event.target)) || (dropDownRefFrom.current && dropDownRefFrom.current.contains(event.target))){

        if((formSeaObject.selectToPort ===null  && !portsObjectSave?.selectToPort) || (formSeaObject.selectToPort && formSeaObject.selectToPort?.origin && formSeaObject.selectToPort?.origin?.ports)){
          setQueryTo("")
          inputSearchTo.current.value=""
          dispatch(resetPortTo())
          setFormSeaObject((formSeaObject)=>({...formSeaObject, [FieldsObject.fieldToPort] : null }));

          return;

        }

      }
        //((inputRefTo.current && !inputRefTo.current.contains(event.target)) && (dropDownRefTo.current && !dropDownRefTo.current.contains(event.target)))
       else if(  (inputRefTo.current && inputRefTo.current.contains(event.target)) || (dropDownRefTo.current && dropDownRefTo.current.contains(event.target))){

        if((formSeaObject.selectFromPort===null && !portsObjectSave?.selectFromPort) || (formSeaObject.selectFromPort && formSeaObject.selectFromPort?.origin && formSeaObject.selectFromPort?.origin?.ports)){
        setQueryFrom("")
        inputSearchFrom.current.value=""
        dispatch(resetPorts())
        setFormSeaObject((formSeaObject)=>({...formSeaObject, [FieldsObject.fieldFromPort] : null }));

        return;
      }
    }else
    {//out side
    //ul
        if(dropDownRefFrom.current){//I'm out and reset my self if
          if((formSeaObject.selectFromPort===null && !portsObjectSave?.selectFromPort) || (formSeaObject.selectFromPort && formSeaObject.selectFromPort?.origin && formSeaObject.selectFromPort?.origin?.ports)){
            setQueryFrom("")
            inputSearchFrom.current.value=""
            dispatch(resetPorts())
            setFormSeaObject((formSeaObject)=>({...formSeaObject, [FieldsObject.fieldFromPort] : null }));


          }


        }else{// I'm clickme so no need to check my self ..... check the others


        }

        if(dropDownRefTo.current){//I'm out and reset my self if

          if((formSeaObject.selectToPort ===null  && !portsObjectSave?.selectToPort) || (formSeaObject.selectToPort && formSeaObject.selectToPort?.origin && formSeaObject.selectToPort?.origin?.ports)){
            setQueryTo("")
            inputSearchTo.current.value=""
            dispatch(resetPortTo())
            setFormSeaObject((formSeaObject)=>({...formSeaObject, [FieldsObject.fieldToPort] : null }));


          }

        }else{// I'm clickme so no need to check my self ..... check the others


        }

    }



    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [formSeaObject.selectFromPort,formSeaObject.selectToPort]);

  const handleClick = (e)=>{
    e.preventDefault();
    try{
    e.target.select();

    }
    catch(e){

    }
  }

  useEffect(()=>{

    if(location.pathname.substring(location.pathname.lastIndexOf('/') ) === "/results-book"){

      if(portsObjectSave?.selectFromPort){
        inputSearchFrom.current.value=`${portsObjectSave?.selectFromPort?.name}`
      }
      if(portsObjectSave?.selectToPort){
        inputSearchTo.current.value=`${portsObjectSave?.selectToPort?.name}`

      }

    }

  },[])

	useEffect(() => {
		setFormSeaObject((prev) => ({
			...prev,
			// Update only language-dependent fields
			titleLoad: t('labelServices.loadingPort'),
			titleDisCharge: t('labelServices.dischargePort'),
			placeholderLoad: t('bookingTitles.placeholderPortFrom'),
			placeholderDischarge: t('bookingTitles.placeholderPortTo'),
			counter: [
				{
					img: ContainerMoveImage,
					title: `${t('labelServices.container1')}`,
					titleForApi: '20ft',
					details: `${t('labelServices.maximumContainerLoad')} ${'28.300kg & 33m'}`,
				},
				{
					img: ContainerMoveImage,
					title: `${t('labelServices.container2')}`,
					titleForApi: '40ft',
					details: `${t('labelServices.maximumContainerLoad')} ${'28.800kg & 55m'}`,
				},
				{
					img: ContainerMoveImage,
					title: `${t('labelServices.container4')}`,
					titleForApi: '40HC',
					details: `${t('labelServices.maximumContainerLoad')} ${'28.690kg & 76m'}`,
				},
			],
			// Preserve selected port values and their properties
			selectFromPort: prev.selectFromPort,
			selectToPort: prev.selectToPort,
			selectContainer: location.pathname.includes('CardBooking')
      ? prev.selectContainer
      : null,
  }));
}, [i18n.language, location.pathname, t]);




  useEffect(()=>{

    if(queryFrom.length>=2){

      dispatch(fetchPortBy({ query: queryFrom, queryType: 'from' }))

    }

    if(queryTo.length >=2){
      dispatch(fetchPortBy({ query: queryTo, queryType: 'to' }))
    }


  },[dispatch,queryFrom,queryTo,loaderTimerWriting,loaderTimerWriting2])


	useEffect(() => {
		setFormSeaObject((prev) => ({
			...prev,
			titleLoad: t('labelServices.loadingPort'),
			titleDisCharge: t('labelServices.dischargePort'),
			placeholderLoad: t('bookingTitles.placeholderPortFrom'),
			placeholderDischarge: t('bookingTitles.placeholderPortTo'),
			counter: [
				{
					img: ContainerMoveImage,
					title: `${t('labelServices.container1')}`,
					titleForApi: '20ft',
					details: `${t('labelServices.maximumContainerLoad')} ${'28.300kg & 33m'}`,
				},
				{
					img: ContainerMoveImage,
					title: `${t('labelServices.container2')}`,
					titleForApi: '40ft',
					details: `${t('labelServices.maximumContainerLoad')} ${'28.800kg & 55m'}`,
				},
				{
					img: ContainerMoveImage,
					title: `${t('labelServices.container4')}`,
					titleForApi: '40HC',
					details: `${t('labelServices.maximumContainerLoad')} ${'28.690kg & 76m'}`,
				},
			],
			// Preserve existing selected ports and container type
			selectFromPort: prev.selectFromPort,
			selectToPort: prev.selectToPort,
			selectContainer: prev.selectContainer,
		}));
	}, [i18n.language]);
    const handleResults = ()=>{

			       // Check if the required fields are empty
        const isFromPortEmpty = !(formSeaObject.selectFromPort || portsObjectSave?.selectFromPort);
        const isToPortEmpty = !(formSeaObject.selectToPort || portsObjectSave?.selectToPort);
        const isContainerTypeEmpty = !(formSeaObject.selectContainer || portsObjectSave?.selectContainer);

        if (isFromPortEmpty || isToPortEmpty || isContainerTypeEmpty) {
            setHasError(true);
        } else {
            setHasError(false);
            // Proceed with your search logic
        }

    // validation
      let errorObject = {};

      if(formSeaObject?.selectContainer ===null || formSeaObject?.selectContainer===undefined){
        if(portsObjectSave?.selectContainer===null || portsObjectSave?.selectContainer===undefined)
        errorObject.selectContainer = "الحقل  مطلوب"

			const fromStyleEdit={
				border: '1px solid red'
    }

        }

    if(formSeaObject?.selectFromPort ===null || formSeaObject?.selectFromPort===undefined){
      if(portsObjectSave?.selectFromPort===null || portsObjectSave?.selectFromPort===undefined)
        errorObject.selectFromPort = "الحقل  مطلوب"

    }
    if(formSeaObject?.selectToPort ===null || formSeaObject?.selectToPort===undefined){
      if(portsObjectSave?.selectToPort===null || portsObjectSave?.selectToPort===undefined)
      errorObject.selectToPort = "الحقل  مطلوب"
  }

  setFormErrors(errorObject);


  if(Object.keys(errorObject).length > 0){
    return;
  }





    //save this object to continue others steps but savePort just for results page
    dispatch(addPortsObject({
			portFrom:formSeaObject.selectFromPort?.name ||portsObjectSave.selectFromPort?.name,
      portTo:formSeaObject.selectToPort?.name || portsObjectSave.selectToPort?.name,
      selectContainer:formSeaObject.selectContainer?.titleForApi || portsObjectSave.selectContainer?.titleForApi
      }))
  // }




      let params ={
        stationFrom:formSeaObject.selectFromPort?.port_code ||portsObjectSave.selectFromPort?.port_code ,//Durres
        stationTo:formSeaObject.selectToPort?.port_code || portsObjectSave.selectToPort?.port_code,//Arzew
        containerType:formSeaObject.selectContainer?.titleForApi || portsObjectSave.selectContainer?.titleForApi//20ft
      }


      dispatch(fetchTripsBy(params));

      //Search Button ( first search in main page and second in Result page)
      if(location.pathname.substring(location.pathname.lastIndexOf('/') ) !== "/results-book"  ){

        dispatch(savePortsObject({
          selectFromPort:formSeaObject.selectFromPort,
          selectToPort:formSeaObject.selectToPort,
          selectContainer:formSeaObject.selectContainer
        }))

        navigate('results-book');

      } else if (location.pathname.substring(location.pathname.lastIndexOf('/') ) === "/results-book"){
        dispatch(savePortsObject({
          selectFromPort:formSeaObject.selectFromPort || portsObjectSave.selectFromPort,
          selectToPort:formSeaObject.selectToPort || portsObjectSave.selectToPort,
          selectContainer:formSeaObject.selectContainer || portsObjectSave.selectContainer,
        }))

      }



    }
    const valueSelect = (field , value)=>{

			updateRecentPorts(field, value);

        // setFormSeaObject((formSeaObject)=>
				// 	({...formSeaObject, [field] : value }));

				setFormSeaObject((prev) => ({
					...prev,
					[field]: value,
				}));


        if (field ===FieldsObject.fieldFromPort ){
          let inputShow ="";
          if(value?.name){
            inputShow = `${value?.name}`
          }else{
            inputShow = `${value?.origin?.label || value?.origin?.label_ar} `
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

        }else if (value?.name && value?.port_code){

          dispatch(resetPorts());
          setQueryFrom("");

        }




        }
        else if (field ===FieldsObject.fieldToPort ){

          let inputShow ="";
          if(value?.name){
            inputShow = `${value?.name}`
          }else{
            inputShow = `${value?.origin?.label || value?.origin?.label_ar} `
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

          }else if (value?.name && value?.port_code){

            dispatch(resetPortTo());
            setQueryTo("");

          }


        }

        // setInputSearch(value?.origin?.label)
    }


    const handleInputText = (field,value)=>{
        if (field ===FieldsObject.fieldFromPort ){

        if(formSeaObject.titleLoad===t('labelServices.loadingPort') && value.length >=2){

        setFormSeaObject((formSeaObject)=>({...formSeaObject, [FieldsObject.fieldFromPort] : null }));

        if(portsObjectSave?.selectFromPort){
          dispatch(savePortsObject({
            ...portsObjectSave,
            selectFromPort:null,
            }))
        }

        }else{

          setFormSeaObject((formSeaObject)=>({...formSeaObject, [FieldsObject.fieldFromPort] : null }));

          if(portsObjectSave?.selectFromPort){
            dispatch(savePortsObject({
            ...portsObjectSave,
            selectFromPort:null
        }))
      }


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

        if(field===FieldsObject.fieldToPort){

          if(formSeaObject.titleDisCharge===t('labelServices.dischargePort') && value.length >=2){

            setFormSeaObject((formSeaObject)=>({...formSeaObject, [FieldsObject.fieldToPort] : null }));

            if(portsObjectSave?.selectToPort){
              dispatch(savePortsObject({
                ...portsObjectSave,
                selectToPort:null,
                }))
            }


        }else{

          setFormSeaObject((formSeaObject)=>({...formSeaObject, [FieldsObject.fieldToPort] : null }));

          if(portsObjectSave?.selectToPort){
            dispatch(savePortsObject({
            ...portsObjectSave,
            selectToPort:null
        }))
      }

  // setLoading1(true)

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

}


const filteredPortsFrom = Ports?.filter(
  (port) => port.name !== (formSeaObject.selectToPort?.name || portsObjectSave?.selectToPort?.name)
);

const filteredPortsTo = PortsTo?.filter(
  (port) => port.name !== (formSeaObject.selectFromPort?.name || portsObjectSave?.selectFromPort?.name)
);
    const styleEdit={
        transform:'translate(-5%, -50%)',
        display:'block',
    }
  return (
    <div className="card-section">
    <div className='card-inputs'>



        <AutoCompleteText
				recentValues={recentPortsFrom} // for the entered values inside the input
        placeholder={formSeaObject.placeholderLoad}
        Icon={formSeaObject.loadIcon}
        field={FieldsObject.fieldFromPort}
        options={filteredPortsFrom}
        valueSelect={valueSelect}
        value={formSeaObject.selectFromPort || portsObjectSave?.selectFromPort }

        handleInputText={handleInputText}
        resetPorts={resetPorts}
        isLoading={loadingPorts }// with quey will kmow to display
        loadingTimerSelected={loaderTimer}
        loadingWriting={loaderTimerWriting}
        errorValue={formErrors?.selectToPort}
        errorApi={errorPort}// with quey will kmow to display
        refInput= {inputRefFrom}
        refSearch={inputSearchFrom}
        refDropDown={dropDownRefFrom}
        query={queryFrom}
        handleClickColor={handleClick}

				 // Add error class

        />

        <AutoCompleteText
				recentValues={recentPortsTo}
        Icon={formSeaObject.loadIcon}
        placeholder={formSeaObject.placeholderDischarge}
        field={FieldsObject.fieldToPort}
        value={formSeaObject.selectToPort || portsObjectSave?.selectToPort }
        options={filteredPortsTo}
        valueSelect={valueSelect}
        handleInputText={handleInputText}
        resetPorts={resetPortTo}
        isLoading={loadingPortsTo}// with quey will kmow to display
        loadingTimerSelected={loaderTimer2}
        loadingWriting={loaderTimerWriting2}
        errorValue={formErrors?.selectToPort}
        errorApi={errorPortTo} // with quey will kmow to display
        refInput= {inputRefTo}
        refSearch={inputSearchTo}
        refDropDown={dropDownRefTo}
        query={queryTo}
        handleClickColor={handleClick}

        />

         <div className="card-inputs__selected">
				 {initialFormSea.counter.map((container, index) => (
        <div key={index} className="container-counter">

					<SelectBox
            placeholder={t('labelServices.placeholderContainerType')}
            options={initialFormSea.counter}
            isSearch={false}
            // value={formSeaObject.selectContainer  || portsObject?.selectContainer}
            // value={formSeaObject.selectContainer || portsObjectSave?.selectContainer  }
            // value={formSeaObject.selectContainer  || portsObject?.selectContainer}
						value={container}
						field={FieldsObject.fieldContainer}
            valueSelect={valueSelect}
            isLoading={false}
            Icon={<ContainerMove/>}
            title={t('labelServices.containerType')}
            isHideTitle={true}
            setFormSeaObject={setFormSeaObject}
            styleEdit={styleEdit}
            errorValue={formErrors?.selectContainer}
            IconMobile={<img src={container.img} alt="container-icon" />}

            />

<div className="counter-controls">
            <button onClick={() => handleCounterChange(index, -1)}>-</button>
            <span>{counters[index]}</span>
            <button onClick={() => handleCounterChange(index, 1)}>+</button>
          </div>
        </div>
      ))}
    </div>
</div>
    <div className='home-btn'>
        <button disabled={loadingForm}  className='btn-main' onClick={handleResults}>
        {t('actions.searchBtn')}
				<span className={`${loadingForm && 'btn-ring'}`}></span>

        </button>
    </div>
    </div>
  )
}

export default CardInputs
