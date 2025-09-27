import AirportHero from '../../../../assets/images/fly-hero.webp';
import AirportAbout from '../../../../assets/images/air-about.webp';
import DefaultIcon from '../../../../assets/images/defaultIcon.png';
import DefaultIcon2 from '../../../../assets/images/defaultIcon2.jpg';
import DefaultIcon3 from '../../../../assets/images/defaultIcon3.jpg';
import Plane from '../../../../assets/images/PlanechatGpPT2.png';

import { MainContainer, SecondaryHero } from '../../../../components';
import AboutSection from '../../components/common/AboutSection/AboutSection';
import ServiceSection from '../../components/common/ServiceSection/ServiceSection';
import FormAirPort from '../../components/airportPage/FormAirPort/FormAirPort';
import { useTranslation } from 'react-i18next';
import SEO from '../../../../components/SEO/SEO';
import { getSEOData } from '../../../../const/seoTitles';
import { useRef } from 'react';
// import useScrollToTarget from '../../../../hooks/useScrollToTarget';
import ShippingSection from '../../components/common/AboutSection/ShippingSection';

const ServiceAirPort = () => {

    const {t, i18n} = useTranslation();

    const targetRef = useRef(null);
    // useScrollToTarget(targetRef);
    const scrollTargetRef = useRef(null);
  
    const handleScrollToBooking = () => {
      scrollTargetRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const text1 =t('section.detailsAirFright_1')
    const text2 =t('section.detailsAirFright_2');
    
    // Get SEO data based on current language
    const currentLang = i18n.language || 'ar';
    const seoData = getSEOData('airShipping', currentLang);

    const detailsServiceSea= [
    {id:1,icon:DefaultIcon,text:t('section.service1Air')},
    {id:2,icon:DefaultIcon2,text:t('section.service2Air')},
    {id:3,icon:DefaultIcon3,text:t('section.service3Air')},
    ]
 

return (
    <>
    <SEO 
      title={seoData.title}
      description={seoData.description}
      keywords={seoData.keywords}
      image="https://acrossmena.net/images/og-air-shipping.jpg"
      url="https://acrossmena.net/services/airport-shipping"
      type="service"
      lang={currentLang}
    />

    <section className='pd-y'>
    <div className="curved-section">

<ShippingSection 
image={Plane}
title={t('labelServices.airPortServicesTitle')}
parag1={t('labelServices.airPortServicesParagraph1')}
parag2={
(t('labelServices.airPortServicesParagraph2'))
}
onScrollClick={handleScrollToBooking}/>
</div>
    {/* <AboutSection imageAbout={AirportAbout} title={t('section.headerAirFright')} text1={text1} text2={text2} /> */}

    <ServiceSection  title={t('section.ourServicersTitle')} detailsArray={detailsServiceSea}/>
    </section>

    <MainContainer hasPadding={true} paddingStyle={true}>
    <div ref={scrollTargetRef}>

        <FormAirPort targetRef={targetRef}/>
        </div>

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

  <a style={{display:'none'}} href='https://acrossmena.net/services/airport-shipping'> 
  https://acrossmena.net/services/airport-shipping
  </a>

  </>

    </>
)
}

export default ServiceAirPort;