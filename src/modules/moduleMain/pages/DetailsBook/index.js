import { MainContainer } from '../../../../components';
import CardItem from '../../components/DetailsBookPage/CardItem/CardItem';
import TimeLine from '../../components/TimeLine/TimeLine';
import {postBooking} from '../../store/home/home.action';
import { addDetailsBookObject, addPersonalsObject,setFormData,setSelectedCommodity,setShouldClearForm  } from '../../store/home/home.slice';

import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import TimelineBooking from '../../components/TimelineBooking/TimelineBooking';
import logo from '../../../../assets/icons/last_logo_navbar.svg'
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import ShipmentDetailsCard from './ShipmentDetailsCard';
import BookingWays from './BookingWays';
import PriceCard from './PriceCard';

const DetailsBook = () => {

	const {
    globalOceanFreight,
} = useSelector((state) => state.moduleMain.homeSlice);

  const {t,i18n} = useTranslation();
  const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
  const [isTextHidden, setIsTextHidden] = useState(false);

	const handleCheckboxChange = (e) => {
		setIsCheckboxChecked(e.target.checked); // Update state when the checkbox changes
	};
 const selectedContainer = useSelector((state) => state.moduleServices.seaFormSlice);


	const openModal = () => {
		setIsModalOpen(true);
		document.body.style.overflow = 'hidden'; // Disable background scrolling

};

const closeModal = () => {
		setIsModalOpen(false);
		document.body.style.overflow = 'auto'; // Re-enable background scrolling
  };


	const handleBackClick = () => {
    const lang = i18n.language; // Get the current language from i18n
    const targetUrl = `/${lang}/results-book/add-book`;
    navigate(targetUrl);
  };
	function removeTrailingComma(str) {
		return str?.endsWith(',') ? str.slice(0, -1) : str;
	}


  const {
    portsObject,
    bookingObject,
    detailsBookObject,
    userInfo,
    loadingForm,
    // errorForm ,
    // postForm,

} = useSelector((state) => state.moduleMain.homeSlice);
const dispatch = useDispatch();

// console.log(bookingObject,"bookingdetails")

const handleSubmitBooking = ()=>{
  setIsTextHidden(true); // Hide the text when button is clicked
	setIsSubmitted(true); // Change button background to red
console.log('isSubm',isSubmitted)
setTimeout(() => {
  setIsTextHidden(false); // Optionally show the text again after processing
}, 3500);

	const referenceNumber = detailsBookObject.refernceNumber
	? detailsBookObject.refernceNumber.toUpperCase()
	: "---";
	let ComnmunicationMethod = "";

	if(detailsBookObject.checkboxGmail)
	ComnmunicationMethod = ` ${t('labelServices.email')} ,`;
	if(detailsBookObject.checkboxWhatsapp)
	ComnmunicationMethod +=` ${t('labelServices.placeholderWhatsapp')} ,`;
	if(detailsBookObject.checkboxPhone)
	ComnmunicationMethod +=` ${t('labelServices.numberPhone')} `;
 let myCommunicationMethodEdit = removeTrailingComma(ComnmunicationMethod);
  let postParamObject = {
    direction: "export",
    shipping_service: "port to port",
    station_origin: (portsObject.portFrom).toString(),
    station_delivery: (portsObject.portTo).toString(),
    ocean_freight: (bookingObject.ocean_freight).toString(),
    port_of_origin: (bookingObject.port_of_origin).toString(),
    port_of_destination: (bookingObject.port_of_discharge).toString(),
    total_price: (globalOceanFreight).toString(),
		// total_price2: (bookingObject.calculatedOceanFreight).toString(),
    date:(bookingObject.date).toString() ,
    end_date: (bookingObject.end_date).toString(),
    number_of_day: (bookingObject.number_of_day).toString(),
    commodity: (detailsBookObject.textCommodity).toString(),
		commodity_description:(detailsBookObject.descriptionBook).toString(),
		weight: parseFloat(detailsBookObject.textWeight.replace(/,/g, '')),
    // containers_details: (bookingObject.container + " container").toString() ,
    reference_number: (detailsBookObject.refernceNumber).toString()?.toUpperCase(),
    email: (detailsBookObject.email).toString(),
		full_name:  (detailsBookObject.sender_name).toString(),
    phone_number:(detailsBookObject.phone_number).toString(),
    //   email:       ( userInfo.textPersonEmail).toString(),
		contact_method: (detailsBookObject.Communication_method).toString(),
    container_number: selectedContainer.selectedContainer.toString(), // ✅ New
    container_size: bookingObject.container.toString(),
		// let paramObject = {
		// 	sender_name: formNoResults.textPersonName,
		// 	phone_number: "+"+formNoResults.textPhoneNumber,
		// 	email: formNoResults.textPersonEmail,
		// 	Communication_method: myCommunicationMethodEdit,
		// }
		// 	dispatch(postAppointment(paramObject))

}
// console.log(portsObject.sender_name)
// data send to Backwnd//
  dispatch(postBooking(postParamObject));
  console.log('Send Data Confirm :',postParamObject)





}


  return (
<>
<div class="container">
<button
      className="back-button"
      style={
				{ direction: 'ltr' }}
      onClick={handleBackClick}
    >
      <span className="arrow">{'<'}</span>
      <span>{t('actions.back')}</span>
    </button>

    </div>
    <div className='parent-details-book'>
{/* {console.log((detailsBookObject.sender_name))}
{console.log((detailsBookObject.email))}
{console.log((detailsBookObject.phone_number))}
{console.log((detailsBookObject.contact_method))}
{console.log((detailsBookObject.textCommodity))} */}

    <MainContainer>
            <div className='timeline-Container-DetailsBook'>
    <TimeLine
             reverseIcons={false}
						  visible={true}
             numberStation={bookingObject.number_of_station} 
             containerType={bookingObject.container} 
             TotalPickUp={bookingObject.pickup} 
             endDate={bookingObject.end_date} 
             startDate={bookingObject.date} 
             numberDays={bookingObject.number_of_day} 
              cityFrom={portsObject?.portFrom}
						  cityTo={portsObject?.portTo}
            />
       </div>
    <div className='parent-mobile-details-book'>


    <ShipmentDetailsCard
    date={bookingObject.date}
    end_date={bookingObject.end_date}
    commodity={detailsBookObject.textCommodity}
    containers_details=  {`${selectedContainer.selectedContainer}X
	${bookingObject.container?.toString().toUpperCase().replace('FT', ` FT`)}`}
    reference_number={detailsBookObject.refernceNumber}
    weight={detailsBookObject.textWeight}
    commodity_description={detailsBookObject.descriptionBook}
        />  
    <BookingWays
    total_price={globalOceanFreight}
    full_name={detailsBookObject.sender_name}
    email={detailsBookObject.email}
    phone_number={detailsBookObject.phone_number}
    />
 

           {/* <PriceCard 
    total_price={globalOceanFreight}
    /> */}

      {/* <section className='details-book__card'>

      <p className='details-book__card-title' >
      {t('bookingTitles.labelYourEmail')}
      </p>

      <CardItem title={t('bookingTitles.labelEmail')}  info={userInfo.emailUser} styleInfo={{}} styleTitle={{}}/>
      </section> */}




            {/* <div className='details-book__footer-inputs'> */}

</div>


{/* </div> */}

    </MainContainer>


    </div>
		<div class="booking-container">
    {/* <div className="logo">
        <img src={logo} alt="Across MENA Trade Logistics"/>
    </div> */}
    <div class="terms">
        <input type="checkbox" checked={isCheckboxChecked} id="termsCheckbox"  onChange={handleCheckboxChange}  style={{width:'18px',height:'18px'}}/>
        <label for="termsCheckbox" style={{color:'#0D3453',fontWeight:'normal',fontSize:'16px'}}>{t('bookingTitles.agree')} <a href="#" style={{bold:'bold'}} onClick={(e) => { e.preventDefault(); openModal(); }}>{t('termServices.termOfServices')}</a>
                </label>
            </div>


            <button
						className="confirm-button"
						// style={{ backgroundColor: isSubmitted ? "#eaeaea" : "#fcc400" }}
					//	 من خلال المتحول از سبميتد
					//    حلوة الفكرة بس اضغط على زر التأكيد غير خلفية اللون تبع زر التأكيد
						onClick={handleSubmitBooking}>
					    {!isTextHidden && <p>{t('actions.buttonConfirm')}</p>}

							<span className={`${loadingForm && 'btn-ring'}`}></span>
							 </button>
            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{direction:'var(--dir-normal)'}}>


<h2>{t('termServices.termOfServices')} </h2>


<p>
{t('termServices.title0')}
</p>
<h3> {t('termServices.defintions')} </h3>

<p>
	{t('termServices.p0')}
</p>


<h3>{t('termServices.title1')} </h3>
<p>
{t('termServices.p1')} </p>

<h3>
{t('termServices.title2')}
</h3>
<button onClick={closeModal} className='close-TermServices-BookingDetails' style={{display:'none'}} >{t('actions.buttonclose')}</button>

<p>
{t('termServices.p2')}

</p>


<h3>
{t('termServices.title3')}
</h3>
<p> {t('termServices.p3')} </p>

<ol>
		<li> {t('termServices.l1')} </li>
		<li>{t('termServices.l2')}</li>
		<li>{t('termServices.l3')}</li>
</ol>
<p>
{t('termServices.p32')}
</p>

<h3>{t('termServices.title4')}</h3>
<p>
{t('termServices.p4')}

</p>
<h3> {t('termServices.title5')}
</h3>
<p>
{t('termServices.p5')}
</p>
<h3>{t('termServices.title6')}</h3>
<p>
{t('termServices.p6')}
</p>
<h3> {t('termServices.title7')}</h3>
<p>
{t('termServices.p7')}
	</p>

<h3>{t('termServices.title8')}
</h3>
<p>
{t('termServices.p8')}
</p>
<h3>{t('termServices.title9')}
</h3>

<p>
{t('termServices.p9')}

</p>

<h3>{t('termServices.title10')}
</h3>

<p>
{t('termServices.p10')}
</p>

                    </div>
      {/* <div className='home-btn'>
              <button disabled={loadingForm} className='btn-main' onClick={handleSubmitBooking} >
              {loadingForm ? "" : t('actions.buttonConfirm')}
                <span className={`${loadingForm && 'btn-ring'}`}></span>
              </button>
      </div> */}

</div>
            )}
        </div>

</>
  )
}

export default DetailsBook
