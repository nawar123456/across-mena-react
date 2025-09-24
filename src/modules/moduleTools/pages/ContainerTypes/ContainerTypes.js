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
const ContainerTypes = () => {
const {t,i18n} = useTranslation();
    
  const containerImage = i18n.language === 'ar' ? ContainerTypeAR : ContainerTypeEN;
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
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