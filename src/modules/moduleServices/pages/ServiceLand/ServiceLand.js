import LandHero from '../../../../assets/images/land-hero.webp';
import Track from '../../../../assets/images/LandGPT.png';
import DefaultIcon from '../../../../assets/images/defaultIcon.png';
import DefaultIcon2 from '../../../../assets/images/defaultIcon2.jpg';
import DefaultIcon3 from '../../../../assets/images/defaultIcon3.jpg';

import { MainContainer, SecondaryHero } from '../../../../components';
import AboutSection from '../../components/common/AboutSection/AboutSection';
import ServiceSection from '../../components/common/ServiceSection/ServiceSection';
import FormLand from '../../components/landPage/FormLand/FormLand';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
// import useScrollToTarget from '../../../../hooks/useScrollToTarget';
import ShippingSection from '../../components/common/AboutSection/ShippingSection';

const ServiceLand = () => {

    const {t}= useTranslation();


    const text1 =t('section.detailsLandShipping_1')
    const text2 =t('section.detailsLandShipping_2')
    const targetRef = useRef(null);
    // useScrollToTarget(targetRef);
    const scrollTargetRef = useRef(null);
  
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
    <Helmet>
    <meta http-equiv="origin-trial" content="Az520Inasey3TAyqLyojQa8MnmCALSEU29yQFW8dePZ7xQTvSt73pHazLFTK5f7SyLUJSo2uKLesEtEa9aUYcgMAAACPeyJvcmlnaW4iOiJodHRwczovL2dvb2dsZS5jb206NDQzIiwiZmVhdHVyZSI6IkRpc2FibGVUaGlyZFBhcnR5U3RvcmFnZVBhcnRpdGlvbmluZyIsImV4cGlyeSI6MTcyNTQwNzk5OSwiaXNTdWJkb21haW4iOnRydWUsImlzVGhpcmRQYXJ0eSI6dHJ1ZX0="/>
    <meta property="og:type" content="article"></meta>
    <meta property="og:url" content="https://acrossmena.net/services/land-shipping"></meta>
    <meta property="og:site_name" content="Across MENA"></meta>
    <meta property="og:image" content="https://cdn.acrossmena.com/wp-content/uploads/2020/12/land-freight2.jpg"></meta>
    <meta name="keywords" content="شحن بري , شحن , طلب شحن بري , حلول لوجيستية ,أدوات , خدمات , الشحن البري , الشحن" ></meta>

      <meta
      name="description"
      content="نقدم خدمة مرنة وموثوقة للنقل الدولي من وإلى الدول المجاورة ونتميز باهتمام دقيق بالتفاصيل والقدرة على التعامل مع مختلف أنواع الشحنات لضمان نقل آمن لبضائعهم."    />
    <meta property="article:publisher" content="https://www.facebook.com/acrossmena"></meta>
    <title>{t('title.titleLandShipping')} - Across MENA</title>
    </Helmet>

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
