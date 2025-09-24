import TruckType from '../../../../assets/images/TruckTypes.png';
import { useTranslation } from 'react-i18next';
import HeroTool from '../../../moduleServices/components/common/Tools/HeroTool';
import './TruckTypes.css'
import TruckSlider from './TruckSlider';
import { useEffect,useState } from 'react';
const TruckTypes = () => {
const {t,i18n} = useTranslation();
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
    ? t('TruckTypePage.mobileTitle') // You must define this in translation JSON
    : t('TruckTypePage.title');
return(

<>
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