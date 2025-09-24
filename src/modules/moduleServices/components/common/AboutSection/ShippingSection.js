import React, { useTransition } from 'react';
import './ShippingSection.css';
import SeaHero from '../../../../../assets/images/shapeGPT.png';
import { useTranslation } from 'react-i18next';
const ShippingSection = ({ title, parag1, parag2, image, onScrollClick }) => {
   const {t} = useTranslation();
 
  return (
    <div className="sea-shipping-wrapper">
      <section className="land-shipping-section">
      <div className={`content ${
      image?.includes('shape') ? 'sea-content' :
      image?.includes('LandGPT') ? 'track-content' :
      image?.includes('Plane') ? 'air-content' :
      image?.includes('Shipping Calculators') ? 'calc-content' :
      image?.includes('Truck') ? 'trucking-content' :
      image?.includes('Container Types') ? 'container-content' :
      image?.includes('Trade Terms') ? 'terms-content' :
      image?.includes('Customs Clearance') ? 'customs-content' :
      image?.includes('Tracking') ? 'tracking-content' :
      ''
    }`}>
<h2 className={`title 
  ${image?.includes('shape') ? 'sea-title' : 
  image?.includes('LandGPT') ? 'track-title' : 
  image?.includes('Plane') ? 'air-title' : 
  image?.includes('Shipping Calculators') ? 'calc-title' : 
  image?.includes('Truck') ? 'trucking-title' : 
  image?.includes('Container Types') ? 'container-title' : 
  image?.includes('Trade Terms') ? 'terms-title' : 
  image?.includes('Customs Clearance') ? 'customs-title' : 
  image?.includes('Tracking') ? 'tracking-title' : 
  ''}`}>
  {title}
</h2>                <p className={`description 
  ${image?.includes('shape') ? 'sea-description' : 
  image?.includes('LandGPT') ? 'track-description' : 
  image?.includes('Plane') ? 'air-description' : 
  image?.includes('Shipping Calculators') ? 'calc-description' : 
  image?.includes('Truck') ? 'trucking-description' : 
  image?.includes('Container Types') ? 'container-description' : 
  image?.includes('Trade Terms') ? 'terms-description' : 
  image?.includes('Customs Clearance') ? 'customs-description' : 
  image?.includes('Tracking') ? 'tracking-description' : 
  ''}`}>

  {parag1}
</p>

<p className={`description2 
  ${image?.includes('shape') ? 'sea-description2' : 
  image?.includes('LandGPT') ? 'track-description2' : 
  image?.includes('Plane') ? 'air-description2' : 
  image?.includes('Shipping Calculators') ? 'calc-description2' : 
  image?.includes('Truck') ? 'trucking-description2' : 
  image?.includes('Container Types') ? 'container-description2' : 
  image?.includes('Trade Terms') ? 'terms-description2' : 
  image?.includes('Custom') ? 'custom-description2' : 
  image?.includes('Tracking') ? 'tracking-description2' : 
  ''}`}>

  {parag2}
</p>
          <button 
          className={`cta-button 
            ${image?.includes('shape') ? 'sea-cta-button' : 
            image?.includes('LandGPT') ? 'track-cta-button' : 
            image?.includes('Plane') ? 'air-cta-button' : 
            image?.includes('Shipping Calculators') ? 'calc-cta-button' : 
            image?.includes('Truck') ? 'trucking-cta-button' : 
            image?.includes('Container Types') ? 'container-cta-button' : 
            image?.includes('Trade Terms') ? 'terms-cta-button' : 
            image?.includes('Custom') ? 'custom-cta-button' : 
            image?.includes('Tracking') ? 'tracking-cta-button' : 
            ''}`}
          onClick={onScrollClick}>
{t('actions.buttonBook')}
          </button>
        </div>

        <div className={`image-container 
  ${image?.includes('shape') ? 'sea-style' : 
  image?.includes('LandGPT') ? 'track-style' : 
  image?.includes('Plane') ? 'air-style' : 
  image?.includes('Shipping Calculators') ? 'calc-style' : 
  image?.includes('Truck') ? 'trucking-style' : 
  image?.includes('Container Types') ? 'container-style' : 
  image?.includes('Trade Terms') ? 'terms-style' : 
  image?.includes('Customs Clearance') ? 'customs-style' : 
  image?.includes('Tracking') ? 'tracking-style' : 
  ''}`}>
  <img src={image} alt="Shipping" />
</div>

      </section>

      {/* 👇 Bottom wave shape */}
      <div className="wave-mask">
      <svg width="1480" height="76" viewBox="0 0 1480 76" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 35.2984L0 75.3774L1479.36 75.3774V3.76956C1441.77 10.8947 1354.42 27.3895 1305.77 36.3672C1244.96 47.5893 1168.67 54.002 1055.9 62.0178C943.12 70.0336 749.631 35.2984 737.469 33.6952C725.307 32.0921 622.481 6.4415 425.675 0.56324C268.231 -4.13937 76.2899 21.7606 0 35.2984Z" fill="white"/>
</svg>

</div>
    </div>
  );
};

export default ShippingSection;
