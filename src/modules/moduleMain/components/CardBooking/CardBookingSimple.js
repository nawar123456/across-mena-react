import './CardBookingSimple.css';
import {ReactComponent as ArrowDownIcon}  from '../../../../assets/icons/arrow_down_view.svg';
import {ReactComponent as ShipIcon}  from '../../../../assets/icons/ship_days.svg';
import {ReactComponent as MenaIcon}  from '../../../../assets/icons/mena_mersat.svg';
import { CiWarning } from "react-icons/ci";

import TimeLine from '../TimeLine/TimeLine';
import CardDetails from './CardDetails';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addBookingObject,setShouldClearForm ,setGlobalOceanFreight} from '../../store/home/home.slice';
import { useTranslation } from 'react-i18next';
import { getCurrency } from '../../../../utils/portUtils';
import TimeLineSimple from '../TimeLine/TimeLineSimple';
import { useDispatch, useSelector } from 'react-redux';

const CardBookingSimple = ({item,portsObject,image,index,setCardsPrice,onSelect,isPreviewMode = false }) => {

    const {
        bookingObject
    } = useSelector((state) => state.moduleMain.homeSlice);


  const [detailsVisible, setDetailsVisible] = useState({});
  const [calculatedOceanFreight, setCalculatedOceanFreight] = useState(item.ocean_freight); // Default to original ocean_freight
  let newOceanFreight = calculatedOceanFreight;
  const [isTripVisible, setIsTripVisible] = useState(true);
  const tripDate = new Date(item.date);
  const currentDate = new Date(); // Or replace this with the "daily date" if available

  // Calculate the difference in time and convert to days
  const timeDifference = tripDate - currentDate;
  const dayDifference = timeDifference / (1000 * 60 * 60 * 24); // Milliseconds to days

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {t , i18n} = useTranslation();
  const [euroValue, setEuroValue] = useState(null);
const [euroFreight, setEuroFreight] = useState(null);

  const {
    loadingForm,
    // postAppointmentForm,
    // errorAppointmentForm

} = useSelector((state) => state.moduleMain.homeSlice);
let ocean_freight2=item.ocean_freight;
const currency = getCurrency(portsObject?.portFrom, portsObject?.portTo);


useEffect(() => {
    // Parse `item.date` and the current date
    // const tripDate = new Date(item.date);
    // const currentDate = new Date(); // Or replace this with the "daily date" if available

    // // Calculate the difference in time and convert to days
    // const timeDifference = tripDate - currentDate;
    // const dayDifference = timeDifference / (1000 * 60 * 60 * 24); // Milliseconds to days

    // Update visibility based on the difference
     setIsTripVisible(dayDifference >= 2);
        setIsTripVisible(dayDifference > 0 && dayDifference < 3);

  }, [item.date]);

  useEffect(() => {
  console.log("📦 Full item object:", item);
    // console.log("📦 Full item sold:", item.sold_out);

}, [item]);

if ((dayDifference > 0 && dayDifference < 3) || item.sold_out === true || item.solds_out === true ) {
        // Continue rendering the card, but with a red background for the button
        return (
            <div className='card-book_item'>

                <div className='row_1'>
                    <div className='item_img'>{image}</div>

                    <section
                        className='item_timeline_simple'
                        style={{ direction: i18n.language === "ar" ? "ltr" : "rtl" }}
                    >
                        <TimeLineSimple
                        currency={currency}
        price={calculatedOceanFreight}
                          reverseIcons={true}
                          visible={false}
                          startDate={item.date}
                          endDate={item.end_date}
                          portTitleFrom
                          portTitleTo
                          cityFrom={portsObject?.portTo}
                          cityTo={portsObject?.portFrom}
                          numberStations={item.number_of_station}
                          numberDays={item.number_of_day}
                        />
                    </section>

                <p style={{color:'#0d3453',whiteSpace:'nowrap'}} className='warning-offer-all'>
                    <div className='sold-and-warning'> <span>Sold out </span> <span className='warningSoldout-only'><CiWarning/> </span>

                    </div>
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

const handleBooking = (item) => {
  console.log("🚀 [CardBookingSimple] onSelect موجود؟", typeof onSelect === 'function');
  
  // ✅ نحسب السعر النهائي
  let finalPrice = item.ocean_freight;
  if (item.checkedOrigin) {
    finalPrice += Number(item.port_of_origin);
  }
  if (item.checkedDistanation) {
    finalPrice += Number(item.port_of_discharge);
  }

  // ✅ نُنشئ كائن جديد مع السعر النهائي
  const tripWithFinalPrice = {
    ...item,
    finalOceanFreight: finalPrice, // ✅ نحفظ السعر النهائي
  };

  if (onSelect) {
    onSelect(tripWithFinalPrice); // ✅ نُرسل السعر النهائي
  }

  setCalculatedOceanFreight(newOceanFreight);
  dispatch(setGlobalOceanFreight(newOceanFreight));
  dispatch(addBookingObject(item));
  dispatch(setShouldClearForm(true));
};
if(dayDifference>0)
  return (
    <div className='card-book_item'>
{/* {console.log('above-button',item.pickup)}
{console.log('ميناء التفريغ',item.port_of_discharge)}
{console.log('ميناء التحميل',item.port_of_origin)}
{console.log('الاساسي',item.ocean_freight)}
{console.log('الاساسي',item)} */}
{console.log('bookingObject:',bookingObject)}
<div  className='per-container'>  per {bookingObject.container?.toString().toUpperCase().replace('FT', ` FT`)}</div>
      <div className='row_1'>

      <div className='item_img'>
        {image}
      </div>

      <section className='item_timeline_simple' style={{direction: i18n.language==="ar"? 'ltr' : 'rtl'}}>

        <TimeLineSimple
        currency={currency}
        price={item.finalOceanFreight || calculatedOceanFreight} // ✅ نستخدم السعر النهائي
        visible={true}
        startDate={item.date}
        endDate={item.end_date}
        portTitleFrom
        portTitleTo
        cityFrom={portsObject?.portTo}
        cityTo={portsObject?.portFrom}
        numberStations={item.number_of_station}
        numberDays={item.number_of_day}/>
      </section>

 <div className='item_booking'>
            {/* ✅ إذا لم نكن في وضع المعاينة — نعرض زر "اختر الرحلة" */}
            {!isPreviewMode && (
              <>
                <button
                  disabled={loadingForm}
                  className='booking_btn_simple'
                  onClick={() => handleBooking(item)}
                  style={{ background: '#fcc400' }}
                >
                  <span className="button-hover">
                    {t('actions.chooseTrip')}
                    <span className={`${loadingForm && 'btn-ring'}`}></span>
                  </span>
                </button>

                <div className='booking-details' onClick={() => toggleDetails(index)}>
                  <ArrowDownIcon className={`details-icon ${detailsVisible[index] ? 'rotated' : ''} `} />
                  <span className='details-title'>
                    {t('actions.showdetails')}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* ✅ إذا لم نكن في وضع المعاينة — نعرض التفاصيل */}
        {!isPreviewMode && detailsVisible[index] && (
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
            <CardDetails
              Icon={<ShipIcon />}
              infoTitle={t('bookingTitles.labelOriginFright')}
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
                infoTitle={t('bookingTitles.labelPortDistanition')}
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


export default CardBookingSimple
