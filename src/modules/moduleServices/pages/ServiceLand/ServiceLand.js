import LandHero from '../../../../assets/images/land-hero.webp';
import Track from '../../../../assets/images/LandGPT.webp';
import DefaultIcon from '../../../../assets/images/defaultIcon.png';
import DefaultIcon2 from '../../../../assets/images/defaultIcon2.jpg';
import DefaultIcon3 from '../../../../assets/images/defaultIcon3.jpg';

import { MainContainer, SecondaryHero } from '../../../../components';
import AboutSection from '../../components/common/AboutSection/AboutSection';
import ServiceSection from '../../components/common/ServiceSection/ServiceSection';
import FormLand from '../../components/landPage/FormLand/FormLand';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';
import SEO from '../../../../components/SEO/SEO';
import { getSEOData } from '../../../../const/seoTitles';
// import useScrollToTarget from '../../../../hooks/useScrollToTarget';
import ShippingSection from '../../components/common/AboutSection/ShippingSection';

const ServiceLand = () => {

    const {t, i18n}= useTranslation();

    const text1 =t('section.detailsLandShipping_1')
    const text2 =t('section.detailsLandShipping_2')
    const targetRef = useRef(null);
    // useScrollToTarget(targetRef);
    const scrollTargetRef = useRef(null);
    
    // Get SEO data based on current language
    const currentLang = i18n.language || 'ar';
    const seoData = getSEOData('landShipping', currentLang);
  
    const handleScrollToBooking = () => {
      scrollTargetRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
  


    const detailsServiceSea = [
      {id:1,icon:DefaultIcon,text:t('section.service1')},
      {id:2,icon:DefaultIcon2,text:t('section.service2')},
      {id:3,icon:DefaultIcon3,text:t('section.service3')},

    ];


return (
    <>
    <SEO 
      title={seoData.title}
      description={seoData.description}
      keywords={seoData.keywords}
      image="https://acrossmena.net/images/og-land-shipping.jpg"
      url="https://acrossmena.net/services/land-shipping"
      type="service"
      lang={currentLang}
    />

    <section className='pd-y'>
    <div className="curved-section">

<ShippingSection 
image={Track}
title={t('labelServices.landServicesTitle')}
parag1={t('labelServices.landServicesParagraph1')}
parag2={
(t('labelServices.landServicesParagraph2'))
}
onScrollClick={handleScrollToBooking}/>
</div>
    <ServiceSection  title={t('section.ourServicersTitle')} detailsArray={detailsServiceSea}/>
    </section>

    <MainContainer hasPadding={true} paddingStyle={true}>
    <div ref={scrollTargetRef}>

      <FormLand targetRef={targetRef}/>
      </div>

    </MainContainer>
  

<a style={{display:'none'}} href='tel:+00963415060'> 
  00963415060
  </a>

  <a style={{display:'none'}} href='tel:+00963944506000'> 
  00963944506000
  </a>

  <a style={{display:'none'}} href='mailto:info@acrossmena.com'> 
  info@acrossmena.com
  </a>

  <a style={{display:'none'}} href='https://acrossmena.net/services/land-shipping'> 
  https://acrossmena.net/services/land-shipping
  </a>

</>


)
}
export default ServiceLand
