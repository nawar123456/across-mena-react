import React, { useState,useRef } from "react";
import Slider from "react-slick";
import "./ContainerSlider.css";
import Download from '../../../../assets/images/download-slider-yel.png'
import Share from '../../../../assets/images/share-slider-yel.png'
import { useTranslation } from 'react-i18next';
import t1 from '../../../../assets/images/20ft.png'
import t2 from '../../../../assets/images/40ft.png'
import t3 from '../../../../assets/images/20ft open top.png'
import t4 from '../../../../assets/images/40ft open top.png'
import t5 from '../../../../assets/images/20flat.png'
import t6 from '../../../../assets/images/flat.png'
import t7 from '../../../../assets/images/20ft freeser.png'
import t8 from '../../../../assets/images/40ft freeser.png'
import t9 from '../../../../assets/images/40ft hq.png'
const ContainerSlider = () => {
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
        name: t('containerSlider.dryStandard20'),
        image: t1,
        specs: [  
      { key: t('commonContainerSliderArray.length'),              value: t('containerSliderTabledryStandard20.length') },
      { key: t('commonContainerSliderArray.width'),              value: t('containerSliderTabledryStandard20.width') },
      { key: t('commonContainerSliderArray.height'),             value: t('containerSliderTabledryStandard20.height')  },
      { key: t('commonContainerSliderArray.wDoorMeasurement'),   value: t('containerSliderTabledryStandard20.wDoorMeasurement') },
      { key: t('commonContainerSliderArray.hDoorMeasurement'),   value: t('containerSliderTabledryStandard20.hDoorMeasurement')  },
      { key: t('commonContainerSliderArray.loadingCapacity'),     value: t('containerSliderTabledryStandard20.loadingCapacity') ,unit:t('commonContainerSliderArray.unit')},
      { key: t('commonContainerSliderArray.emptyWeight'),         value: t('containerSliderTabledryStandard20.emptyWeight') },
      { key: t('commonContainerSliderArray.maxPayload'),          value: t('containerSliderTabledryStandard20.maxPayload')  },
    ],
  },
      {
        name: t('containerSlider.dryStandard40'),
        image: t2,
          specs: [
      { key: t('commonContainerSliderArray.length'), value: t('containerSliderTabledryStandard40.length') },
      { key: t('commonContainerSliderArray.width'), value: t('containerSliderTabledryStandard40.width') },
      { key: t('commonContainerSliderArray.height'), value: t('containerSliderTabledryStandard40.height') },
      { key: t('commonContainerSliderArray.wDoorMeasurement'), value: t('containerSliderTabledryStandard40.wDoorMeasurement') }, 
      { key: t('commonContainerSliderArray.hDoorMeasurement'), value: t('containerSliderTabledryStandard40.hDoorMeasurement') }, 
      { key: t('commonContainerSliderArray.loadingCapacity'), value: t('containerSliderTabledryStandard40.loadingCapacity') , unit:t('commonContainerSliderArray.unit')},
      { key: t('commonContainerSliderArray.emptyWeight'),  value: t('containerSliderTabledryStandard40.emptyWeight') },
      { key: t('commonContainerSliderArray.maxPayload'),  value: t('containerSliderTabledryStandard40.maxPayload') },
    ],
  },
    
      {
        name: t('containerSlider.openTop20'),
        image: t3,
         specs: [
       { key: t('commonContainerSliderArray.length'), value: t('containerSliderTableOpenTop20.length') },
      { key: t('commonContainerSliderArray.width'), value: t('containerSliderTableOpenTop20.width') },
      { key: t('commonContainerSliderArray.height'), value: t('containerSliderTableOpenTop20.height') },
      { key: t('commonContainerSliderArray.wDoorMeasurement'),value: t('containerSliderTableOpenTop20.wDoorMeasurement') },
      { key: t('commonContainerSliderArray.hDoorMeasurement'), value: t('containerSliderTableOpenTop20.hDoorMeasurement') },
      { key: t('commonContainerSliderArray.wRoofMeasurement'),value: t('containerSliderTableOpenTop20.wRoofMeasurement') },
      { key: t('commonContainerSliderArray.hRoofMeasurement'),value: t('containerSliderTableOpenTop20.hRoofMeasurement') },
      { key: t('commonContainerSliderArray.loadingCapacity'), value: t('containerSliderTableOpenTop20.loadingCapacity')   , unit:t('commonContainerSliderArray.unit')},
      { key: t('commonContainerSliderArray.emptyWeight'),value: t('containerSliderTableOpenTop20.emptyWeight') }, 
      { key: t('commonContainerSliderArray.maxPayload'), value: t('containerSliderTableOpenTop20.maxPayload') },
    ],
  },
    
      {
        name: t('containerSlider.openTop40'),
        image: t4,
        specs: [
     { key: t('commonContainerSliderArray.length'), value: t('containerSliderTableOpenTop40.length') },
      { key: t('commonContainerSliderArray.width'), value: t('containerSliderTableOpenTop40.width') },
      { key: t('commonContainerSliderArray.height'), value: t('containerSliderTableOpenTop40.height') },
      { key: t('commonContainerSliderArray.wDoorMeasurement'),value: t('containerSliderTableOpenTop40.wDoorMeasurement') },
      { key: t('commonContainerSliderArray.hDoorMeasurement'), value: t('containerSliderTableOpenTop40.hDoorMeasurement') },
      { key: t('commonContainerSliderArray.wRoofMeasurement'),value: t('containerSliderTableOpenTop40.wRoofMeasurement') },
      { key: t('commonContainerSliderArray.hRoofMeasurement'),value: t('containerSliderTableOpenTop40.hRoofMeasurement') },
      { key: t('commonContainerSliderArray.loadingCapacity'), value: t('containerSliderTableOpenTop40.loadingCapacity') , unit:t('commonContainerSliderArray.unit')},
      { key: t('commonContainerSliderArray.emptyWeight'),value: t('containerSliderTableOpenTop40.emptyWeight') }, 
      { key: t('commonContainerSliderArray.maxPayload'), value: t('containerSliderTableOpenTop40.maxPayload') },
    ],
  },
      {
        name: t('containerSlider.flatRack20'),
        image: t5,
         specs: [
        { key: t('commonContainerSliderArray.length'), value: t('containerSliderTableFlatRack20.length') },
      { key: t('commonContainerSliderArray.width'), value: t('containerSliderTableFlatRack20.width') },
      { key: t('commonContainerSliderArray.height'), value: t('containerSliderTableFlatRack20.height') },
      { key: t('commonContainerSliderArray.lDoorMeasurement')  , value: t('containerSliderTableFlatRack20.lDoorMeasurement') },
      { key: t('commonContainerSliderArray.wDoorMeasurement'), value: t('containerSliderTableFlatRack20.wDoorMeasurement') },
      { key: t('commonContainerSliderArray.hDoorMeasurement'),value: t('containerSliderTableFlatRack20.hDoorMeasurement') },
      { key: t('commonContainerSliderArray.loadingCapacity'), value: t('containerSliderTableFlatRack20.loadingCapacity'), unit:t('commonContainerSliderArray.unit')},
      { key: t('commonContainerSliderArray.emptyWeight'), value: t('containerSliderTableFlatRack20.emptyWeight') },
      { key: t('commonContainerSliderArray.maxPayload'), value: t('containerSliderTableFlatRack20.maxPayload') },
    ],
  },
    
      {
        name: t('containerSlider.flatRack40'),
        image: t6,
      specs: [
        { key: t('commonContainerSliderArray.length'), value: t('containerSliderTableFlatRack40.length') },
      { key: t('commonContainerSliderArray.width'), value: t('containerSliderTableFlatRack40.width') },
      { key: t('commonContainerSliderArray.height'), value: t('containerSliderTableFlatRack40.height') },
      { key: t('commonContainerSliderArray.lDoorMeasurement')  , value: t('containerSliderTableFlatRack40.lDoorMeasurement') },
      { key: t('commonContainerSliderArray.wDoorMeasurement'), value: t('containerSliderTableFlatRack40.wDoorMeasurement') },
      { key: t('commonContainerSliderArray.hDoorMeasurement'),value: t('containerSliderTableFlatRack40.hDoorMeasurement') },
      { key: t('commonContainerSliderArray.loadingCapacity'), value: t('containerSliderTableFlatRack40.loadingCapacity') , unit:t('commonContainerSliderArray.unit')},
      { key: t('commonContainerSliderArray.emptyWeight'), value: t('containerSliderTableFlatRack40.emptyWeight') },
      { key: t('commonContainerSliderArray.maxPayload'), value: t('containerSliderTableFlatRack40.maxPayload') },
    ],
  },
      {
        name: t('containerSlider.reefer20'),
        image: t7,
        specs: [
     { key: t('commonContainerSliderArray.length'),  value: t('containerSliderTableReefer20.maxPayload') },
    { key: t('commonContainerSliderArray.width'), value: t('containerSliderTableReefer20.width') }, 
    { key: t('commonContainerSliderArray.height'), value: t('containerSliderTableReefer20.height') }, 
    { key: t('commonContainerSliderArray.lExteriorMeasurement'), value: t('containerSliderTableReefer20.maxPayload') },  
    { key: t('commonContainerSliderArray.wExteriorMeasurement'), value: t('containerSliderTableReefer20.maxPayload') },
    { key: t('commonContainerSliderArray.hExteriorMeasurement'), value: t('containerSliderTableReefer20.maxPayload') },
    { key: t('commonContainerSliderArray.wDoorMeasurement'),  value: t('containerSliderTableReefer20.maxPayload') },
    { key: t('commonContainerSliderArray.hDoorMeasurement'),  value: t('containerSliderTableReefer20.maxPayload') },
    { key: t('commonContainerSliderArray.loadingCapacity'),  value: t('containerSliderTableReefer20.maxPayload') , unit:t('commonContainerSliderArray.unit')},
    { key: t('commonContainerSliderArray.emptyWeight'),  value: t('containerSliderTableReefer20.maxPayload') },
    { key: t('commonContainerSliderArray.maxPayload'),  value: t('containerSliderTableReefer20.maxPayload') },
        ]
      },
      {
        name: t('containerSlider.reefer40'),
        image: t8,
         specs: [
     { key: t('commonContainerSliderArray.length'),  value: t('containerSliderTableReefer40.maxPayload') },
    { key: t('commonContainerSliderArray.width'), value: t('containerSliderTableReefer40.width') }, 
    { key: t('commonContainerSliderArray.height'), value: t('containerSliderTableReefer40.height') }, 
    { key: t('commonContainerSliderArray.lExteriorMeasurement'), value: t('containerSliderTableReefer40.maxPayload') },  
    { key: t('commonContainerSliderArray.wExteriorMeasurement'), value: t('containerSliderTableReefer40.maxPayload') },
    { key: t('commonContainerSliderArray.hExteriorMeasurement'), value: t('containerSliderTableReefer40.maxPayload') },
    { key: t('commonContainerSliderArray.wDoorMeasurement'),  value: t('containerSliderTableReefer40.maxPayload') },
    { key: t('commonContainerSliderArray.hDoorMeasurement'),  value: t('containerSliderTableReefer40.maxPayload') },
    { key: t('commonContainerSliderArray.loadingCapacity'),  value: t('containerSliderTableReefer40.maxPayload'), unit:t('commonContainerSliderArray.unit')},
    { key: t('commonContainerSliderArray.emptyWeight'),  value: t('containerSliderTableReefer40.maxPayload') },
    { key: t('commonContainerSliderArray.maxPayload'),  value: t('containerSliderTableReefer40.maxPayload') },
    ],
  },
    
      {
        name: t('containerSlider.dryHighCube'),
        image: t9,
            specs: [
     { key: t('commonContainerSliderArray.length'), value: t('containerSliderTableDryHighCube.length') },
    { key: t('commonContainerSliderArray.width'), value: t('containerSliderTableDryHighCube.width') },
    { key: t('commonContainerSliderArray.height'), value: t('containerSliderTableDryHighCube.height') },
    { key: t('commonContainerSliderArray.wDoorMeasurement'),value: t('containerSliderTableDryHighCube.wDoorMeasurement') },
    { key: t('commonContainerSliderArray.hDoorMeasurement'),value: t('containerSliderTableDryHighCube.hDoorMeasurement') },
    { key: t('commonContainerSliderArray.loadingCapacity'), value: t('containerSliderTableDryHighCube.loadingCapacity') , unit:t('commonContainerSliderArray.unit')},
    { key: t('commonContainerSliderArray.emptyWeight'), value: t('containerSliderTableDryHighCube.emptyWeight') },
    { key: t('commonContainerSliderArray.maxPayload'), value: t('containerSliderTableDryHighCube.maxPayload') },
    ],
  },
      
    
    ];
  const [activeIndex, setActiveIndex] = useState(0);

  const settings = {
    rtl: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
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
    {/* <div className="truck-tab-underline" style={{ right: `${activeIndex * 270}px` }} /> */}
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

  <div className="truck-actions">
    <img src={Download} alt="download" />
    <img src={Share} alt="share" />
  </div>
</div>

          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ContainerSlider;
