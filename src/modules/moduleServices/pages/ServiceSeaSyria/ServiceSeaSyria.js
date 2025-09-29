import './ServiceSeaSyria.css';
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
import { syriaSeaShippingSchema, syriaPortsSchema } from '../../../../components/SEO/SyriaSchema';

const ServiceSeaSyria = () => {

  const {t,i18n} = useTranslation();

  const text1 = t('section.detailsSeaShipping_1');
  const text2 = t('section.detailsSeaShipping_2');
  const targetRef = useRef(null);
  const scrollTargetRef = useRef(null);
  
  // Get SEO data based on current language
  const currentLang = i18n.language || 'ar';
  const seoData = getSEOData('seaShippingSyria', currentLang);

  const handleScrollToBooking = () => {
    scrollTargetRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const detailsServiceSea = [
    {id:1, icon:DefaultIcon, text:t('section.service1Sea')},
    {id:2, icon:DefaultIcon2, text:t('section.service2Sea')},
    {id:3, icon:DefaultIcon3, text:t('section.service3Sea')},
  ]

  // Syria-specific content
  const syriaContent = {
    ar: {
      heroTitle: "شحن بحري إلى سورية - أفضل الأسعار والخدمات",
      heroSubtitle: "خدمات شحن بحري متكاملة من دبي والإمارات إلى جميع المدن السورية",
      aboutTitle: "لماذا تختار Across MENA للشحن البحري إلى سورية؟",
      aboutText: "نحن متخصصون في الشحن البحري إلى سورية مع أفضل الأسعار والخدمات. نقدم خدمات شحن حاويات 20ft و40ft إلى موانئ اللاذقية وطرطوس، مع خدمة التخليص الجمركي والتتبع الفوري.",
      features: [
        "أسعار تنافسية للشحن البحري إلى سورية",
        "خدمة تخليص جمركي متكاملة",
        "تتبع الشحنات في الوقت الفعلي",
        "شبكة واسعة من الشركاء في سورية",
        "خدمة عملاء متاحة 24/7"
      ],
      cities: [
        {name: "دمشق", port: "ميناء اللاذقية"},
        {name: "حلب", port: "ميناء طرطوس"},
        {name: "اللاذقية", port: "ميناء اللاذقية"},
        {name: "طرطوس", port: "ميناء طرطوس"},
        {name: "حمص", port: "ميناء اللاذقية"},
        {name: "حماه", port: "ميناء طرطوس"}
      ]
    },
    en: {
      heroTitle: "Sea Freight to Syria - Best Rates and Services",
      heroSubtitle: "Comprehensive sea freight services from Dubai and UAE to all Syrian cities",
      aboutTitle: "Why Choose Across MENA for Sea Freight to Syria?",
      aboutText: "We specialize in sea freight to Syria with the best rates and services. We provide 20ft and 40ft container shipping services to Latakia and Tartus ports, with customs clearance and real-time tracking services.",
      features: [
        "Competitive rates for sea freight to Syria",
        "Comprehensive customs clearance service",
        "Real-time shipment tracking",
        "Wide network of partners in Syria",
        "24/7 customer service"
      ],
      cities: [
        {name: "Damascus", port: "Latakia Port"},
        {name: "Aleppo", port: "Tartus Port"},
        {name: "Latakia", port: "Latakia Port"},
        {name: "Tartus", port: "Tartus Port"},
        {name: "Homs", port: "Latakia Port"},
        {name: "Hama", port: "Tartus Port"}
      ]
    }
  };

  const content = syriaContent[currentLang] || syriaContent.ar;

  return (
    <>
    <SEO 
      title={seoData.title}
      description={seoData.description}
      keywords={seoData.keywords}
      image="https://acrossmena.net/images/og-sea-syria.jpg"
      url="https://acrossmena.net/services/sea-shipping-syria"
      type="website"
      lang={currentLang}
      schema={[syriaSeaShippingSchema, syriaPortsSchema]}
    />

    <SecondaryHero 
      title={content.heroTitle}
      subtitle={content.heroSubtitle}
      image={SeaHero}
      buttonText={t('actions.bookNow')}
      onButtonClick={handleScrollToBooking}
    />

    <MainContainer>

      {/* Syria-specific content section */}
      <section className="syria-specific-content">
        <div className="syria-content-grid">
          <div className="syria-about">
            <h2>{content.aboutTitle}</h2>
            <p>{content.aboutText}</p>
            <ul className="syria-features">
              {content.features.map((feature, index) => (
                <li key={index}>✓ {feature}</li>
              ))}
            </ul>
          </div>
          
          <div className="syria-cities">
            <h3>{currentLang === 'ar' ? 'المدن والموانئ التي نخدمها في سورية:' : 'Cities and Ports We Serve in Syria:'}</h3>
            <div className="cities-grid">
              {content.cities.map((city, index) => (
                <div key={index} className="city-card">
                  <h4>{city.name}</h4>
                  <p>{city.port}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AboutSection 
        image={SeaAbout}
        title={t('section.aboutSeaShipping')}
        text1={text1}
        text2={text2}
        buttonText={t('actions.learnMore')}
        onButtonClick={handleScrollToBooking}
      />

      <ServiceSection 
        services={detailsServiceSea}
        title={t('section.ourServicesSea')}
      />

      <ShippingSection 
        title={t('section.shippingOptions')}
        subtitle={t('section.shippingOptionsSubtitle')}
      />

      <div ref={scrollTargetRef}>
        <FormSea />
      </div>

    </MainContainer>
    </>
  );
};

export default ServiceSeaSyria;
