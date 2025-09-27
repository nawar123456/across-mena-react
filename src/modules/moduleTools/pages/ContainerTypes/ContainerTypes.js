import Custom from '../../../../assets/images/CustomImage.png';
import { useTranslation } from 'react-i18next';
import ShippingSection from '../../../moduleServices/components/common/AboutSection/ShippingSection';
import ContainerTypeEN from '../../../../assets/images/ContainerTypesGPTEN.png';
import ContainerTypeAR from '../../../../assets/images/ContainerTypesGPTAR.png'

import TruckSlider from '../TruckTypes/TruckSlider';
import ContainerSlider from './ContainerSlider';
import HeroTool from '../../../moduleServices/components/common/Tools/HeroTool';
import './ContainerSlider.css'
import { useEffect,useState } from 'react';
import SEO from '../../../../components/SEO/SEO';
import { getSEOData } from '../../../../const/seoTitles';
const ContainerTypes = () => {
const {t,i18n} = useTranslation();
    
  const containerImage = i18n.language === 'ar' ? ContainerTypeAR : ContainerTypeEN;
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
  
  // Get SEO data based on current language
  const currentLang = i18n.language || 'ar';
  const seoData = getSEOData('containerTypes', currentLang);
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
    ? t('containerTypePage.mobileTitle') // You must define this in translation JSON
    : t('containerTypePage.title');
return(
<>
<SEO 
  title={seoData.title}
  description={seoData.description}
  keywords={seoData.keywords}
  image="https://acrossmena.net/images/og-container-types.jpg"
  url="https://acrossmena.net/tools/container-types"
  type="tool"
  lang={currentLang}
/>
<div className='home-truck-types'>
<HeroTool 
image={containerImage}
title={titleText}
parag1={(t('containerTypePage.subTitle2'))}
parag2
/>
</div>

<ContainerSlider/>
</>
)
}

export  default ContainerTypes