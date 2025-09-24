import React, { useRef, useState } from 'react';
import Slider from "react-slick";
import './SliderTools.css';
import logo1 from '../../../../assets/images/calctor-slider.svg'
import logo2 from '../../../../assets/images/custom-slider.svg'
import logo3 from '../../../../assets/images/shipping-calcu-slider.svg'
import logo4 from '../../../../assets/images/truck-slider.svg'
import logo5 from '../../../../assets/images/container-slider.svg'
import logo6 from '../../../../assets/images/incotem-slider.png'

import { useTranslation } from 'react-i18next';
// import { useNavigate } from 'react-router-dom';
import useQuery from '../../../../hooks/useQuery';
const SliderTools = () => {
  const {t} = useTranslation();
  // const navigate = useNavigate()

  const [activeEnable, setActiveEnable] = useState(false);

  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const queryUrl =useQuery();

  const NextArrow = (props) => {
    const { onClick } = props;
    return (

      <div className="main-arrow" onClick={onClick}>
        <div className="main-arrow__arrow-top"></div>
        <div className="main-arrow__arrow-bottom"></div>
      </div>
    );
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (

      <div className="main-arrow previous" onClick={onClick}>
        <div className="main-arrow__arrow-top previous"></div>
        <div className="main-arrow__arrow-bottom previous"></div>
      </div>
    );
  };

  const goToSlide = (index) => {
    sliderRef.current.slickGoTo(index);
  };

  const settings = {
    // className: "center",
    // centerMode: true,
    infinite: true,
    // centerPadding: "0px",
    slidesToShow: 3,
    speed: 500,
    arrows: false, // Set arrows to false to hide them
    responsive: [


			{
				breakpoint: 1500,
				settings: {
					dots: true,
					infinite: true,
					speed: 880,
					slidesToShow: 3,
					slidesToScroll: 1,
					autoplay: true,
					autoplaySpeed: 3000,

				}
			},
        {
          breakpoint: 1024,
          settings: {
						dots: true,
						infinite: true,
						speed: 800,
						slidesToShow: 3,
						slidesToScroll: 1,
						autoplay: true,
						autoplaySpeed: 3000,

          }
        },
        {
          breakpoint: 1000,
          settings: {

          	dots: true,
						infinite: true,
						speed: 800,
						slidesToShow: 2,
						slidesToScroll: 1,
						autoplay: true,
						autoplaySpeed: 3000,



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
						autoplay: true,
						autoplaySpeed: 3000,
					}
        }
      ],

      nextArrow: <NextArrow />,

      beforeChange: (oldIndex, newIndex) => {
        setActiveEnable(true);
        setActiveIndex(newIndex);
      },
      afterChange: (oldIndex, newIndex) => {
        setActiveEnable(false);

      }
  };

  const array= [{
    title:t('labelNavbar.customsDutiesCalculator'),
    subtitle:t('labelNavbar.item1'),
    logo:logo1,
    path:  queryUrl.has("param") ? 'customs-duties-calculator/calculator?param=across-mena' : 'customs-duties-calculator/calculator'
  },
  {
    title:t('labelNavbar.customsTariffAndConditions'),
    subtitle:t('labelNavbar.item2'),
    logo:logo2,
    path: queryUrl.has("param") ? 'prohibited-permitted-materials/search-hs-code?param=across-mena' : 'prohibited-permitted-materials/search-hs-code'

  },
  {
    title:t('labelNavbar.shippingCalculators'),
    subtitle:t('labelNavbar.item3'),
    logo:logo3,
    path: queryUrl.has("param") ? '' : '/tools/shipping-calculators'


  },
  {
    title:t('labelNavbar.truckTypesAndSizes'),
    subtitle:t('labelNavbar.item4'),
    logo:logo4,
    path: queryUrl.has("param") ? '' : 'tools/truck-types'

  },
  {
    title:t('labelNavbar.containerTypesAndSizes2'),
    subtitle:t('labelNavbar.item5'),
    logo:logo5,
    path: 'tools/container-types'

  },



]
const handleNavigate = (item) => {
  if (item?.path) {
    window.location.href = item.path; // Open in same tab
  }
};


  return (
    <div className='special-parent'>
      <Slider ref={sliderRef} {...settings}>
        {
          array.map((item,index)=>(
            <div
             key={index} 
              className='slider-parent-special'
              onClick={() => handleNavigate(item)}
              style={{ cursor: 'pointer'  }}

              >
            <div className='slider-special-img'>
              <img  className='slide-sepcial-img-son' src={item.logo} alt='logo card'/>
            </div>
            <div className='slider-special-info'>
              <p>
                  {item.title}
              </p>
              <p>
                  {item.subtitle}
              </p>

            </div>

            <button onClick={()=>handleNavigate(item)} style={{cursor: item?.path && 'pointer' ,display:'none'}}  className='slider-special-btn'>
              {t('actions.readMore')}
            </button>
          </div>
          ))
        }


      </Slider>

      <div className='slider-custom__dots'>

        <NextArrow onClick={() => goToSlide(activeIndex + 1)}/>

        <span className={`custom__middle-dots ${ activeEnable ? 'active' : ''}`} >

        </span>

        <PrevArrow onClick={() => goToSlide(activeIndex - 1)}/>


      </div>
    </div>
  );
};

export default SliderTools;
