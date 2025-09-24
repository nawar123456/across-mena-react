// import Custom from '../../../../assets/images/CustomImage.png';
import Custom from '../../../../assets/images/ShippingCalculators.png';
import calcTypeAR from '../../../../assets/images/ShippingCalculatorsEN.png';
import calcTypeEN from '../../../../assets/images/ShippingCalculatorsAR.png';

import { useTranslation } from 'react-i18next';
import HeroTool from '../../../moduleServices/components/common/Tools/HeroTool';
import ShippingSlider from '../../../moduleServices/pages/ShippingCalculators/ShippingSlider';

const ShippingCalculators = () => {
const {t,i18n} = useTranslation();
    
const shippingCalcImage = i18n.language === 'ar' ? calcTypeEN : calcTypeAR;

return(

<>

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