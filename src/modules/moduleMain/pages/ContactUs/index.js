import { useTranslation } from 'react-i18next';
import './ContactUs.css';
import ContactHero from '../../../../assets/images/contactHero.webp';
import { Heading, MainContainer, SecondaryHero } from '../../../../components';
import ContactUsForm from '../../components/ContactUsPage/ContactUsForm/ContactUsForm';
import SEO from '../../../../components/SEO/SEO';
import { getSEOData } from '../../../../const/seoTitles';

const ContactUs = () => {

    const {t, i18n} = useTranslation();
    
    // Get SEO data based on current language
    const currentLang = i18n.language || 'ar';
    const seoData = getSEOData('contactUs', currentLang);

  return (
    <>
    <SEO 
      title={seoData.title}
      description={seoData.description}
      keywords={seoData.keywords}
      image="https://acrossmena.net/images/og-contact.jpg"
      url="https://acrossmena.net/contact-us"
      type="website"
      lang={currentLang}
    />
    
    {/* <SecondaryHero title={t('labelNavbar.contact')}  image={ContactHero} /> */}

    <MainContainer>
    <section className='contactus-page pd-y'>
    <div className='contactus-page__right'>

    <Heading  title={t('labelNavbar.contact')} body={t('labelContactUs.ContactUs')}  width100={'100%'}/>

    <section className='contactus-page__right-details'>
        <div className='contactus-page__right-details-row'>
        <span>
            {t('labelContactUs.address')} : {" "}
        </span>
        <span>
            {t('labelContactUs.building')}
        </span>
        </div>

        <div className='contactus-page__right-details-row'>
        <span>
            {t('labelContactUs.landLine')} : {" "}
        </span>
        <a href='tel:+00963415060'> 
        00963415060
        </a>
        </div>

        <div className='contactus-page__right-details-row'>
        <span>
            {t('labelContactUs.phone')} : {" "}
        </span>
        <a href='tel:+00963944506000'> 
        00963944506000
        </a>
        </div>

        <div className='contactus-page__right-details-row'>
        <span>
            {t('labelContactUs.email')} : {" "}
        </span>
        <a href='mailto:info@acrossmena.com'> 
        info@acrossmena.com
        </a>
        </div>

        <div className='contactus-page__right-details-row'>
            <div className='right-details-row__map'>
            
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3247.2941039427674!2d35.77608782470899!3d35.52172913872022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1526ad492d92a0e3%3A0xc4330d76cbea8c25!2sAcross%20Mena!5e0!3m2!1sar!2s!4v1708259368095!5m2!1sar!2s" 
            width="400" 
            height="300" 
            style={{border:"0"}}
            className='contactus-page__iframe-map'
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title='location-acrossmena'>
            </iframe>

            </div>

        </div>

    </section>


    </div>

    <div className='contactus-page__left'>

        <ContactUsForm/>


    </div>
    </section>
    </MainContainer>


    </>
  )
}

export default ContactUs
