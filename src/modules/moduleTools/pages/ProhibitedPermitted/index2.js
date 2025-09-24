// import styles from  "./ProhibitedPermittedMaterials.module.css";
import styles from './index.module.css';
import { useEffect } from 'react';

import Accordion from "../../components/prohibitedPage/Accordion/Accordion";

import {MainContainer, SecondaryHero} from "../../../../components";

import heroImage from '../../../../assets/images/Prohibited3.webp';
import heroImage2 from '../../../../assets/images/ProhibitedEn.jpg';

import GoToTop from "../../../../components/GoToTop/GoToTop";
// import Navbar from '../../components/navbar/Navbar';
// import Hero2 from "../../sections/hero/Hero2";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Helmet } from 'react-helmet-async';
import { useTranslation } from "react-i18next";
import alertWarn from '../../../../assets/images/alert.png';
import ModalFeedBack from '../../components/common/ModalFeedBack/ModalFeedBack';




const ProhibitedPermitted = () => {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  useEffect(() => {
    window.history.scrollRestoration = 'manual'
  }, []);



  const {stateScrollValue , objectFeesModal} = useSelector((state) => state.accordion);
  return (

    <>
    <Helmet>
    <meta http-equiv="origin-trial" content="Az520Inasey3TAyqLyojQa8MnmCALSEU29yQFW8dePZ7xQTvSt73pHazLFTK5f7SyLUJSo2uKLesEtEa9aUYcgMAAACPeyJvcmlnaW4iOiJodHRwczovL2dvb2dsZS5jb206NDQzIiwiZmVhdHVyZSI6IkRpc2FibGVUaGlyZFBhcnR5U3RvcmFnZVBhcnRpdGlvbmluZyIsImV4cGlyeSI6MTcyNTQwNzk5OSwiaXNTdWJkb21haW4iOnRydWUsImlzVGhpcmRQYXJ0eSI6dHJ1ZX0="/>
    <meta property="og:type" content="article"></meta>
    <meta property="og:url" content="https://acrossmena.net/prohibited-permitted-materials/search-hs-code"></meta>
      <meta
      name="description"
      content="التعرفة الجمركية والشروط · حاسبة الرسوم الجمركية · حاسبات الشحن · أنواع ومقاسات الحاويات البحرية · أنواع ومقاسات الشاحنات · شروط التجارة الدولية (Incoterms) ..."
    />
    <meta property="og:site_name" content="Across MENA"></meta>
    <meta property="article:publisher" content="https://www.facebook.com/acrossmena"></meta>
    <meta name="keywords" content="اتصل بنا , فريق , acrossmena , تواصل معنا , هاتف , شركة لوجيستية , خدمات , أدوات , تعرفة جمركية , شحن , شحن بري جوي بحري , استشارات , مساعدة , حاسبة جمركية , رسوم جمركية" ></meta>

    <title>{t('title.titleCustomsTariffAndCondition')} - Across MENA</title>
    </Helmet>

    <GoToTop valueScroll={stateScrollValue}/>
    {
                i18n.language==='ar' ?
                <SecondaryHero title={t('title.titleCustomsTariffAndCondition')} image={heroImage}/>
                :
                <SecondaryHero title={t('title.titleCustomsTariffAndCondition')} image={heroImage2}/>
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
