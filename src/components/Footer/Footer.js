import './Footer.css';
import { ReactComponent as FacebookIcon} from '../../assets/icons/facebook-circle-fill.svg';
import { ReactComponent as LinkedInIcon} from '../../assets/icons/linkedin-fill.svg';
import { ReactComponent as WhatsAppIcon} from '../../assets/icons/whatsapp-line.svg';
import { ReactComponent as ArrowUpDouble} from '../../assets/icons/arrow-up-double-line.svg';
import { NavLink  } from "react-router-dom";

import MainContainer from '../MainContainer/MainContainer';
import { useTranslation } from 'react-i18next';
import useQuery from '../../hooks/useQuery';

const Footer = () => {

  const {t} = useTranslation();
  const queryUrl =useQuery();



  const HandleTop = ()=>{
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  return (
    <section className='footer-section'>
    <footer className='footer'>
      <MainContainer>
        <div className='footer-parent'>


        <div className='sec aboutus'>
       <h2 className='sec-title'>
          {t('labelFooter.labelCompany')}
       </h2>

       <ul className='info'>
          <li><NavLink style={{pointerEvents: queryUrl.has("param")===false ? 'auto':'none'}} to={'/about-us'}>{t('labelNavbar.whoWeAre')}</NavLink></li>
          <li><NavLink style={{pointerEvents:queryUrl.has("param") ===false? 'auto':'none'}} to={'privacy-policy'}>{t('labelNavbar.privacyPolicy')}</NavLink></li>
        </ul>

        <h2 className='sec-title'>
        {t('labelNavbar.help')}
       </h2>

       <ul className='info'>
          <li><NavLink  to={'/contact-us'} >{t('labelNavbar.contact')}</NavLink></li>

        </ul>

        </div>

        <div className='sec quicklinks'>
        <h2 className='sec-title'>{t('labelNavbar.services')}</h2>
        <ul className='info'>
          <li><NavLink  to={ 'services/land-shipping'}>{t('labelNavbar.landShipping')}</NavLink></li>
          <li><NavLink  to={ 'services/sea-shipping'}>{t('labelNavbar.seaShipping')}</NavLink></li>
          <li><NavLink  to={'services/airport-shipping'} >{t('labelNavbar.airFreight')}</NavLink></li>
        </ul>
        </div>

        <div className='sec shope'>
        <h2 className='sec-title'>{t('labelNavbar.tools')}</h2>
        <ul className='info'>
				<li><NavLink  to={ 'prohibited-permitted-materials/search-hs-code'}>{t('title.titleCustomsTariffAndCondition')}</NavLink></li>
          <li><NavLink  to={'customs-duties-calculator/calculator'}>{t('labelFooter.labelSelectCustom')}</NavLink></li>
          <li><NavLink style={{pointerEvents:queryUrl.has("param") ===false? 'auto':'none'}} to={'tools/shipping-calculators'}>{t('labelNavbar.shippingCalculators')}</NavLink></li>
          <li><NavLink style={{pointerEvents:queryUrl.has("param") ===false? 'auto':'none'}} to={'tools/container-types'}>{t('labelNavbar.containerTypesAndSizes')}</NavLink></li>
          <li><NavLink style={{pointerEvents:queryUrl.has("param") ===false? 'auto':'none'}} to={'tools/truck-types'}>{t('labelNavbar.truckTypesAndSizes')}</NavLink></li>

        </ul>
        </div>

        <div className='sec contact'>
        <h2 className='sec-title'>{t('section.footerContactUs')}</h2>
        <ul className='info'>
          <li>
          <span>{t('section.footerAddress')}</span>
          </li>
          <li>
          <span>{t('section.footerBuilding')}</span>
          </li>
          <li>
          <span>
          {t('section.footerPhone')}
            <a className='footer-number' href='tel:+963415060'> 963415060+ </a>
            </span>
          </li>

          <li>
          <span>
          {t('section.footerMobile')}
            <a className='footer-number' href='tel:+963944506000'> 963944506000+ </a>
            </span>
          </li>

          <li className='footer-links'>
          <a className='footer-link' href='https://www.facebook.com/acrossmena' rel='noreferrer' target="_blank" title="FaceBook Label">
            <FacebookIcon className='footer-icon'/>
          </a>
          <a className='footer-link' href='http://www.linkedin.com/in/acrossmena' rel='noreferrer' target="_blank" title="LinkedIn Label">
            <LinkedInIcon className='footer-icon'/>
          </a>
          <a className='footer-link' href='https://api.whatsapp.com/send?phone=963944506000' rel='noreferrer' target="_blank" title="WhatsApp Label">
            <WhatsAppIcon className='footer-icon'/>
          </a>
          </li>

        </ul>
        </div>
      </div>
      </MainContainer>
    </footer>

    <div className='copyright-text'>
      <button className='footer-top' onClick={HandleTop}  title='العودة للأعلى'>
        <ArrowUpDouble className='footer-arrow'/>
      </button>
      <p>Copyright © 2025 Across MENA</p>

    </div>
    </section>
  )
}

export default Footer
