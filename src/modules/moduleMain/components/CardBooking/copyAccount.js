import './CardBooking.css';
import {ReactComponent as ArrowDownIcon}  from '../../../../assets/icons/arrow_down_view.svg';
import {ReactComponent as ShipIcon}  from '../../../../assets/icons/ship_days.svg';
import {ReactComponent as MenaIcon}  from '../../../../assets/icons/mena_mersat.svg';

import TimeLine from '../TimeLine/TimeLine';
import CardDetails from './CardDetails';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addBookingObject,setShouldClearForm ,setGlobalOceanFreight} from '../../store/home/home.slice';
import { useDispatch,useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import FormNoResults from '../FormNoResults/FormNoResults';

const CardBooking = ({item,portsObject,image,index,setCardsPrice}) => {

	const {
		globalOceanFreight,
		bookingObject
	} = useSelector((state) => state.moduleMain.homeSlice);


  const [detailsVisible, setDetailsVisible] = useState({});
  const [calculatedOceanFreight, setCalculatedOceanFreight] = useState(item.ocean_freight); // Default to original ocean_freight
  let newOceanFreight = calculatedOceanFreight;
  const [isTripVisible, setIsTripVisible] = useState(true);
  const [tripVisibleCount, setTripVisibleCount] = useState(0); // Counter for `true` values

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {t , i18n} = useTranslation();
  const {
	loadingForm,
	// postAppointmentForm,
	// errorAppointmentForm

} = useSelector((state) => state.moduleMain.homeSlice);
let ocean_freight2=item.ocean_freight;


useEffect(() => {
    // Parse `item.date` and the current date
    const tripDate = new Date(item.date);
    const currentDate = new Date(); // Or replace this with the "daily date" if available

    // Calculate the difference in time and convert to days
    const timeDifference = tripDate - currentDate;
    const dayDifference = timeDifference / (1000 * 60 * 60 * 24); // Milliseconds to days

    // Update visibility based on the difference
	const visibility = dayDifference >= 2; // Determine visibility
    setIsTripVisible(visibility);

  if (visibility) {
	setTripVisibleCount((prevCount) => prevCount + 1);
  }
}, [item.date]);


  if (!isTripVisible ) {
		// Continue rendering the card, but with a red background for the button
		return (
			<div className='card-book_item'>

				<div className='row_1'>
					<div className='item_img'>{image}</div>

					<section
						className='item_timeline'
						style={{ direction: i18n.language === "ar" ? "ltr" : "rtl" }}
					>
						<TimeLine
						  notVisible={false}
						  startDate={item.date}
						  endDate={item.end_date}
						  portTitleFrom={t("labelServices.discharge")}
						  portTitleTo={t("labelServices.loading")}
						  cityFrom={portsObject?.portTo}
						  cityTo={portsObject?.portFrom}
						  numberStations={item.number_of_station}
						  numberDays={item.number_of_day}
						/>
					</section>

				<p style={{color:'#0d3453',whiteSpace:'nowrap'}}>
					No offer currently available
				</p>
				</div>

				{detailsVisible[index] && (
					<div className='row_2'>
						{item.port_of_origin !== 0 && (
							<CardDetails
								isStyleIcon={"details_info-icon2"}
								Icon={<MenaIcon />}
								field={"checkedOrigin"}
								toggleChecked={toggleChecked}
								infoTitle={t("bookingTitles.labelPortOrigin")}
								priceOrigin={item.port_of_origin}
								index={index}
								checkedValue={item.checkedOrigin}
							/>
						)}
						<CardDetails
							Icon={<ShipIcon />}
							infoTitle={t("bookingTitles.labelOriginFright")}
							priceOcean={item.ocean_freight}
							index={index}
							checkedValue={true}
						/>

						{item.port_of_discharge !== 0 && (
							<CardDetails
								isStyleIcon={"details_info-icon2"}
								Icon={<MenaIcon />}
								field={"checkedDistanation"}
								toggleChecked={toggleChecked}
								infoTitle={t("bookingTitles.labelPortDistanition")}
								priceDistantion={item.port_of_discharge}
								index={index}
								checkedValue={item.checkedDistanation}
							/>
						)}
					</div>
				)}
			</div>
		);
	}

const toggleDetails = (index) => {
	setDetailsVisible((prevDetails) => {
		return {
			...prevDetails,
			[index]: !prevDetails[index], // Toggle visibility for the clicked button
		};
	});
};

const toggleChecked = (index, valueChecked, field) => {
	setCardsPrice((prevCards) => {
		const updatedCards = [...prevCards];

		// Create a new variable for ocean freight
		// let newOceanFreight = calculatedOceanFreight;

		// Assuming you want to toggle the 'checked' property
		if (field === 'checkedOrigin') {
			if (!valueChecked) {
				newOceanFreight += Number(updatedCards[index].port_of_origin);
			} else {
				newOceanFreight -= Number(updatedCards[index].port_of_origin);
			}
			updatedCards[index] = { ...updatedCards[index], checkedOrigin: !valueChecked };
		}

		if (field === 'checkedDistanation') {
			if (!valueChecked) {
				newOceanFreight += Number(updatedCards[index].port_of_discharge);
			} else {
				newOceanFreight -= Number(updatedCards[index].port_of_discharge);
			}
			updatedCards[index] = { ...updatedCards[index], checkedDistanation: !valueChecked };
		}

		// Update the calculated ocean freight state variable
		setCalculatedOceanFreight(newOceanFreight);

		// dispatch(setGlobalOceanFreight(newOceanFreight));

		return updatedCards;
	});
};


  const handleBooking = (item)=>{

	 setCalculatedOceanFreight(newOceanFreight);
	dispatch(setGlobalOceanFreight(newOceanFreight));
		dispatch(addBookingObject(item));
    dispatch(setShouldClearForm(true));
		  navigate('add-book')
			window.scrollTo({
				top: 0,
				behavior: "smooth",
			});
}

if(tripVisibleCount!==0 && isTripVisible==true){
  return (
    <div className='card-book_item'>
{/* {console.log('above-button',item.pickup)}
{console.log('ميناء التفريغ',item.port_of_discharge)}
{console.log('ميناء التحميل',item.port_of_origin)}
{console.log('الاساسي',item.ocean_freight)}
{console.log('الاساسي',item)} */}
{console.log('bookingObject:',bookingObject)}
{console.log('accountTrips:',tripVisibleCount)}

<div  className='per-container'>  per {bookingObject.container?.toString().toUpperCase().replace('FT', ` FT`)}</div>
      <div className='row_1'>

      <div className='item_img'>
        {image}
      </div>

      <section className='item_timeline' style={{direction: i18n.language==="ar"? 'ltr' : 'rtl'}}>

        <TimeLine
		notVisible={true}
		startDate={item.date}
		endDate={item.end_date}
		portTitleFrom={t('labelServices.discharge')}
		portTitleTo={t('labelServices.loading')}
		cityFrom={portsObject?.portTo}
		cityTo={portsObject?.portFrom}
		numberStations={item.number_of_station}
		numberDays={item.number_of_day}/>
      </section>

      <div className='item_booking'>
			<span className='btn_value' style={{display:'flex',justifyContent: 'center',color: '#0D3453', fontWeight:'bold',margin:'-33px -15px 4px 15px',columnGap:'1.5px',fontFamily:' var(--font-family-ar-primary)'}}>
          <div fontSize style={{fontFamily:'var(--font-family-ar-primary)',alignSelf:'center',fontSize:'0.7rem'}}>USD</div>
		   {calculatedOceanFreight}
        </span>
        <button   disabled={loadingForm} className='booking_btn' onClick={()=>handleBooking(item)} style={{background:  '#fcc400' }}>

        <span className="button-hover">
          {t('actions.buttonBook')}
		              <span className={`${loadingForm && 'btn-ring'}`}></span>

        </span>

        </button>

        <div className='booking-details' onClick={()=>toggleDetails(index)}>

          <ArrowDownIcon className={`details-icon ${detailsVisible[index] ? 'rotated':''} `}/>
          <span className='details-title'>
          {t('actions.showdetails')}
          </span>

        </div>
				</div>
      </div>

      {detailsVisible[index] &&
      <div className='row_2'>

    {item.port_of_origin !== 0 && (
      <CardDetails
        isStyleIcon={"details_info-icon2"}
        Icon={<MenaIcon />}
        field={"checkedOrigin"}
        toggleChecked={toggleChecked}
        infoTitle={t('bookingTitles.labelPortOrigin')}
        priceOrigin={item.port_of_origin}
        index={index}
        checkedValue={item.checkedOrigin}
      />
    )}
		<CardDetails  Icon={<ShipIcon/>} infoTitle={t('bookingTitles.labelOriginFright')} priceOcean={item.ocean_freight} index={index} checkedValue={true}  />

		{item.port_of_discharge !== 0 &&(
        <CardDetails isStyleIcon={"details_info-icon2"} Icon={<MenaIcon/>} field={"checkedDistanation"} toggleChecked={toggleChecked}  infoTitle={t('bookingTitles.labelPortDistanition')} priceDistantion={item.port_of_discharge} index={index} checkedValue={item.checkedDistanation}

		/>
    )}
		  </div>
      }

    </div>
  )
}
if(tripVisibleCount===0 && isTripVisible===false){
	return(
		<>
		{console.log('accountTripsFormNoResult:',tripVisibleCount)}

	<FormNoResults/>
	</>
	)
}
}

export default CardBooking
