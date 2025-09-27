import './ServiceSea.css';
import FormSea from '../../components/seaPage/FormSea/FormSea';
import SeaAbout from '../../../../assets/images/sea-about.webp';
import DefaultIcon from '../../../../assets/images/defaultIcon.png';
import DefaultIcon2 from '../../../../assets/images/defaultIcon2.jpg';
import DefaultIcon3 from '../../../../assets/images/defaultIcon3.jpg';
import SeaHero from '../../../../assets/images/shapeGPT.png';

import { MainContainer, SecondaryHero } from '../../../../components';
import AboutSection from '../../components/common/AboutSection/AboutSection';
import ShippingSection from '../../components/common/AboutSection/ShippingSection';

import ServiceSection from '../../components/common/ServiceSection/ServiceSection';
import { useTranslation } from 'react-i18next';
import { Fragment, useRef } from 'react';
import SEO from '../../../../components/SEO/SEO';
import { getSEOData } from '../../../../const/seoTitles';
// import useScrollToTarget from '../../../../hooks/useScrollToTarget';

const ServiceSea = () => {

  const {t,i18n} = useTranslation();


  const text1 =t('section.detailsSeaShipping_1');
  const text2 =t('section.detailsSeaShipping_2');
  const targetRef = useRef(null);
  // useScrollToTarget(targetRef);
  const scrollTargetRef = useRef(null);
  
  // Get SEO data based on current language
  const currentLang = i18n.language || 'ar';
  const seoData = getSEOData('seaShipping', currentLang);

  const handleScrollToBooking = () => {
    scrollTargetRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const detailsServiceSea= [
    {id:1,icon:DefaultIcon,text:t('section.service1Sea')},
    {id:2,icon:DefaultIcon2,text:t('section.service2Sea')},
    {id:3,icon:DefaultIcon3,text:t('section.service3Sea')},
  ]


    return (
    <>
    <SEO 
      title={seoData.title}
      description={seoData.description}
      keywords={seoData.keywords}
      image="https://acrossmena.net/images/og-sea-shipping.jpg"
      url="https://acrossmena.net/services/sea-shipping"
      type="service"
      lang={currentLang}
    />

    <section className='pd-y'>

<ShippingSection 
image={SeaHero}
title={t('labelServices.seaServicesTitle')}
parag1={t('labelServices.seaServicesParagraph1')}
parag2={
(t('labelServices.seaServicesParagraph2'))
}

onScrollClick={handleScrollToBooking}
/>
<ServiceSection title={t('section.ourServicersTitle')} detailsArray={detailsServiceSea}/>

</section>
    <MainContainer hasPadding={true} paddingStyle={true}>
    <div ref={scrollTargetRef}>
    <FormSea targetRef={targetRef}/>
      </div>





    </MainContainer>

          {/* add backlinks*/}
      {/* <Fragment  >

      <a style={{display:'none'}} href='tel:+00963415060'> 
        00963415060
        </a>

        <a style={{display:'none'}} href='tel:+00963944506000'> 
        00963944506000
        </a>

        <a style={{display:'none'}} href='mailto:info@acrossmena.com'> 
        info@acrossmena.com
        </a>

        <a style={{display:'none'}} href='https://acrossmena.net/services/sea-shipping'> 
        https://acrossmena.net/services/sea-shipping
        </a>

        </Fragment> */}
    {/* </div> */}
    </>
    )
}

export default ServiceSea
