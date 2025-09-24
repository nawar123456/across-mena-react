import React from 'react';
import PhoneIcon from '../../../../assets/icons/contact-icon-yel.svg'
import Face from '../../../../assets/icons/facebook-Card-Contact.svg'
import Whats from '../../../../assets/icons/whats-Card-Contact.svg'
import Insta from '../../../../assets/icons/Instagram-Card-Contact.svg'
import Mail from '../../../../assets/icons/email-icon-yel.svg'
import './ConatctUsFor.css'
import './ContactCard.css'
import { ReactComponent as LinkedInIcon} from '../../../../assets/icons/linkedin-fill.svg';
import { ReactComponent as FacebookIcon} from '../../../../assets/icons/facebook-circle-fill.svg';
import { ReactComponent as WhatsAppIcon} from '../../../../assets/icons/whatsapp-line.svg';
import { t } from 'i18next';

const ContactCard = () => {
  return (
    <div className="contact-info">
      <h3 style={{textAlign:'center'}} className='contact-info-h3'>{t('labelNavbar.contactInfoTitle')} </h3>
      <p className=" contact-info-p"style={{color:'rgba(51, 51, 51, 0.7)',textAlign:'center'}}>
           {t('labelNavbar.contactInfoSubTitle')}
        </p>
     <div className='three'>
      <div className="info-item">
      <img src={PhoneIcon} className='contact-card-img'
     alt='phone'
/>       
   <div className='phone-number-contact'>
<p className='phone-number-contact-p'> {t('labelNavbar.phoneNumber')}  </p> 
<p className='number-contact'>963415060+
</p>
      </div>
      </div>
      <div className="info-item">
      <img src={PhoneIcon} className='contact-card-img'
     alt='phone'
/>       
   
<div className='phone-number-contact'>
<p className='phone-number-contact-p'>  {t('labelAuth.PhoneNumber')}  </p> 
<p className='number-contact'>963944506000+
</p>
      
      </div>     
      </div>
      <div className="info-item">
      <img src={Mail} className='contact-card-img'
     alt='phone'
/>       
   
<div className='phone-number-contact'>
<p className='phone-number-contact-p'> {t('labelServices.email')}   </p> 
<p className='number-contact'>info@acrossmena.com
</p>
      </div>
      </div>
      </div>
      <div className="social-icons">
       <a className='footer-link' href='https://www.facebook.com/acrossmena' rel='noreferrer' target="_blank" title="FaceBook Label">
            <FacebookIcon className='footer-icon'/>
          </a>
          <a className='footer-link' href='http://www.linkedin.com/in/acrossmena' rel='noreferrer' target="_blank" title="LinkedIn Label">
            <LinkedInIcon className='footer-icon'/>
          </a>
          <a className='footer-link' href='https://api.whatsapp.com/send?phone=963944506000' rel='noreferrer' target="_blank" title="WhatsApp Label">
            <WhatsAppIcon className='footer-icon'/>
          </a>
      </div>
    </div>
  );
};

export default ContactCard;
