import { LuUsers } from "react-icons/lu";
import './index.css';
import { FcAssistant } from "react-icons/fc";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect,useState } from 'react';
import { useTranslation } from 'react-i18next';
import FormAskManager from '../AskManager/FormAskManager';

const Manager = () => {
 const {t,i18n} = useTranslation();
  const [showPopup, setShowPopup] = useState(false);
  const handleSubmit = () => {

	setShowPopup(true);
}
const closePopup = () => {
	setShowPopup(false); // Hide the popup when the close button is clicked or on submission
};

        <div className='req-manager'>
                        <div className='manager-content'>
<p style={{color:'#fcc400', fontWeight:'bold',marginTop:'-4px'}} className='text-askManager'> {t('bookingTitles.reqManager')}</p>
{/* <FcManager style={{ width: '66px', height: '65px',position:'relative',left:'-80px' ,color:'red'}} /> */}

<LuUsers style={{ width: '60px', height: '55px',position:'relative' ,color:'0D3453'}} className='icon-circle' />
<p style={{color:'#727272',fontSize:'17px'}}> {t('bookingTitles.howContact')}</p>
<button className='manager-button'  onClick={handleSubmit}>  {t('bookingTitles.help')} </button>
</div>

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
    
}
export default Manager
