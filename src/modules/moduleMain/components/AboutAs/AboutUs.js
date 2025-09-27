import React from 'react';
import { FaRocket } from 'react-icons/fa'; // Rocket icon
import './AboutUs.css';
import Rocket from '../../../../assets/icons/rocket-aboutUs.svg'
import { useTranslation } from 'react-i18next';
import SEO from '../../../../components/SEO/SEO';
import { getSEOData } from '../../../../const/seoTitles';

const AboutUs = () => {
      const { t, i18n } = useTranslation();
  
      // Get SEO data based on current language
      const currentLang = i18n.language || 'ar';
      const seoData = getSEOData('aboutUs', currentLang);

  return (
    <>
    <SEO 
      title={seoData.title}
      description={seoData.description}
      keywords={seoData.keywords}
      image="https://acrossmena.net/images/og-about-us.jpg"
      url="https://acrossmena.net/about-us"
      type="website"
      lang={currentLang}
    />
    <div className="about-us-container">
      <h1 className="about-us-title">
        <span className='highlight' >
        <span> {t('labelNavbar.whoWe')}</span>
          
          <span style={{color:'#727272'}}>
          {t('labelNavbar.are')}

          </span>


        </span>
        </h1>
      <p className='about-us-subtitle'>
        {t('labelNavbar.aboutSubTitle1')}
         </p>
      {/* <p className='about-us-subtitle2'>
      {t('labelNavbar.aboutSubTitle2')}

      </p> */}
      <div className="about-us-content">
        <div className="about-us-item">
        <p className='yellow-line'></p>

        <div className='title-rocket'>
          <img src={Rocket} alt='' className='rocket-img'/>
          <h3 className="about-us-item-title">
            {t('labelNavbar.target')}
          </h3>
          </div>
          <p className="about-us-item-text">
           {t('labelNavbar.cardAboutText1')}
          </p>
          {/* <p className='yellow-line-bottom'></p> */}

        </div>

        <div className="about-us-item">
        <p className='yellow-line'></p>

          <div className='title-rocket'>
        <img src={Rocket} alt='' className='rocket-img'/>
        <h3 className="about-us-item-title"> 
      {t('labelNavbar.vision')}
          </h3>
          </div>
          <p className="about-us-item-text">
          {t('labelNavbar.cardAboutText2')}

          </p>
          {/* <p className='yellow-line-bottom-middle'></p> */}

        </div>
        <div className="about-us-item">
        <p className='yellow-line'></p>

        <div className='title-rocket'>

        <img src={Rocket} alt='' className='rocket-img'/>
        <h3 className="about-us-item-title">
      {t('labelNavbar.ourMission')}
          </h3>
        </div>
          <p className="about-us-item-text">
          {t('labelNavbar.cardAboutText3')}
          
          </p>
          {/* <p className='yellow-line-bottom'></p> */}

        </div>
      </div>
    </div>
    </>
  );
};

export default AboutUs;
