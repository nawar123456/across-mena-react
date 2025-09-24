import React, { useState,useRef } from "react";
import Slider from "react-slick";
import { useTranslation } from 'react-i18next';
import '../ContainerTypes/ContainerSlider.css'
import "./TruckSlider.css";
import Download from '../../../../assets/images/download-slider-yel.png'

import Truck1 from '../../../../assets/images/TruckTypes.png'
import Share from '../../../../assets/images/share-slider-yel.png'
import t1 from '../../../../assets/images/satha.png'
import t2 from '../../../../assets/images/refreg-01.png'
import t3 from '../../../../assets/images/saineha.png'
import t4 from '../../../../assets/images/tek-open.png'
import t5 from '../../../../assets/images/katera-maktora.png'
import t6 from '../../../../assets/images/tek-close.png'
import t7 from '../../../../assets/images/close-contaiber.png'
import t8 from '../../../../assets/images/loader-moashi.png'
import t9 from '../../../../assets/images/loader-01.png'
import t10 from '../../../../assets/images/kalab-01.png'
import t11 from '../../../../assets/images/kalab-katera-maktora.png'
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
      { key: t('commonContainerSliderArray.length'), value: t('truckSliderTableSatha.length') ,unit:t('commonContainerSliderArray.unit') },
      { key: t('commonContainerSliderArray.width'), value: t('truckSliderTableSatha.width') ,unit:t('commonContainerSliderArray.unit') },
  
    ],
  },
    {
      name: t('truckSlider.refrigeratorTruck'),
      image: t2,
      specs: [  
      { key: t('commonContainerSliderArray.length'), value: t('truckSliderTableRef.length') ,unit:t('commonContainerSliderArray.unit') },
      { key: t('commonContainerSliderArray.width'), value: t('truckSliderTableRef.width')   ,unit:t('commonContainerSliderArray.unit') },
      { key: t('commonContainerSliderArray.height'), value: t('truckSliderTableRef.height') ,unit:t('commonContainerSliderArray.unit') },

  
    ],
  },

    {
      name: t('truckSlider.semiTrailerTruck'),
      image: t3,
      specs: [  
      { key: t('commonContainerSliderArray.length'), value: t('truckSliderTableSiniha.length') ,unit:t('commonContainerSliderArray.unit') },
      { key: t('commonContainerSliderArray.width'), value: t('truckSliderTableSiniha.width') ,unit:t('commonContainerSliderArray.unit') },
      { key: t('commonContainerSliderArray.height'), value: t('truckSliderTableSiniha.height') ,unit:t('commonContainerSliderArray.unit') },

  
    ],
  },

    {
      name: t('truckSlider.curtainSideRigidTruck'),
      image: t4,
      specs: [  
      { key: t('commonContainerSliderArray.length'), value: t('truckSliderTableOpenTek.length') ,unit:t('commonContainerSliderArray.unit') },
      { key: t('commonContainerSliderArray.width'), value: t('truckSliderTableOpenTek.width') ,unit:t('commonContainerSliderArray.unit') },
      { key: t('commonContainerSliderArray.height'), value: t('truckSliderTableOpenTek.height') ,unit:t('commonContainerSliderArray.unit') },

  
    ],
  },
    {
      name: t('truckSlider.jumboTrailer'),
      image: t5,
      specs: [  
      { key: t('commonContainerSliderArray.length'), value: t('truckSliderTablekateraMaktora.length') ,unit:t('commonContainerSliderArray.unit') },
      { key: t('commonContainerSliderArray.width'), value: t('truckSliderTablekateraMaktora.width') ,unit:t('commonContainerSliderArray.unit') },
      { key: t('commonContainerSliderArray.height'), value: t('truckSliderTablekateraMaktora.height') ,unit:t('commonContainerSliderArray.unit') },
    ],
  },
  
    {
      name: t('truckSlider.rigidTruck'),
      image: t6,
      specs: [  
      { key: t('commonContainerSliderArray.length'), value: t('truckSliderTableCloseTek.length') ,unit:t('commonContainerSliderArray.unit') },
      { key: t('commonContainerSliderArray.width'), value: t('truckSliderTableCloseTek.width') ,unit:t('commonContainerSliderArray.unit') },
      { key: t('commonContainerSliderArray.height'), value: t('truckSliderTableCloseTek.height') ,unit:t('commonContainerSliderArray.unit') },
    ],
  },
    {
      name: t('truckSlider.ContainerTruck'),
      image: t7,
      specs: [  
      { key: t('commonContainerSliderArray.length'), value: t('truckSliderTableCloseContainer.length') ,unit:t('commonContainerSliderArray.unit') },
      { key: t('commonContainerSliderArray.width'), value: t('truckSliderTableCloseContainer.width') ,unit:t('commonContainerSliderArray.unit') },
      { key: t('commonContainerSliderArray.height'), value: t('truckSliderTableCloseContainer.height') ,unit:t('commonContainerSliderArray.unit') },
    ],
  },
    {
      name: t('truckSlider.cattleTruck'),
      image: t8,
      specs: [  
      { key: t('commonContainerSliderArray.length'), value: t('truckSliderTableOpenTek.length') ,unit:t('commonContainerSliderArray.unit') },
      { key: t('commonContainerSliderArray.width'), value: t('truckSliderTableOpenTek.width') ,unit:t('commonContainerSliderArray.unit') },
      { key: t('commonContainerSliderArray.height'), value: t('truckSliderTableOpenTek.height') ,unit:t('commonContainerSliderArray.unit') },
    ],
  },

    {
      name: t('truckSlider.lowboyTrailers'),
      image: t9,
      specs: [  
      { key: t('commonContainerSliderArray.length'), value: t('truckSliderTableLoader.length') ,unit:t('commonContainerSliderArray.unit') },
   

  
    ],
  },
    
    {
      name: t('truckSlider.dumpTruck'),
      image: t10,
      specs: [  
      { key: t('commonContainerSliderArray.length'), value: t('truckSliderTableKalab.length') ,unit:t('commonContainerSliderArray.unit') },
      { key: t('commonContainerSliderArray.width'), value: t('truckSliderTableKalab.width') ,unit:t('commonContainerSliderArray.unit') },
      { key: t('commonContainerSliderArray.height'), value: t('truckSliderTableKalab.height') ,unit:t('commonContainerSliderArray.unit') },

  
    ],
  },
    {
      name: t('truckSlider.JumboDumpTrailer'),
      image: t11,
      specs: [  
      { key: t('commonContainerSliderArray.length'), value: t('truckSliderTableKalabKateraMaktora.length') ,unit:t('commonContainerSliderArray.unit') },
      { key: t('commonContainerSliderArray.width'), value: t('truckSliderTableKalabKateraMaktora.width') ,unit:t('commonContainerSliderArray.unit') },
      { key: t('commonContainerSliderArray.height'), value: t('truckSliderTableKalabKateraMaktora.height') ,unit:t('commonContainerSliderArray.unit') },
    ],
  },
    {
      name: t('truckSlider.carCarrierTrailer'),
      image: t12,
      specs: [  
      { key: t('commonContainerSliderArray.number'), value: t('truckSliderTableCarsContainer.carsNumber')  },


  
    ],
  },
    {
      name: t('truckSlider.tankerTruck'),
      image: t13,
      specs: [  
      { key: t('commonContainerSliderArray.opacity'), value: t('truckSliderTableOilTunke.opacity') ,unit:t('commonContainerSliderArray.unitL') },
   
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
          <div key={index} className="truck-slide">
            <img src={truck.image} alt={truck.name} className="truck-img" />
            <h3 className="truck-name">{truck.name}</h3>
         <div className="truck-info">
  <table className="specs-table">
    <tbody>
      {truck.specs && truck.specs.map((row, idx) => (
        <tr key={idx}>
          <td className="spec-value">{row.value} {row.unit}   </td>
          <td className="spec-key">{row.key}</td>
        </tr>
      ))}
    </tbody>
  </table>
              {/* <div className="truck-actions">
               
                <img
  src={Download}
  alt="download"
  onClick={downloadTruckPDF}
  style={{ cursor: "pointer" }}
/>
                <img src={Share} alt="share" />
              </div> */}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TruckSlider;
