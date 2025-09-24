import './index.css';

// import mainImage from '../../../../assets/images/test.webp';
import {MainContainer} from '../../../../components'
import FormBooking from '../../components/FormBooking/FormBooking';
import TimelineBooking from '../../components/TimelineBooking/TimelineBooking';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect,useState } from 'react';
import { useTranslation } from 'react-i18next';
import FormAskManager from '../AskManager/FormAskManager';
// import { FcManager } from "react-icons/fc";
// import { FcAssistant } from "react-icons/fc";
import UserIcon from '../../../../assets/icons/userManager.png'
import { LuUsers } from "react-icons/lu";
import './fixed-header.css'

const AddBook = () => {

  const {t,i18n} = useTranslation();
  const [showPopup, setShowPopup] = useState(false);




  const {
    bookingObject
} = useSelector((state) => state.moduleMain.homeSlice);



const navigate = useNavigate();

const handleBackClick = () => {
	const lang = i18n.language; // Get the current language from i18n
	const targetUrl = `/${lang}/results-book`;
	navigate(targetUrl);
};

  useEffect(()=>{

    if(Object.keys(bookingObject).length ===0){

      if(localStorage.getItem('language')){
        navigate(`/${localStorage.getItem('language')}`);
      }else{
        navigate(`/ar`);

      }
      // navigate(location.search);
     }

  },[bookingObject])
	const {
} = useSelector((state) => state.moduleMain.homeSlice);

const handleSubmit = () => {

	setShowPopup(true);

}

useEffect(() => {
  if (showPopup) {
    document.body.classList.add('no-scroll');
  } else {
    document.body.classList.remove('no-scroll');
  }

  // Cleanup on component unmount
  return () => {
    document.body.classList.remove('no-scroll');
  };
}, [showPopup]);



const handleClose = () => {
	setShowPopup(false);
};

const closePopup = () => {
	setShowPopup(false); // Hide the popup when the close button is clicked or on submission
};
  return (
    <>
{/* {console.log(portsObject)} */}
      {/* <Hero title={title} subTitle={subTitle} /> */}

      <MainContainer>
 

        <section className='add-booking'>

<div className="fixed-header">
<button className='manager-button'  onClick={handleSubmit}>  {t('bookingTitles.help')} </button>
  <span className="helper-text">دعنا نساعدك في إدخال البيانات ورفع تعليمات الشحن نيابةً عنك</span>
  <div className="user-icon">
    <img src={UserIcon} alt="User" />
  </div>
</div>


<div className='same-column'>
{/* <div className='horison-card'> */}
{/* <TimeLine Pos={"25%"} variant={"vertical"} portTitleFrom={t('bookingTitles.placeholderPortFrom')} portTitleTo={t('bookingTitles.placeholderPortTo')} numberStations={bookingObject.number_of_station}  portsObject={portsObject}  cityFrom={portsObject.portFrom} cityTo={portsObject.portTo}  endDate={bookingObject.date} startDate={bookingObject.end_date}  /> */}

{/* <TimeLine Pos={"25%"} variant={"undefine"} portTitleFrom={t('bookingTitles.placeholderPortFrom')} portTitleTo={t('bookingTitles.placeholderPortTo')} numberStations={bookingObject.number_of_station}  portsObject={portsObject}  cityFrom={portsObject.portFrom} cityTo={portsObject.portTo}  endDate={bookingObject.date} startDate={bookingObject.end_date}  />
</div> */}

          {/* Forms  */}
          <div className='booking__left'>

            <FormBooking/>

          </div>
					</div>

          {/* TimeLine */}
          <div className='booking__right'>
					<div class="container">
<button
      className="back-button"
      style={{ direction: 'ltr' }}
      onClick={handleBackClick}
    >
      <span className="arrow">{'<'}</span>
      <span>{t('actions.back')}</span>
    </button>

    </div>
			
<div>

{showPopup && (
	  <div className='popup-container'>
          <div className='popup-content'>
            {/* Form component */}

            <FormAskManager closePopup={closePopup} />

            {/* Button to close the popup */}
            {/* <button className='popup-close' onClick={closePopup}>Close</button> */}
          </div>
          {/* Optional overlay to handle clicking outside the popup */}
          <div className='popup-overlay' onClick={closePopup}></div>
        </div>
      )}
				</div>
            <TimelineBooking
             numberStation={bookingObject.number_of_station} 
             containerType={bookingObject.container} 
             TotalPickUp={bookingObject.pickup} 
             endDate={bookingObject.end_date} 
             startDate={bookingObject.date} 
             numberDays={bookingObject.number_of_day} 
              />

          </div>

        </section>

      </MainContainer>





    </>
  )
}

export default AddBook
