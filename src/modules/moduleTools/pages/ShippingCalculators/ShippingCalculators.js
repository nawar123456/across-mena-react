// import Custom from '../../../../assets/images/CustomImage.png';
import Custom from '../../../../assets/images/ShippingCalculators.png';
import calcTypeAR from '../../../../assets/images/ShippingCalculatorsEN.png';
import calcTypeEN from '../../../../assets/images/ShippingCalculatorsAR.png';

import { useTranslation } from 'react-i18next';
import HeroTool from '../../../moduleServices/components/common/Tools/HeroTool';
import ShippingSlider from '../../../moduleServices/pages/ShippingCalculators/ShippingSlider';
import SEO from '../../../../components/SEO/SEO';
import { getSEOData } from '../../../../const/seoTitles';

const ShippingCalculators = () => {
const {t,i18n} = useTranslation();
    
const shippingCalcImage = i18n.language === 'ar' ? calcTypeEN : calcTypeAR;

// Get SEO data based on current language
const currentLang = i18n.language || 'ar';
const seoData = getSEOData('shippingCalculators', currentLang);

return(

<>
<SEO 
  title={seoData.title}
  description={seoData.description}
  keywords={seoData.keywords}
  image="https://acrossmena.net/images/og-shipping-calculators.jpg"
  url="https://acrossmena.net/tools/shipping-calculators"
  type="tool"
  lang={currentLang}
/>
<HeroTool 
image={shippingCalcImage}
title={t('shippingCalculatorPage.title')}
parag1={t('shippingCalculatorPage.subTitle1')}
parag2
/>
<ShippingSlider/>
</>
)
}

export  default ShippingCalculators