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
import { Helmet } from 'react-helmet-async';
import { useRef } from 'react';
// import useScrollToTarget from '../../../../hooks/useScrollToTarget';
import ShippingSection from '../../components/common/AboutSection/ShippingSection';

const ServiceAirPort = () => {

    const {t} = useTranslation();

    const targetRef = useRef(null);
    // useScrollToTarget(targetRef);
    const scrollTargetRef = useRef(null);
  
    const handleScrollToBooking = () => {
      scrollTargetRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const text1 =t('section.detailsAirFright_1')
    const text2 =t('section.detailsAirFright_2');

    const detailsServiceSea= [
    {id:1,icon:DefaultIcon,text:t('section.service1Air')},
    {id:2,icon:DefaultIcon2,text:t('section.service2Air')},
    {id:3,icon:DefaultIcon3,text:t('section.service3Air')},
    ]
 

return (
    <>
    <Helmet>
    <meta http-equiv="origin-trial" content="Az520Inasey3TAyqLyojQa8MnmCALSEU29yQFW8dePZ7xQTvSt73pHazLFTK5f7SyLUJSo2uKLesEtEa9aUYcgMAAACPeyJvcmlnaW4iOiJodHRwczovL2dvb2dsZS5jb206NDQzIiwiZmVhdHVyZSI6IkRpc2FibGVUaGlyZFBhcnR5U3RvcmFnZVBhcnRpdGlvbmluZyIsImV4cGlyeSI6MTcyNTQwNzk5OSwiaXNTdWJkb21haW4iOnRydWUsImlzVGhpcmRQYXJ0eSI6dHJ1ZX0="/>
    <meta property="og:type" content="article"></meta>
    <meta property="og:url" content="https://acrossmena.net/services/airport-shipping"></meta>
    <meta property="og:site_name" content="Across MENA"></meta>
    <meta property="og:image" content="https://cdn.acrossmena.com/wp-content/uploads/2021/03/fffly-scaled.jpg"></meta>
      <meta
      name="description"
      content="نوفر تغطية شاملة وحلول مبتكرة تلبي احتياجات العملاء بتنوع واختلاف شحناتهم مع كبرى شركات شحن الجوي الموثوقة في العالم"    />
    <meta property="article:publisher" content="https://www.facebook.com/acrossmena"></meta>
    <meta name="keywords" content="شحن جوي , شحن , طلب شحن جوي , حلول لوجيستية ,أدوات , خدمات" ></meta>

    <title>{t('title.titleAirFright')} - Across MENA</title>
    </Helmet>

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