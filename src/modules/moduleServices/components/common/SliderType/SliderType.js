import './SliderType.css';
import {ReactComponent as ContainerTypeIcon}  from '../../../../../assets/icons/arrow-down-final.svg';
import React, { useRef, useState } from "react";


import Slider from "react-slick";
import Counter from '../Counter/Counter';

const SliderType = ({arrayItems,title,setIncrement,setDecrement ,handleCountText, errorValue,ref}) => {
  
  const PrevArrow = ({ onClick , currentSlide  }) => (
    <ContainerTypeIcon onClick={onClick} className="arrow-icon-left" style={{fill: currentSlide === 0 ? 'rgba(181, 181, 181, 0.55)':''}} />
  );

  const NextArrow = ({ onClick , currentSlide }) => (
    <ContainerTypeIcon onClick={onClick} className="arrow-icon-right" style={{fill: currentSlide === ((arrayItems.length - 1)/2) ? 'rgba(181, 181, 181, 0.55)':''}}   />);

  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  // console.log(currentSlide,"currentSlide", ((arrayItems.length - 1)/2))

  const updateCurrentSlide = (current) => {
    setCurrentSlide(current);
  };
  
  const [settings] = useState({
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: false
        }
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          arrows: false,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          prevArrow: null,
          nextArrow: null,
          dots: true,
          arrows: false,
        }
      }
    ],
    prevArrow: <PrevArrow  currentSlide={currentSlide} />,
    nextArrow: <NextArrow currentSlide={currentSlide} />,
    beforeChange: updateCurrentSlide,

  });

  const style={
    styleBorder:'1px solid #b5b5b58c',
    styleBorderHide:'none',
    styleWidth:'100%',
    styleMarginBottom:'0px',
    dirction:'row-reverse',
    

  }

  return (
    <div className="form-slider">

        <p className="form-slider__title">
            {title}
        </p>

        <Slider  ref={sliderRef} {...settings}>

        {
            arrayItems.map((item,index)=>(
                <div key={index} className={`form-slider__card ${errorValue ? 'card__error--border': 'card__normal--border'} `} >
                <img className='card__image'  src={item.img} alt={item.title} />
                <p className='card__title'>
                    {item.title}
                </p>

                <div className='card__counter' style={{marginBottom:'0px'}}>
                <Counter 
                    min={0} 
                    max={40}
                    count={item.valueCount}
                    setDecrement={setDecrement}
                    setIncrement={setIncrement}
                    handleCountText={handleCountText}
                    index={index}
                    nameClass={'form-land'}
                    styleLand={style}


                />
                </div>

                
            </div>
            ))
        }
    
      </Slider>
    </div>
  );
};

export default SliderType;
