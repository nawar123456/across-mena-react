import './Track.css';
import MainContainer from '../../../../components/MainContainer/MainContainer';
import ProgressBars from '../../components/trackPage/ProgressBars/ProgressBars';
import { useEffect, useRef, useState } from 'react';
import AccordionItem from '../../components/trackPage/AccordionItem/AccordionItem';
import TrackTabelDetails from '../../components/trackPage/TrackTabelDetails/TrackTabelDetails';
import { useTranslation } from 'react-i18next';
import { fetchTrackInfo } from '../../store/trackTab/track.action';
import { useDispatch, useSelector } from 'react-redux';
import SEO from '../../../../components/SEO/SEO';
import { getSEOData } from '../../../../const/seoTitles';
import noResultsIcon from '../../../../assets/images/noresults.png';
import Truck from '../../../../assets/images/TruckShimpnet.webp';
import Box from '../../../../assets/images/yBox.svg';
import Ship from '../../../../assets/images/yShip.svg';
import Map from '../../../../assets/images/mapRoad.svg';


import { useLocation, useNavigate } from 'react-router-dom';
import SubCardInfo from '../../components/trackPage/SubCardInfo/SubCardInfo';
import {ReactComponent as FileIcon } from '../../../../assets/icons/document-file.svg';
import {ReactComponent as DateIcon } from '../../../../assets/icons/dateIconTrack.svg';
import {ReactComponent as LocationIcon } from '../../../../assets/icons/location-pin.svg';
import { clearTrack } from '../../store/trackTab/track.slice';
import FeatureCard from './FeatureCard ';
import HeroTool from '../../../moduleServices/components/common/Tools/HeroTool';


