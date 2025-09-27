import TruckType from '../../../../assets/images/TruckTypes.webp';
import { useTranslation } from 'react-i18next';
import HeroTool from '../../../moduleServices/components/common/Tools/HeroTool';
import './TruckTypes.css'
import TruckSlider from './TruckSlider';
import { useEffect,useState } from 'react';
import SEO from '../../../../components/SEO/SEO';
import { getSEOData } from '../../../../const/seoTitles';
const TruckTypes = () => {
const {t,i18n} = useTranslation();
      const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
      
      // Get SEO data based on current language
      const currentLang = i18n.language || 'ar';
      const seoData = getSEOData('truckTypes', currentLang);
     useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth <= 500);
        };
    
        window.addEventListener('resize', handleResize);
    
        // Cleanup on unmount
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);
  const titleText = isMobile
    ? t('TruckTypePage.mobileTitle') // You must define this in translation JSON
    : t('TruckTypePage.title');
return(

<>
<SEO 
  title={seoData.title}
  description={seoData.description}
  keywords={seoData.keywords}
  image="https://acrossmena.net/images/og-truck-types.jpg"
  url="https://acrossmena.net/tools/truck-types"
  type="tool"
  lang={currentLang}
/>
<div className='home-truck-types'>
<HeroTool 
image={TruckType}
title={titleText}
parag1={t('TruckTypePage.subTitle1')}
parag2={
(t('TruckTypePage.subTitle2'))
}
/>
</div>
<TruckSlider/>

</>
)
}

export  default TruckTypes