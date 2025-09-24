import React, { useTransition } from 'react';
import './HeroTool.css';
import SeaHero from '../../../../../assets/images/shapeGPT.png';
import { useTranslation } from 'react-i18next';
const HeroTool = ({ title, parag1, parag2, image, onScrollClick }) => {
   const {t} = useTranslation();
 
  return (
    <div className="sea-shipping-wrapper">
      <section className="land-Tool-section">
      <div className={`content ${
      image?.includes('shape') ? 'sea-content' :
      image?.includes('LandGPT') ? 'track-content' :
      image?.includes('PlaneGPT') ? 'air-content' :
      image?.includes('ShippingCalculators') ? 'calc-content' :
      image?.includes('TruckTypes') ? 'TruckTypes-content' :
      image?.includes('ContainerTypesGPT') ? 'containerSea-content' :
      image?.includes('Trade Terms') ? 'terms-content' :
      image?.includes('Customs Clearance') ? 'customs-content' :
      image?.includes('TruckShimpnet') ? 'tracking-content' :
      ''
    }`}>

                <h2 className={`title-hero-tool 
  ${image?.includes('shape') ? 'sea-title-hero-tool' : 
  image?.includes('LandGPT') ? 'track-title-hero-tool' : 
  image?.includes('PlaneGPT') ? 'air-title-hero-tool' : 
  image?.includes('ShippingCalculators') ? 'calc-title-hero-tool' : 
  image?.includes('TruckTypes') ? 'TruckTypes-title-hero-tool' : 
  image?.includes('ContainerTypesGPT') ? 'containerSea-title-hero-tool' : 
  image?.includes('Trade Terms') ? 'terms-title-hero-tool' : 
  image?.includes('Customs Clearance') ? 'customs-title-hero-tool' : 
  image?.includes('TruckShimpnet') ? 'tracking-title-hero-tool' : 
  ''}`}>

  {title}
</h2>



                <p className={`description 
  ${image?.includes('shape') ? 'sea-description' : 
  image?.includes('LandGPT') ? 'track-description' : 
  image?.includes('PlaneGPT') ? 'air-description' : 
  image?.includes('ShippingCalculators') ? 'calc-description' : 
  image?.includes('TruckTypes') ? 'TruckTypes-description' : 
  image?.includes('ContainerTypesGPT') ? 'containerSea-description' : 
  image?.includes('Trade Terms') ? 'terms-description' : 
  image?.includes('Customs Clearance') ? 'customs-description' : 
  image?.includes('TruckShimpnet') ? 'tracking-description' : 
  ''}`}>

  {parag1}
</p>

<p className={`description2 
  ${image?.includes('shape') ? 'sea-description2' : 
  image?.includes('LandGPT') ? 'track-description2' : 
  image?.includes('PlaneGPT') ? 'air-description2' : 
  image?.includes('ShippingCalculators') ? 'calc-description2' : 
  image?.includes('TruckTypes') ? 'TruckTypes-description2' : 
  image?.includes('ContainerTypesGPT') ? 'containerSea-description2' : 
  image?.includes('Trade Terms') ? 'terms-description2' : 
  image?.includes('Custom') ? 'custom-description2' : 
  image?.includes('TruckShimpnet') ? 'tracking-description2' : 
  ''}`}>

  {parag2}
</p>

        </div>

        <div className={`image-container 
  ${image?.includes('shape') ? 'sea-style' : 
  image?.includes('LandGPT') ? 'track-style' : 
  image?.includes('PlaneGPT') ? 'air-style' : 
  image?.includes('ShippingCalculators') ? 'calc-style' : 
  image?.includes('TruckTypes') ? 'TruckTypes-style' : 
  image?.includes('ContainerTypesGPT') ? 'containerSea-style' : 
  image?.includes('Trade Terms') ? 'terms-style' : 
  image?.includes('Customs Clearance') ? 'customs-style' : 
  image?.includes('TruckShimpnet') ? 'tracking-style' : 
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

export default HeroTool;