const Track = () => {

    const dispatch = useDispatch();
    const {t, i18n} = useTranslation();
    
    // Get SEO data based on current language
    const currentLang = i18n.language || 'ar';
    const seoData = getSEOData('track', currentLang);
    const {loadingTrack,trackInfo} = useSelector((state) => state.trackSlice)
    const inputValue = useRef();
    

    const {pathname, search} = useLocation();
    const navigate = useNavigate();
   
    
    const [isEditContainerTrack , setIsEditContainerTrack] = useState(false);

    const [activeContainerNo, setActiveContainerNo] = useState(null);
    const [activeContainerNoAuto, setActiveContainerNoAuto] = useState(0);
    // const [inputValue,setInputValue] = useState("");
    // const {t,i18n} = useTranslation();
    const [initialTrackContainer,setInitialTrackContainer]= useState({});
    const [trackingPath , setTrackingPath] = useState([]);

    const [isScreenWidthLess, setIsScreenWidthLess] = useState(false);
    const [showIconLocation, setShowIconLocation] = useState(false);
    const [queryString, setQueryString] = useState("");
    const [lastLocation, setLastLocation]= useState({
        stationName:"",
        stationArrivalDate:""
    });



    //add values with same order 
    const initialArrayBill=[
        {title: t(`labelTrackPage.tableBill0`),value:''},
        {title: t(`labelTrackPage.tableBill1`),value:''},
        {title: t(`labelTrackPage.tableBill2`),value:''},
        {title: t(`labelTrackPage.tableBill3`),value:''},
        {title: t(`labelTrackPage.tableBill4`),value:''}


    ];
    //add values with sam order 
    const initialArrayContainer=[
        {title:'',value:''},
        {title:'',value:''},
        {title:'',value:''},

    ];
    //when click search assign titles depends on langauges 
    const [arrayObjectsTable, setArrayObjectsTable] = useState(initialArrayBill);
    const [arrayObjectsContainerTable, setArrayObjectsContainerTable] = useState(initialArrayContainer);



    useEffect(()=>{
        const query = new URLSearchParams(search).get('track-number');
        setQueryString(query);

        if(query ){
            inputValue.current.value = query;
        }


    },[search])
    
    const getLastLocation= (arrayTrackContainer)=>{

        for ( let i =0 ; i < arrayTrackContainer.length; i++){

            if(new Date(trackInfo?.current_date).setHours(0, 0, 0, 0) > new Date(arrayTrackContainer[arrayTrackContainer.length - 1]?.arrival_date).setHours(0, 0, 0, 0)){
                return {
                    stationName: arrayTrackContainer[arrayTrackContainer.length - 1]?.station_name,
                    stationArrivalDate: arrayTrackContainer[arrayTrackContainer.length - 1]?.arrival_date
                }

            }else if(new Date(trackInfo?.current_date).setHours(0, 0, 0, 0) ===  new Date(arrayTrackContainer[i]?.arrival_date).setHours(0, 0, 0, 0)){

                return{
                    stationName: arrayTrackContainer[i]?.station_name,
                    stationArrivalDate: arrayTrackContainer[i]?.arrival_date
                }

            }else if((new Date(trackInfo?.current_date).setHours(0, 0, 0, 0) >=  new Date(arrayTrackContainer[i]?.arrival_date) && new Date(trackInfo?.current_date).setHours(0, 0, 0, 0) <  new Date(arrayTrackContainer[i+1]?.arrival_date).setHours(0, 0, 0, 0))){

                return {
                    stationName: arrayTrackContainer[i]?.station_name,
                    stationArrivalDate: arrayTrackContainer[i]?.arrival_date
                }

            }

        }



    }


    const styleProgressVertical={

        borderRight:'2px dashed rgba(112, 112, 112, 0.8)',
        progressBarWidth:'0%',
        
        progressBarheight:'50px',
        borderRightSolid:'2px solid #fcc400',

        heightSmallPoints:'8px',
        heightBigPoints:'10px',

        widthSmallPoints:'8px',
        widthBigPoints:'10px',
        borderRadious:'50%',

        leftLittle:'0.8px',//edit move circle track 
        backgroundColorOriginal:'#707070',
        backgroundColorChange:'#fcc400',
        topInfo:'-7px',
        leftIcon: '-4px',
        positionIcon: 'absolute',

        leftNameStation:'-120px',
        fontSizeStation:'13.5px',
        textAlignName:'end'
    }

    const styleProgressHorizantal={

        borderBottom:'2px dashed #707070',
        borderBottomSolid:'2px solid #fcc400',

        progressBarWidth:'100%',
        progressBarheight:'100%'
    }
    

    useEffect(()=>{

        const handleResize = () => {
            if(window.innerWidth <= 778){

                setIsScreenWidthLess(true);

    
            }else{
                setIsScreenWidthLess(false);

            }

         };

        handleResize();
        
        window.addEventListener('resize', handleResize);
        
         // Cleanup function to remove the event listener when the component unmounts
         return () => {
            window.removeEventListener('resize', handleResize);

         };



    },[])

    useEffect(()=>{


        const newTitles = arrayObjectsTable.map((item, index) => ({
            ...item,
            title: t(`labelTrackPage.tableBill${index}`), 
        }));

        const newTitlesContainerTable = arrayObjectsContainerTable.map((item, index) => ({
            ...item,
            title: t(`labelTrackPage.tableContainer${index}`), 
        }));

        // console.log(newTitles,"newTitles")


        setArrayObjectsTable(newTitles);
        setArrayObjectsContainerTable(newTitlesContainerTable);

        
    
    },[i18n.language])



    useEffect(()=>{

        if(Object.keys(trackInfo)?.length > 0 || trackInfo?.length > 0){
            try{
                //reset   setActiveContainerNoAuto(-1) to   setActiveContainerNoAuto(0)
                if( activeContainerNoAuto ===-1){
                    setActiveContainerNoAuto(0)
                    setActiveContainerNo(null)
                }
    
        
                //get current Transport Name from array apis ( resultAction first object ( station_set first))
                // const trackInfo = resultAction.payload; // Assuming the payload contains the track info
                const currentTransparentName = findObjectName(trackInfo?.containerdetails_set[0]?.station_set,trackInfo?.current_date);
    
    
    
                
    
                // console.log(trackInfo,"trackInfo",trackInfo) // trackInfo is empty here so need restAction
                const updatedBills = [...arrayObjectsTable];
                updateBillRow(updatedBills,0,currentTransparentName)
                updateBillRow(updatedBills,1,trackInfo?.General_type_goods)
                updateBillRow(updatedBills,2,trackInfo?.number_of_container)
                updateBillRow(updatedBills,3,trackInfo?.number_of_packages)
                updateBillRow(updatedBills,4,trackInfo?.Total_gross_weight)

                // Update the state with the new array
                setArrayObjectsTable(updatedBills);
    
    
                //reStrucher the array to be fit with arrayObjectPoints
                // more 2 ( 3 or more else no need details to draw)
                let arrayObjectPointsStrucher = trackInfo?.containerdetails_set[0]?.station_set;

                let objectLastLocation= getLastLocation(arrayObjectPointsStrucher);

                setLastLocation(prevState => ({
                    ...prevState,
                    stationName: objectLastLocation?.stationName,
                    stationArrivalDate : objectLastLocation?.stationArrivalDate
                }));

                arrayObjectPointsStrucher=  getStrucherArrayTrackPoints(arrayObjectPointsStrucher);
    
    
                // add initial Track Container for start and end 
                setInitialTrackContainer({
                    arrayObjectPoints:arrayObjectPointsStrucher, // accept null
                });
    
    
    
    
            let filterTypeStationTractArray = filterByStationType(trackInfo?.containerdetails_set[0]?.station_set,"رئيسي");
            //filterTypeStationTractArray.length -1 => number of paths 
            if((filterTypeStationTractArray.length -1) >=4 && isScreenWidthLess===true){
    
    
                filterTypeStationTractArray=   keepFirstAndLast(filterTypeStationTractArray)
                
                setShowIconLocation(true)
            }else{
                setShowIconLocation(false)
            }
            
            setTrackingPath(filterTypeStationTractArray);
    
            }catch(e){
    
                // console.log(e,"error")
    
            }

        }

    },[trackInfo])

    //Note : setQuertString not be null if input will change , but keep value , but no effect because it will render just useEffect with dependncy []
    useEffect(()=>{

        if(queryString){
            dispatch(fetchTrackInfo({query:queryString}))
        }else{
            dispatch(clearTrack())
        }

    },[dispatch,queryString])

    
    const updateBillRow = (array,index,value)=>{

        const updateBill = {
            ...array[index],
            value: value,
        };

       return array[index] = updateBill;

    }



    const handleToggle = (index,id,itemObject) => {

        if (activeContainerNo?.id === id ) {
            setActiveContainerNo(null);
        } else {
            setActiveContainerNo(itemObject);
        }

        // if(activeContainerNoAuto===0){
        //     if(index===0){
        //         setActiveContainerNo(null);
        //     }
        //     setActiveContainerNoAuto(-1)
        // }


        if(trackInfo?.assign_stations===false){
            return
        }else{
        
            //if empty will reset if got change before 
            if(itemObject?.station_set?.length > 0){

                let arrayObjectPointsStrucher = itemObject?.station_set;

                let objectLastLocation= getLastLocation(arrayObjectPointsStrucher);

                setLastLocation(prevState => ({
                    ...prevState,
                    stationName: objectLastLocation?.stationName,
                    stationArrivalDate : objectLastLocation?.stationArrivalDate
                }));


                //edit initilalTrack because there are multi tracks
                setInitialTrackContainer({

                    arrayObjectPoints:getStrucherArrayTrackPoints(arrayObjectPointsStrucher), // accept null
                    
            });

            // for tracking detail path
            let filterTypeStationTractArray = filterByStationType(itemObject?.station_set,"رئيسي")
        
            if((filterTypeStationTractArray.length -1) >=4 && isScreenWidthLess===true){


                filterTypeStationTractArray=   keepFirstAndLast(filterTypeStationTractArray);
                setShowIconLocation(true)

            }else{
                setShowIconLocation(false)
            }

            //for مسار التعقب
            setTrackingPath(filterTypeStationTractArray);

            //edit current transparentName is change depends on path 
            const currentTransparentName = findObjectName(itemObject?.station_set);
            
            // console.log(resultAction,"trackInfo",trackInfo) // trackInfo is empty here so need restAction
            const updatedBills = [...arrayObjectsTable];
            updateBillRow(updatedBills,0,currentTransparentName)

            // Update the state with the new array
            setArrayObjectsTable(updatedBills);


            setIsEditContainerTrack(true);

            }else{
                //to get initial data as initial track so need a value to check if got change in initail track when go to itemObject?.station_set?.length > 0 , so if got change retun to initial track ( gotchange ===true => change except no need to change )
                //return initail track with condition حتى ما كل مرة يعيد تنفذها
                if(isEditContainerTrack===true){
                    let arrayObjectPointsStrucher = trackInfo?.containerdetails_set[0]?.station_set;


                    let objectLastLocation= getLastLocation(arrayObjectPointsStrucher);

                    setLastLocation(prevState => ({
                        ...prevState,
                        stationName: objectLastLocation?.stationName,
                        stationArrivalDate : objectLastLocation?.stationArrivalDate
                    }));

                    //edit initilalTrack because there are multi tracks
                    setInitialTrackContainer({

                        arrayObjectPoints:getStrucherArrayTrackPoints(arrayObjectPointsStrucher),

                        
                });

                let filterTypeStationTractArray = filterByStationType(trackInfo?.containerdetails_set[0]?.station_set[0],"رئيسي")

                //filterTypeStationTractArray.length -1 => number of paths 
                if((filterTypeStationTractArray.length -1) >=4 && isScreenWidthLess===true){


                filterTypeStationTractArray=   keepFirstAndLast(filterTypeStationTractArray)
                setShowIconLocation(true)
                }else{
                    setShowIconLocation(false)
                }

                setTrackingPath(filterTypeStationTractArray);

                //reset (initial) current transparentName is change depends on path 
                const currentTransparentName = findObjectName(trackInfo?.containerdetails_set[0]?.station_set);
            
                // console.log(resultAction,"trackInfo",trackInfo) // trackInfo is empty here so need restAction
                const updatedBills = [...arrayObjectsTable];
                updateBillRow(updatedBills,0,currentTransparentName)

                // Update the state with the new array
                setArrayObjectsTable(updatedBills);


                setIsEditContainerTrack(false);

                }

            }

        }
    }

        const getStrucherArrayTrackPoints = (arrayPoints)=>{
        if (arrayPoints.length > 2) {

            // if delete first and last object : Now I reStrucher the array 
            const finishedStrucherArryPoints=arrayPoints.map((item,index)=>{

                if(index===0 || index ===arrayPoints.length -1 ){
                    return[item]
                }else{
                    return[
                        item,
                        item
                    ]
                }


            })

            arrayPoints = finishedStrucherArryPoints.flat();

        }

        return arrayPoints;
    }

    // Function to filter objects based on station_type being "رئيسي"
    function filterByStationType(array, valueFilter) {
    return array.filter(obj => obj.station_type === valueFilter);
}

const findObjectName = (array , cureentDate) => {
    const currentDate = new Date(cureentDate );
    
    for (let i = 0; i < array.length - 1; i++) {
       if (currentDate >= new Date(array[i]?.gatein_date) && currentDate <=  new Date(array[i + 1]?.gatein_date)) {
         return array[i]?.transportation_name;
       }
    }
    return  array[array.length - 1]?.transportation_name; // Return null if no object matches the criteria
   }



    const keepFirstAndLast = (array) => {
        // Check if there are more than two todos to avoid errors
        if (array.length > 2) {
           // Use slice to get the first and last todos
           return [array[0], array[array.length - 1]];
        }
       };
    const handleSubmit = async()=>{

        if(inputValue.current.value.trim()===''){
            return;
        }
        // alert(`${pathname}?track-number=${inputValue.current.value.trim()}`)

        navigate(`?track-number=${inputValue.current.value.trim()}`);

        try{


            dispatch(fetchTrackInfo({query:inputValue.current.value.trim()}))


        }catch(e){

            console.log(e,"error")

        }



    }



    const handleSubmitEnter = (event)=>{
        if (event.key === 'Enter') {
            handleSubmit();
          }
    }

    const handleSelect = (e)=>{
        try{

            e.target.select();

        }catch(e){

        }

    }

    const handleChangeText= (e)=>{

        // if(e.target.value.trim()==="")
        // navigate(`${pathname}`)

    }

    const newStyleSubCard = {
        justifyContent:' space-around',
    }

    return (
    <>
    <SEO 
      title={seoData.title}
      description={seoData.description}
      keywords={seoData.keywords}
      image="https://acrossmena.net/images/og-track.jpg"
      url="https://acrossmena.net/track"
      type="tool"
      lang={currentLang}
    />
    <main className='track'>


<HeroTool
image={Truck}
title={t('labelTrackPage.trackTitle')}
parag1={t('labelTrackPage.trackSubTitle1')}
parag2={t('labelTrackPage.trackSubTitle2')}
/>
         <MainContainer>

        <div className='track_form'>

      

            <input onClick={handleSelect} onChange={handleChangeText} onKeyDown={handleSubmitEnter} placeholder={t('labelTrackPage.placeholderSearch')}  ref={inputValue} type='text' className='track_form--text' />


            <button className='track_form--btn' onClick={handleSubmit}>
                {loadingTrack===false && t('actions.searchBtn')}
                <span className={`${loadingTrack && 'btn-ring'}`}></span>
        </button> 
        </div>

        {
        (trackInfo?.length > 0 || Object.keys(trackInfo)?.length > 0) ?
        <>

        <div className='track_card' style={{flexDirection:'column', padding:'50px 15px 40px 15px'}}>
        
        <div className='track_card__subcard'>
        <SubCardInfo>
        <FileIcon  className='track-subcard-main__info-icon'/>


            <div className='track-subcard-main__info-text'>
                <p className='track-subcard-main__info-text__title'>Bill of loading number</p>
                <p className='track-subcard-main__info-text__value'>
                    {
                        inputValue.current?.value
                    }
                </p>

            </div>

            <div className='track-subcard-main__line'>

            </div>

            <div className='track-subcard-from'>
                <p className='track-subcard-from__title'>
                    From
                </p>
                <p className='track-subcard-from__value'>
                    {
                        trackingPath[0]?.station_name
                    }
                </p>
                <p className='track-subcard-from__value'>
                {
                    trackingPath[0]?.gatein_date
                }
                </p>

            </div>

            <div className='track-subcard-to'>
                <p className='track-subcard-to__title'>
                    To
                </p>
                <p className='track-subcard-to__value'>
                    {
                        trackingPath[trackingPath?.length - 1]?.station_name
                    }
                </p>
                <p className='track-subcard-to__value'>
                    {
                    trackingPath[trackingPath?.length - 1]?.arrival_date

                    }
                </p>

            </div>

        </SubCardInfo>
        </div>

        <div className='track-card__progress'>
        <span className={`track-card__title ${i18n.language ==="en" ? "right__title" : "left__title"}`}>
        {t('labelTrackPage.trackingDeatils')}
        </span>

        <ProgressBars currentDateUTC={trackInfo?.current_date} isVertical={false} styleProgressHorizantal={styleProgressHorizantal} currentTransportName={arrayObjectsTable[0]?.value} trackingPath={trackingPath} showIconLocation={showIconLocation} iconsTransportations={trackInfo?.shipment_type?.images}/>

        </div>

        </div>

        <section className='track-layout'>
        
        <section className='track-layout__right'>
        <div className='track_card' style={{direction: i18n.language==="en" ? 'ltr' :'rtl'}}>
        <span className={`track-card__title ${i18n.language ==="en" ? "right__title" : "left__title"}`}>
            {t('labelTrackPage.billDeatils')}
            </span>

            <TrackTabelDetails arrayObjects={arrayObjectsTable} />

        </div>

        <div className='track_card track_card--container-padding' style={{direction: i18n.language==="en" ? 'ltr' : 'rtl'}}>
        <span className={`track-card__title ${i18n.language ==="en" ? "right__title" : "left__title"}`}>
        {t('labelTrackPage.containersTable')}
        </span>

        {

            <div className="track-accordion__parent">
                    
                    {Object.keys(trackInfo)?.length >1 &&
                    trackInfo?.containerdetails_set.map((itemObject, index) => {
                        return (
                            <AccordionItem assign_stations={trackInfo?.assign_stations} updateBillRow={updateBillRow} arrayObjectsContainerTable={arrayObjectsContainerTable} setArrayObjectsContainerTable={setArrayObjectsContainerTable} activeContainerNoAuto={activeContainerNoAuto} index ={index} key={index} activeAuto={index} active={activeContainerNo} handleToggle={handleToggle} itemObject={itemObject} />
                            )
                        })
                    }
            </div>
                
        }

        </div>

        </section>


        <section className='track-layout__left'>
        <div className='track_card' style={{flexDirection:'column'}}>
        
        <div className='track_card__subcard'>
        <SubCardInfo style={newStyleSubCard}>

            <div className='track_card__subcard-left'>
            <p className='track_card__subcard-left__title' style={{direction : i18n.language ==="en" ? 'ltr':'rtl'}}>
                <DateIcon/>
                {
                    t('labelTrackPage.estimatedDate')
                }
            </p>
            <p className='track_card__subcard-left__text' style={{direction : i18n.language ==="en" ? 'ltr':'rtl'}}  >
                {
                    initialTrackContainer?.arrayObjectPoints &&
                    initialTrackContainer?.arrayObjectPoints[initialTrackContainer?.arrayObjectPoints?.length - 1]?.arrival_date
                }
            </p>

            </div>

            <div className='track_card__subcard-line'></div>

            <div className='track_card__subcard-right'>
                <p className='track_card__subcard-right__title' style={{direction : i18n.language ==="en" ? 'ltr':'rtl'}} >
                    <LocationIcon/>
                    {
                    t('labelTrackPage.lastLocation')
                }
                </p>
                <div className='track_card__subcard-right__text' style={{flexWrap : i18n.language ==="en" && 'wrap' ,justifyContent : i18n.language ==="en" ? '':'flex-end'}}  >
                    <div>
                    <span>
                        Gate in -
                    </span>
                    
                    <span>
                    {lastLocation?.stationName}
                    </span>

                    </div>

                    <span style={{margin:'0px 6px'}}>
                    {lastLocation?.stationArrivalDate}
                    </span>

                </div>
            </div>
        </SubCardInfo>
        </div>
        
        <span className={`track-card__title ${i18n.language ==="en" ? "right__title" : "left__title"}`}>
            {t('labelTrackPage.containersDetails')}
        </span>

        <ProgressBars currentDateUTC={trackInfo?.current_date}  isVertical={true} styleProgressVertical={styleProgressVertical}  currentTransportName={arrayObjectsTable[0]?.value} trackingPath={initialTrackContainer?.arrayObjectPoints} showIconLocation={showIconLocation} />


        </div>
        </section>



        </section>

        </>:
        (loadingTrack===false && trackInfo?.length === 0 ) &&
        
        <div className='no-result__track'>
        <img className='no-result__icon' src={noResultsIcon} alt='no result icon' />

        <h2 style={{color:'#717171' , fontWeight:'normal'}}>{t('labelProhibitedPage.noResults')}
        </h2>
        <div>
        <span style={{margin:'0px 5px', color:'#717171'}}>{t('labelTrackPage.forgetNumber')}</span>
        <a className='no-result__link' href={`${i18n.language ==="en" ? "https://acrossmena.net/en/contact-us" : "https://acrossmena.net/contact-us"}`} >
            {t('labelNavbar.contact')}
        </a>
        </div>

        </div>

    }



        <></>


{/* 
<p className='valur'>Our Value Added Service Include</p>

<div className='card-container'>

<FeatureCard
icon={Box}
text={t('labelTrackPage.cardTrack1')}
/>
<FeatureCard
icon={Ship}
text={t('labelTrackPage.cardTrack2')}
/>
<FeatureCard
icon={Map}
text={t('labelTrackPage.cardTrack3')}
/>
</div>
        {
        (trackInfo?.length > 0 || Object.keys(trackInfo)?.length > 0) ?
        <>

        <div className='track_card' style={{flexDirection:'column', padding:'50px 15px 40px 15px'}}>
        
        <div className='track_card__subcard'>
        <SubCardInfo>
        <FileIcon  className='track-subcard-main__info-icon'/>


            <div className='track-subcard-main__info-text'>
                <p className='track-subcard-main__info-text__title'>Bill of loading number</p>
                <p className='track-subcard-main__info-text__value'>
                    {
                        inputValue.current?.value
                    }
                </p>

            </div>

            <div className='track-subcard-main__line'>

            </div>

            <div className='track-subcard-from'>
                <p className='track-subcard-from__title'>
                    From
                </p>
                <p className='track-subcard-from__value'>
                    {
                        trackingPath[0]?.station_name
                    }
                </p>
                <p className='track-subcard-from__value'>
                {
                    trackingPath[0]?.gatein_date
                }
                </p>

            </div>

            <div className='track-subcard-to'>
                <p className='track-subcard-to__title'>
                    To
                </p>
                <p className='track-subcard-to__value'>
                    {
                        trackingPath[trackingPath?.length - 1]?.station_name
                    }
                </p>
                <p className='track-subcard-to__value'>
                    {
                    trackingPath[trackingPath?.length - 1]?.arrival_date

                    }
                </p>

            </div>

        </SubCardInfo>
        </div>

        <div className='track-card__progress'>
        <span className={`track-card__title ${i18n.language ==="en" ? "right__title" : "left__title"}`}>
        {t('labelTrackPage.trackingDeatils')}
        </span>

        <ProgressBars currentDateUTC={trackInfo?.current_date} isVertical={false} styleProgressHorizantal={styleProgressHorizantal} currentTransportName={arrayObjectsTable[0]?.value} trackingPath={trackingPath} showIconLocation={showIconLocation} iconsTransportations={trackInfo?.shipment_type?.images}/>

        </div>

        </div>

        <section className='track-layout'>
        
        <section className='track-layout__right'>
        <div className='track_card' style={{direction: i18n.language==="en" ? 'ltr' :'rtl'}}>
        <span className={`track-card__title ${i18n.language ==="en" ? "right__title" : "left__title"}`}>
            {t('labelTrackPage.billDeatils')}
            </span>

            <TrackTabelDetails arrayObjects={arrayObjectsTable} />

        </div>

        <div className='track_card track_card--container-padding' style={{direction: i18n.language==="en" ? 'ltr' : 'rtl'}}>
        <span className={`track-card__title ${i18n.language ==="en" ? "right__title" : "left__title"}`}>
        {t('labelTrackPage.containersTable')}
        </span>

        {

            <div className="track-accordion__parent">
                    
                    {Object.keys(trackInfo)?.length >1 &&
                    trackInfo?.containerdetails_set.map((itemObject, index) => {
                        return (
                            <AccordionItem assign_stations={trackInfo?.assign_stations} updateBillRow={updateBillRow} arrayObjectsContainerTable={arrayObjectsContainerTable} setArrayObjectsContainerTable={setArrayObjectsContainerTable} activeContainerNoAuto={activeContainerNoAuto} index ={index} key={index} activeAuto={index} active={activeContainerNo} handleToggle={handleToggle} itemObject={itemObject} />
                            )
                        })
                    }
            </div>
                
        }

        </div>

        </section>


        <section className='track-layout__left'>
        <div className='track_card' style={{flexDirection:'column'}}>
        
        <div className='track_card__subcard'>
        <SubCardInfo style={newStyleSubCard}>

            <div className='track_card__subcard-left'>
            <p className='track_card__subcard-left__title' style={{direction : i18n.language ==="en" ? 'ltr':'rtl'}}>
                <DateIcon/>
                {
                    t('labelTrackPage.estimatedDate')
                }
            </p>
            <p className='track_card__subcard-left__text' style={{direction : i18n.language ==="en" ? 'ltr':'rtl'}}  >
                {
                    initialTrackContainer?.arrayObjectPoints &&
                    initialTrackContainer?.arrayObjectPoints[initialTrackContainer?.arrayObjectPoints?.length - 1]?.arrival_date
                }
            </p>

            </div>

            <div className='track_card__subcard-line'></div>

            <div className='track_card__subcard-right'>
                <p className='track_card__subcard-right__title' style={{direction : i18n.language ==="en" ? 'ltr':'rtl'}} >
                    <LocationIcon/>
                    {
                    t('labelTrackPage.lastLocation')
                }
                </p>
                <div className='track_card__subcard-right__text' style={{flexWrap : i18n.language ==="en" && 'wrap' ,justifyContent : i18n.language ==="en" ? '':'flex-end'}}  >
                    <div>
                    <span>
                        Gate in -
                    </span>
                    
                    <span>
                    {lastLocation?.stationName}
                    </span>

                    </div>

                    <span style={{margin:'0px 6px'}}>
                    {lastLocation?.stationArrivalDate}
                    </span>

                </div>
            </div>
        </SubCardInfo>
        </div>
        
        <span className={`track-card__title ${i18n.language ==="en" ? "right__title" : "left__title"}`}>
            {t('labelTrackPage.containersDetails')}
        </span>

        <ProgressBars currentDateUTC={trackInfo?.current_date}  isVertical={true} styleProgressVertical={styleProgressVertical}  currentTransportName={arrayObjectsTable[0]?.value} trackingPath={initialTrackContainer?.arrayObjectPoints} showIconLocation={showIconLocation} />


        </div>
        </section>



        </section>

        </>:
        (loadingTrack===false && trackInfo?.length === 0 ) &&
        
        <div className='no-result__track'>
        <img className='no-result__icon' src={noResultsIcon} alt='no result icon' />

        <h2 style={{color:'#717171' , fontWeight:'normal'}}>{t('labelProhibitedPage.noResults')}
        </h2>
        <div>
        <span style={{margin:'0px 5px', color:'#717171'}}>{t('labelTrackPage.forgetNumber')}</span>
        <a className='no-result__link' href={`${i18n.language ==="en" ? "https://acrossmena.net/en/contact-us" : "https://acrossmena.net/contact-us"}`} target='_blacnk'>
            {t('labelNavbar.contact')}
        </a>
        </div>

        </div>

    } */}

        </MainContainer>


        <>

<a style={{display:'none'}} href='tel:+00963415060'> 
  00963415060
  </a>

  <a style={{display:'none'}} href='tel:+00963944506000'> 
  00963944506000
  </a>

  <a style={{display:'none'}} href='mailto:info@acrossmena.com'> 
  info@acrossmena.com
  </a>

  <a style={{display:'none'}} href='https://acrossmena.net/track'> 
  https://acrossmena.net/track
  </a>

        </>


    </main>
    </>

    )
}

export default Track
