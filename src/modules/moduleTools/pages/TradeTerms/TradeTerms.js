import Custom from '../../../../assets/images/CustomImage.png';
import { useTranslation } from 'react-i18next';
import HeroTool from '../../../moduleServices/components/common/Tools/HeroTool';
import SEO from '../../../../components/SEO/SEO';
import { getSEOData } from '../../../../const/seoTitles';

const TradeTerms = () => {
const {t,i18n} = useTranslation();
    
// Get SEO data based on current language
const currentLang = i18n.language || 'ar';
const seoData = getSEOData('tradeTerms', currentLang);

return(
<>
<SEO 
  title={seoData.title}
  description={seoData.description}
  keywords={seoData.keywords}
  image="https://acrossmena.net/images/og-trade-terms.jpg"
  url="https://acrossmena.net/tools/trade-terms"
  type="tool"
  lang={currentLang}
/>
<HeroTool 
image={Custom}
title={t('labelServices.landServicesTitle')}
parag1={t('labelServices.landServicesParagraph1')}
parag2={
(t('labelServices.landServicesParagraph2'))
}
/>
</>
)
}

export  default TradeTerms