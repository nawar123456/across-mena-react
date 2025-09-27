// import styles from  "./ProhibitedPermittedMaterials.module.css";
import styles from './index.module.css';
import { useEffect } from 'react';

import Accordion from "../../components/prohibitedPage/Accordion/Accordion";

import {MainContainer, SecondaryHero} from "../../../../components";

import heroTariffImageArabic from '../../../../assets/images/Prohibited3.webp';
import heroTariffImageEnglish from '../../../../assets/images/ProhibitedEn.jpg';

import GoToTop from "../../../../components/GoToTop/GoToTop";
// import Navbar from '../../components/navbar/Navbar';
// import Hero2 from "../../sections/hero/Hero2";
import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";

import { useTranslation } from "react-i18next";
import alertWarn from '../../../../assets/images/alert.png';
import ModalFeedBack from '../../components/common/ModalFeedBack/ModalFeedBack';
import SEO from '../../../../components/SEO/SEO';
import { getSEOData } from '../../../../const/seoTitles';

const ProhibitedPermitted = () => {
  const { t, i18n } = useTranslation();
  // const { lang } = useParams();
  useEffect(() => {
    window.history.scrollRestoration = 'manual'
  }, []);

  // Get SEO data based on current language
  const currentLang = i18n.language || 'ar';
  const seoData = getSEOData('prohibitedPermitted', currentLang);

  const {stateScrollValue , objectFeesModal} = useSelector((state) => state.accordion);
  return (
    <>
    <SEO 
      title={seoData.title}
      description={seoData.description}
      keywords={seoData.keywords}
      image="https://acrossmena.net/images/og-prohibited.jpg"
      url="https://acrossmena.net/prohibited-permitted-materials/search-hs-code"
      type="tool"
      lang={currentLang}
    />

    <GoToTop valueScroll={stateScrollValue}/>
    {
                i18n.language==='ar' ?
                <SecondaryHero title={t('title.titleCustomsTariffAndCondition')} image={heroTariffImageArabic}/>
                :
                <SecondaryHero title={t('title.titleCustomsTariffAndCondition')} image={heroTariffImageEnglish}/>
              }


    <MainContainer>
    <h2 className={styles['under-developemnt-text']}>
      {t('title.titleBetaVersion')}
    </h2>
    </MainContainer>

    <Accordion/>


    <MainContainer>
    <div className={styles['parent-warning']} >
        <img className={styles['warning-image']}  src={alertWarn} alt='warn icon'/>

        <div>
        <p className={styles['warning-text']}>
        {t('labelProhibitedPage.warning1')}
        </p>
        <p className={styles['warning-text']}>
        {t('labelProhibitedPage.warning2')}
        </p>
        </div>

    </div>
    </MainContainer>

    <ModalFeedBack objectFeesModal={objectFeesModal}/>

    </>

  )
}

export default ProhibitedPermitted;
