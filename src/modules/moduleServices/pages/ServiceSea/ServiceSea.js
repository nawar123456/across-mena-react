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
import { Helmet } from 'react-helmet-async';
import { Fragment, useRef } from 'react';
// import useScrollToTarget from '../../../../hooks/useScrollToTarget';

const ServiceSea = () => {

  const {t} = useTranslation();


  const text1 =t('section.detailsSeaShipping_1');
  const text2 =t('section.detailsSeaShipping_2');
  const targetRef = useRef(null);
  // useScrollToTarget(targetRef);
  const scrollTargetRef = useRef(null);

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
    <Helmet>

    <meta http-equiv="origin-trial" content="Az520Inasey3TAyqLyojQa8MnmCALSEU29yQFW8dePZ7xQTvSt73pHazLFTK5f7SyLUJSo2uKLesEtEa9aUYcgMAAACPeyJvcmlnaW4iOiJodHRwczovL2dvb2dsZS5jb206NDQzIiwiZmVhdHVyZSI6IkRpc2FibGVUaGlyZFBhcnR5U3RvcmFnZVBhcnRpdGlvbmluZyIsImV4cGlyeSI6MTcyNTQwNzk5OSwiaXNTdWJkb21haW4iOnRydWUsImlzVGhpcmRQYXJ0eSI6dHJ1ZX0="></meta>
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"></meta>
    <meta property="og:type" content="article"/>
    <meta property="og:description" content="نقدم حلول لوجستية للشحن&nbsp; البحري لكافة أنواع البضائع مع كبرى الخطوط الملاحية وبأفضل الأسعار لحجز الحاوية المناسبة بطريقة سهلة وبسيطة"/>
    <meta property="og:url" content="https://acrossmena.net/services/sea-shipping"/>
    <meta property="og:site_name" content="Across MENA"/>
    <meta property="article:publisher" content="https://www.facebook.com/acrossmena"></meta>
    <meta property="og:image" content="https://cdn.acrossmena.com/wp-content/uploads/2020/12/sea-feight.jpg"/>
    <meta name="keywords" content="  الشحن , الشحن البحري , شحن بحري , شحن , طلب شحن بحري , حلول لوجيستية ,أدوات , خدمات" ></meta>
    <title>{t('title.titleSeaShipping')} - Across MENA</title>
    </Helmet>

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
