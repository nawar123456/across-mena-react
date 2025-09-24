import Custom from '../../../../assets/images/CustomImage.png';
import { useTranslation } from 'react-i18next';
import HeroTool from '../../../moduleServices/components/common/Tools/HeroTool';

const Incoterms = () => {
const {t,i18n} = useTranslation();
    

return(


<HeroTool 
image={Custom}
title={t('labelServices.landServicesTitle')}
parag1={t('labelServices.landServicesParagraph1')}
parag2={
(t('labelServices.landServicesParagraph2'))
}
/>
)
}

export  default Incoterms