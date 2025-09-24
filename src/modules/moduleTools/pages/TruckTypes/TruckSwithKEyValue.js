import React, { useState,useRef } from "react";
import Slider from "react-slick";
import { useTranslation } from 'react-i18next';

import "./TruckSlider.css";
import Download from '../../../../assets/images/download-slider-yel.png'

import Truck1 from '../../../../assets/images/TruckTypes.png'
import Share from '../../../../assets/images/share-slider-yel.png'
import t1 from '../../../../assets/images/satha.png'
import t2 from '../../../../assets/images/refreg-01.png'
import t3 from '../../../../assets/images/saineha.png'
import t4 from '../../../../assets/images/tek-open.png'
import t5 from '../../../../assets/images/kalab-katera-maktora.png'
import t6 from '../../../../assets/images/tek-close.png'
import t7 from '../../../../assets/images/close-contaiber.png'
import t8 from '../../../../assets/images/loader-moashi.png'
import t9 from '../../../../assets/images/loader-01.png'
import t10 from '../../../../assets/images/kalab-01.png'
import t11 from '../../../../assets/images/katera-maktora.png'
import t12 from '../../../../assets/images/hamela-cars.png'
import t13 from '../../../../assets/images/oil-truck.png'
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
const TruckSlider = () => {
  const {t} = useTranslation();
    const tabRefs = useRef([]);
    const tabListRef = useRef(null);
    const scrollToTab = (index) => {
      const tab = tabRefs.current[index];
      const container = tabListRef.current;
      if (!tab || !container) return;
    
      const tabOffsetLeft = tab.offsetLeft;
      const tabWidth = tab.offsetWidth;
      const containerWidth = container.offsetWidth;
    
      const scrollPosition = tabOffsetLeft - (containerWidth / 2) + (tabWidth / 2);
    
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    };  

  const trucks = [
  {
    name: t('truckSlider.flatbedTruck'),
    image: t1,
    specs: [
      { key: 'w', value: '13.6 م' },
      { key:'h', value: '2.4 م' },
    ],
  },
    {
    name: t('truckSlider.flatbedTruck'),
    image: t1,
    specs: [
      { key: 'w', value: '13.6 م' },
      { key:'h', value: '2.4 م' },
            { key:'h', value: '2.4 م' },

    ],
  },

    {
     name: t('truckSlider.flatbedTruck'),
    image: t1,
    specs: [
      { key: 'w', value: '13.6 م' },
      { key:'h', value: '2.4 م' },
            { key:'h', value: '2.4 م' },
      { key:'h', value: '2.4 م' },

    ],
  },

   
  ];
  
  const [activeIndex, setActiveIndex] = useState(0);



// Function to download current truck image as PDF
const downloadTruckPDF = async () => {
  const truckSlide = document.querySelector('.truck-slide-active');

  if (!truckSlide) return;

  const canvas = await html2canvas(truckSlide, { scale: 2 });
  const imgData = canvas.toDataURL('image/png');

  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: [canvas.width, canvas.height]
  });

  pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
  pdf.save(`${trucks[activeIndex].name}.pdf`);
};

  const settings = {
    rtl: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // We'll use custom arrows
    afterChange: (index) => {
      setActiveIndex(index);
      scrollToTab(index);
    }
  };
  

  const nextSlide = () => sliderRef.slickNext();
  const prevSlide = () => sliderRef.slickPrev();
  let sliderRef;

  return (
    <div className="truck-slider-container" dir="rtl">
      {/* 🔝 Top Navbar */}
      <div className="truck-top-navbar">
  <button onClick={prevSlide}>❮</button>

  <div className="truck-tab-list" ref={tabListRef}>
  {trucks.map((truck, i) => (
   
   <span
   key={i}
   ref={(el) => (tabRefs.current[i] = el)}
   className={`truck-tab ${i === activeIndex ? "active" : ""}`}
   onClick={() => {
     setActiveIndex(i);
     sliderRef.slickGoTo(i);
     scrollToTab(i);
   }}
 >
   {truck.name}
 </span>
    ))}
    <div className="truck-tab-underline" style={{ right: `${activeIndex * 10}px`,left:`${activeIndex * 10}px` }} />
  </div>

  <button onClick={nextSlide}>❯</button>
</div>


      {/* 🖼 Truck Image + Info */}
      <Slider {...settings} ref={(slider) => (sliderRef = slider)}>
        {trucks.map((truck, index) => (
          <div
  key={index}
  className={`truck-slide ${index === activeIndex ? "truck-slide-active" : ""}`}
>
            <img src={truck.image} alt={truck.name} className="truck-img" />
            <h3 className="truck-name">{truck.name}</h3>
            <div className="truck-info">
             <table className="truck-dimensions-table">
  <tbody>
    {truck.specs.map((item, i) => (
      <tr key={i}>
        <td>{item.value}</td>
        <td>{item.key}</td>
      </tr>
    ))}
  </tbody>
</table>

              <div className="truck-actions">
                {/* <button title="Download">⬇️</button> */}
               
                <img
  src={Download}
  alt="download"
  onClick={downloadTruckPDF}
  style={{ cursor: "pointer" }}
/>
                <img src={Share} alt="share" />
                {/* <button title="Share">🔗</button> */}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TruckSlider;
