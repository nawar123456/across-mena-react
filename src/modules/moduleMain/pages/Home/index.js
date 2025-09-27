import './index.css';
import ShipImag from '../../../../assets/icons/ship.svg';
import HeroHome from '../../../../assets/images/HeroHome.png';

import DescImag from '../../../../assets/icons/desc.png';
import PlaneImag from '../../../../assets/icons/plane.svg';
import TruckImag from '../../../../assets/icons/truck.svg';
// import TrackShipmentImage from '../../../../assets/icons/TrackShipmentImage.png';
import TrackShipmentImage from '../../../../assets/images/TruckShimpnet.webp';

import AccordionImage from '../../../../assets/images/customs.webp';
import AppointementImage from '../../../../assets/images/appointement_fast.webp';
// import './App.css'
import {MainContainer} from '../../../../components';
import {CardInputs, Hero} from '../../components';
import { useTranslation } from 'react-i18next';
import CardAbout from '../../components/CardAbout/CardAbout';
import TextWithImage from '../../components/TextWithImage/TextWithImage';

import SliderTools from '../../components/SliderTools/SliderTools';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {  savePortsObject } from '../../store/home/home.slice';
import useQuery from '../../../../hooks/useQuery';
import InstallApp from '../../../../components/PWAPrompt/InstallApp'
import SEO from '../../../../components/SEO/SEO';
import { getSEOData } from '../../../../const/seoTitles';
const Home = () => {
  const {t, i18n} = useTranslation();

  const title= t('title.titleMainPage');
  const subTitle =t('title.subtitlemain');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryUrl =useQuery();
  
  // Get SEO data based on current language
  const currentLang = i18n.language || 'ar';
  const seoData = getSEOData('home', currentLang);

  const handleNavigate = ()=>{

      if(queryUrl.has("param"))
      navigate('prohibited-permitted-materials/search-hs-code?param=across-mena');
      else
      navigate('prohibited-permitted-materials/search-hs-code');


  }

  useEffect(()=>{

    dispatch(savePortsObject({
      selectFromPort:null,
      selectToPort:null,
      selectContainer:null
      }))

  },[])


  return (
    <>
    <SEO 
      title={seoData.title}
      description={seoData.description}
      keywords={seoData.keywords}
      image="https://acrossmena.net/images/og-home.jpg"
      url="https://acrossmena.net/"
      type="website"
      lang={currentLang}
    />
    <InstallApp></InstallApp>

      <Hero title={title} subTitle={subTitle} image={HeroHome}/>


      <MainContainer>


      <div className='home-card'>


        <CardInputs/>


      </div>


      <section className='home-header'>

        <h2 className='home-header__h2'>
          {t('labelHomePage.ourservice')}
        </h2>
        <p className='home-header__p'>
          {t('labelHomePage.headermain')}
        </p>
      </section>

      <section className='home-cards-about'>


      <CardAbout path={queryUrl.has("param") ?'services/sea-shipping?param=across-mena' : 'services/sea-shipping'} img={ShipImag}      title={t('title.seapage')} text={t('title.subtitlesea')} />

      <CardAbout path={queryUrl.has("param") ?'services/land-shipping?param=across-mena' : 'services/land-shipping'} img={TruckImag}     title={t('title.landpage')} text={t('title.subtitleland')} />
      <CardAbout path={queryUrl.has("param") ?'services/airport-shipping?param=across-mena' : 'services/airport-shipping'} img={PlaneImag}
       title={t('title.airpage')} text={t('title.subtitleair')} />
      <CardAbout img={DescImag} title={t('title.customsclearance')} text={t('title.subtitlcustomsclearance')} />

      </section>

        </MainContainer>

     <section className='home-textwithimage'>

        <MainContainer>
        <TextWithImage image={AppointementImage}
        title={t('labelHomePage.labelheaderAppointemnt')}
        text={t('labelHomePage.text1Appointement')}
        text2={t('labelHomePage.text2Appointement')} />
        </MainContainer>
      </section>

      <section className='home-tools-slider-parent'>

        <MainContainer>

      <section className='home-header'>

        <h2 className='home-header__h2'>
          {t('labelHomePage.ourtools')}
        </h2>
        <p className='home-header__p'>
          {t('labelHomePage.ourtoolstext')}
        </p>
      </section>

        </MainContainer>


        <SliderTools/>

      </section>


      <section className='home-accordion-container'>

        <MainContainer>
        <div className='home-accordion'>

        <div className='home-accordion__right'>

          <div className='accordion__right-header'>
            <h2 className='accordion__right-header-h2'>
              {t('labelHomePage.accordiontitle')}
            </h2>
            <p className='accordion__right-header-p'>
            {t('labelHomePage.accordionsubtitle')}
            </p>

          </div>

          <div className='accordion__right-details'>

            <div className='right-details__item'>

              <div className="circle">
              <div className="checkmark"></div>
              </div>
              <span className='right-text'>
                {t('labelHomePage.accordionsubP_1')}
              </span>
            </div>

            <div className='right-details__item'>

              <div className="circle">
              <div className="checkmark"></div>
              </div>
              <span className='right-text'>
                {t('labelHomePage.accordionsubP_2')}
              </span>
            </div>

            <div className='right-details__item'>

              <div className="circle">
              <div className="checkmark"></div>
              </div>
              <span className='right-text'>
                {t('labelHomePage.accordionsubP_3')}
              </span>
            </div>

            <div className='right-details__item'>

              <div className="circle">
              <div className="checkmark"></div>
              </div>
              <span className='right-text'>
                {t('labelHomePage.accordionsubP_4')}
              </span>
            </div>

            <div className='right-details__item'>

              <div className="circle">
              <div className="checkmark"></div>
              </div>
              <span className='right-text'>
                {t('labelHomePage.accordionsubP_5')}
              </span>
            </div>

            <div className='right-details__btn'>
              <button className='right-details-btn-main' onClick={handleNavigate} >
              {t('actions.readMore')}
              </button>
            </div>


          </div>

        </div>

        <div className='home-accordion__left'>

          <img className='accordion__left-img' src={AccordionImage} alt='accordion'/>
       
        </div>

        </div>




        </MainContainer>

      </section>
			<section className='home-textwithimage'>

<MainContainer>
<TextWithImage image={TrackShipmentImage}
title={t('labelHomePage.labelheaderTrackShipment')}
text={t('labelHomePage.text1TrackShipment')}
text2={t('labelHomePage.text2TrackShipment')}
 />
</MainContainer>
</section>



    </>
  )
}

export default Home
