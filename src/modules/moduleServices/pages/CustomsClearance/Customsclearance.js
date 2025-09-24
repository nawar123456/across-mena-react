import Custom from '../../../../assets/images/CustomImage.png';
import { useTranslation } from 'react-i18next';
import HeroTool from "../../components/common/Tools/HeroTool";

const CustomsClearance = () => {

        const {t,i18n} = useTranslation();
    
// return(
// <>
// <div style={{marginTop:'80px'}}>
// <iframe src="https://acrossmena.com/%d8%a7%d9%84%d8%ae%d8%af%d9%85%d8%a7%d8%aa/%d8%aa%d8%ae%d9%84%d9%8a%d8%b5-%d8%ac%d9%85%d8%b1%d9%83%d9%8a/" 
// width='100%'
// height='100%'
// />
// </div>
// </>

// )

return(
<>


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

export  default CustomsClearance