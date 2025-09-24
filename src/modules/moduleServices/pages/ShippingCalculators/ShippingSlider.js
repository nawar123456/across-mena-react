import React, { useState } from "react";
import Slider from "react-slick";
import { useTranslation } from 'react-i18next';

import "./ShippingSlider.css";
import CylinderVolumeCalculator from "./CylinderVolumeCalculator";
import VolumetricWeightCalculator from "./VolumetricWeightCalculator";
import CubicMeterCalculator from "./CubicMeterCalculator";
const ShippingSlider = () => {
  const {t,i18n} = useTranslation();
  // VolumetricWeightCalculator.js
// const VolumetricWeightCalculator = () => (
//     <div className="calculator-box">
//       <h2>حاسبة الوزن الحجمي</h2>
//       {/* Add your input fields like the screenshot here */}
//       <input placeholder="عدد الطرود" />
//       <input placeholder="وزن الطرود" />
//       {/* etc */}
//     </div>
//   );
  
  // CubicMeterCalculator.js

  
  // CylinderVolumeCalculator.js

  const calculators = [
    { name: t('shippingCalculatorPage.volumetricWeightCalculator'), component: <VolumetricWeightCalculator /> },
    { name: t('shippingCalculatorPage.cubicMeterCalculator'), component: <CubicMeterCalculator /> },
    { name: t('shippingCalculatorPage.cylindricalPackageVolumeCalculator'), component: <CylinderVolumeCalculator /> },
  ];
  
//   const calcs = [
//     {
//       name: t('calcSlider.flatbedcalc'),
//       image: t1,
//       width: 42665,
//       length: 54663,
//       height: 46326,
//     },
//     {
//       name: t('calcSlider.refrigeratorcalc'),
//       image: t2,
//       width: 42660,
//       length: 54600,
//       height: 46000,
//     },

//     {
//       name: t('calcSlider.semiTrailercalc'),
//       image: t3,
//       width: 42660,
//       length: 54600,
//       height: 46000,
//     },

//     {
//       name: t('calcSlider.curtainSideRigidcalc'),
//       image: t4,
//       width: 42665,
//       length: 54663,
//       height: 46326,
//     },
//     {
//       name: t('calcSlider.jumboTrailer'),
//       image: t5,
//       width: 42660,
//       length: 54600,
//       height: 46000,
//     },
  
//     {
//       name: t('calcSlider.rigidcalc'),
//       image: t6,
//       width: 42660,
//       length: 54600,
//       height: 46000,
//     },
//     {
//       name: t('calcSlider.Containercalc'),
//       image: t7,
//       width: 42665,
//       length: 54663,
//       height: 46326,
//     },
//     {
//       name: t('calcSlider.cattlecalc'),
//       image: t8,
//       width: 42660,
//       length: 54600,
//       height: 46000,
//     },

//     {
//       name: t('calcSlider.lowboyTrailers'),
//       image: t9,
//       width: 42660,
//       length: 54600,
//       height: 46000,
//     },
    
//     {
//       name: t('calcSlider.dumpcalc'),
//       image: t10,
//       width: 42660,
//       length: 54600,
//       height: 46000,
//     },
//     {
//       name: t('calcSlider.JumboDumpTrailer'),
//       image: t11,
//       width: 42660,
//       length: 54600,
//       height: 46000,
//     },
//     {
//       name: t('calcSlider.carCarrierTrailer'),
//       image: t12,
//       width: 42660,
//       length: 54600,
//       height: 46000,
//     },
  
//     {
//       name: t('calcSlider.tanckercalc'),
//       image: t13,
//       width: 42660,
//       length: 546000,
//       height: 46000,
//     },
//   ];
  
  const [activeIndex, setActiveIndex] = useState(0);

  const settings = {
      rtl: i18n.dir() === 'rtl', // ✅ Dynamic direction
    // rtl: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // We'll use custom arrows
    afterChange: (index) => setActiveIndex(index),
  };

  const nextSlide = () => sliderRef.slickNext();
  const prevSlide = () => sliderRef.slickPrev();
  let sliderRef;
// dir="rtl"
  return (
    <div className="calc-slider-container" >
      {/* 🔝 Top Navbar */}
      <div className="calc-top-navbar">

  <div className="calc-tab-list">
  {calculators.map((calc, i) => (
    <span
      key={i}
      className={`calc-tab ${i === activeIndex ? "active" : ""}`}
      onClick={() => sliderRef.slickGoTo(i)}
    >
      {calc.name}
    </span>
  ))}
  <div className="calc-tab-underline" style={{ right: `${activeIndex * 90}px` }} />
</div>


</div>


      {/* 🖼 calc Image + Info */}
      <Slider {...settings} ref={(slider) => (sliderRef = slider)}>
  {calculators.map((calc, index) => (
    <div key={index} className="calc-slide">
      {calc.component}
    </div>
  ))}
</Slider>

    </div>
  );
};

export default ShippingSlider;
