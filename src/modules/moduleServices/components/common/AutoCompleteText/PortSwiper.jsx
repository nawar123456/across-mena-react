import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import './PortSwiper.css';

const PortSwiper = ({ ports = [], onPortSelect }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef(null);

const settings = {
  dots: false,
  infinite: false,
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 1,
  rtl: true,
  arrows: false,
  beforeChange: (current, next) => setActiveIndex(next),
  centerMode: true,
  centerPadding: '0px', // أو قيمة صغيرة مثل "10px"
};


  const prevSlide = () => sliderRef.current?.slickPrev();
  const nextSlide = () => sliderRef.current?.slickNext();

  return (
    <div className="port-tabs-container" dir="rtl">
      <button className="arrow right" onClick={nextSlide}>‹</button>

      <Slider {...settings} ref={sliderRef} className="tabs-slider">
        {ports.map((port, index) => (
          <div
            key={index}
            className={`port-tab ${index === activeIndex ? 'active' : ''}`}
            onClick={() => {
              onPortSelect(port);
              setActiveIndex(index);
            }}
          >
            {port.name || port.name}   
              {/* اظهار داخل السويبر الموانئ اسم عربي او انكليزي  */}
            {/* الخط الأصفر يظهر فقط عند النقر */}
            <div className={`tab-underline-yellow ${index === activeIndex ? 'show' : ''}`} />
          </div>
        ))}
      </Slider>

      <button className="arrow left" onClick={prevSlide}>›</button>

      {/* الخط المنقط — ثابت */}
      <div className="tab-underline-wrapper">
        <div className="tab-underline-dashed" />
      </div>
    </div>
  );
};

export default PortSwiper;