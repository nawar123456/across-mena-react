import React from 'react';
import ContactForm from './ContactForm';
import ContactCard from './ContactCard';
import './styles/ContactUs.css';
import ContactIcon from '../../../../assets/icons/contact-us.svg'
import { MainContainer } from '../../../../components';
import { useTranslation } from 'react-i18next';

const ContactUs = () => {
    const { t, i18n } = useTranslation();
  
  return (
    <div className="contact-container">
      <MainContainer>

      <p className="title-ContactUS">
        <span className="highlight">
         <span >  {t('labelNavbar.call')}</span>
          
          <span style={{color:'#727272'}}>
          {t('labelNavbar.us')}

          </span>
</span>
<img
	src={ContactIcon}
	alt="contact-us"
	className='contact-image'
							/>      </p>
      <p className="subtitle">
    {t('labelNavbar.contactUSTitle')}
      </p>
      <div className="contact-grid">
      <ContactForm />
        <ContactCard />
      </div>
      </MainContainer>
    </div>

  );
};

export default ContactUs;
