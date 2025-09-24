import { useTranslation } from 'react-i18next';
import { RiShip2Fill } from "react-icons/ri";
//  import {ReactComponent as RiShip2Fill}  from '../../../../assets/icons/ship_days.svg';
import triangleTimeline from '../../../../assets/icons/triangle-timeline.svg'
import circleTimeLine from '../../../../assets/icons/circle-timeline.svg'
import triangleSvg from '../../../../assets/icons/triangle-svgrepo-com.svg'
import traingleMaya from '../../../../assets/icons/traingleMaya.svg'
import tranigMayaPng from '../../../../assets/icons/tranigMayaPng.png'
import traNet from '../../../../assets/icons/triangle-svgrepo-net.svg'
import tr from '../../../../assets/icons/triangle-svgrepo-net.svg'
import trainglePerfect from '../../../../assets/icons/trainglePerfect.svg'

// import trM from '../../../../assets/icons/'


// import {ReactComponent as ShipDaysIcon}  from '../../../../assets/icons/ship_days.svg';
import './TimeLineSimple.css';
import { useState,useEffect } from 'react';

const TimeLineSimple = ({Pos,variant,startDate,
  cityFrom,cityTo,portTitleTo,portTitleFrom, endDate,price,currency,
  numberStations,numberDays,visible,reverseIcons = false 
}) => {




  const {t,i18n} = useTranslation();

    const isTimeLineBooking=portTitleFrom===t('bookingTitles.placeholderPortFrom');
const isReversed = reverseIcons;

    const currentLanguage = 'en'; // or 'ar'
            const isVertical = variant === 'vertical';

  const stationArray = Array.from({ length: numberStations }, (_, index) => index);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 500);
    const isArabic = i18n.language === 'ar';

    useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 500);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

    const TimelineIcon = ({ variant }) => {
console.log('var',variant)
console.log('isV',isVertical)
    return (
        <RiShip2Fill
        className={`title-icon ${variant} ${!visible ? 'hidden' : ''}`}
            style={{
                            display:isVertical?'none':'normal',
                transform: isArabic ? 'rotateY(160deg)' : 'none',
                height: '30px',
                width: '30px',
                                fill:'#000',
            }}
        />
    );
    }
  // console.log(stationArray,"stationArray",numberStations,"numberStations")

  return (

    <div className={`timeline-container-simple ${variant}`}>

    <span className={`timeline-end ${variant}`}>

        <span className={`${variant===undefined && 'timeline-font timeline-end-title'}`} style={{whiteSpace:'nowrap',color:visible?'#000':'#727272',opacity:visible?'1':'0.7'}}>{portTitleFrom}</span>
        <span style={{whiteSpace:'nowrap',color:visible?'#000':'#727272',opacity:visible?'1':'0.7'}} className={`${variant===undefined && 'timeline-font timeline-end-port'}`}>{cityFrom }</span>
        <span className={`${variant===undefined && 'timeline-font timeline-end-date'}`} style={{color:visible?'#000':'#727272',opacity:visible?'1':'0.7'}}>{endDate}</span>

    </span>

    <div className={`timeline ${variant}`} style={{insetInlineEnd: Pos && Pos }}>

    <div
          className={`timeline-line ${variant} ${!visible ? 'hidden' : ''}`}
                    style={{   justifySelf : (i18n.language==='en' && window.innerWidth <  660) && 'start',marginLeft:isMobileView && isVertical? '0px' :'0em'}}>
          <span className={`timeline-innerline ${variant} ${!visible ? 'hidden' : ''}`}></span>
                    </div>


    <ul style={{left : (i18n.language==='en' && window.innerWidth <  660) && '-94%'}}>
      <li>
            {isMobileView  && variant===undefined ? (

             portTitleFrom===t('labelServices.discharge')? (

                <img className={
                    `${isTimeLineBooking ||variant==='vertical' ? 'timeline-point2':'timeline-point'} ${variant}`}

                    src={trainglePerfect} alt='traingleTimeline' />
                     ):(

<img style={{width:'16px !important',height:'20px !important'}}
 className={
                    `${isTimeLineBooking ||variant==='vertical'? 'timeline-point2':'timeline-point'} ${variant}`}
                    src={circleTimeLine} alt='traingleTimeline'  ></img>
          // left icon  
          // right time line icon in the TimeLineBooking
)
): (
                    <span className={
                        `${isTimeLineBooking ||variant==='vertical'? 'timeline-point2':'timeline-point'} ${variant}`}

                        ></span>
        )}



      </li>

          {
            (numberStations > 0) &&

            Object.entries(stationArray?.length>0).map((item,index) => (
            <li key={index}>
              <span className={
                    `${isTimeLineBooking ||variant==='vertical'? 'timeline-point2':'timeline-point'} ${variant}`}
                    ></span>

            </li>
          ))
        }

      <li>
            {isMobileView  && variant===undefined ? (

portTitleFrom===t('labelServices.discharge')? (

<img className={`${isTimeLineBooking? 'timeline-point2':'timeline-point'} ${variant}`}
    src={trainglePerfect} alt='traingleTimeline' style={{width:'16px !important',height:'20px !important'}}  />

):(

<img className={
                    `${isTimeLineBooking ||variant==='vertical'? 'timeline-point2':'timeline-point'} ${variant}`}
                    src={trainglePerfect} alt='traingleTimeline'></img>
          // right time line icon 
          // left time line icon in the TimeLineBooking
)
): (
<span className={
                    `${isTimeLineBooking ||variant==='vertical'? 'timeline-point2':'timeline-point'} ${variant}`}
                    ></span>
)}

              </li>

        </ul>

    </div>

    <span className={`timeline-start ${variant}`} style={{top:numberStations >0  ? "98%": '70%'}}>

        <span className={`${variant===undefined && 'timeline-font timeline-start-title'}`} style={{color:visible?'#000':'#727272',opacity:visible?'1':'0.7'}}>{portTitleTo}</span>
        <span style={{color:visible?'#000':'#727272',opacity:visible?'1':'0.7'}} className={`${variant===undefined && 'timeline-font timeline-start-port'}`}>{cityTo }</span>
        <span className={`${variant===undefined && 'timeline-font timeline-start-date'}`} style={{color:visible?'#000':'#727272',opacity:visible?'1':'0.7'}}>{startDate}</span>


    </span>

    <div className={`timeline-title ${variant}`}>
        <span className={`title-days ${variant}  `}>
                <span className='days-number-results-book' style={{color:visible?'#000':'rgb(114 114 114/70%)',padding:visible?'none':'0px 5px'}}>

            {numberDays}  {t('bookingTitles.labelDays')}
        </span>
                </span>

                <TimelineIcon language={currentLanguage} variant={variant} />
                </div>

    <div className={`timeline-type ${variant}`}>

   

  
        <span className={`type-title-simple ${variant} `} style={{color:visible?'#000':'#727272',opacity:visible?'1':'0.7'}}>
            {numberStations > 0 ? `${price} ${currency}` : `${currency}`}
        </span>



    </div>

    </div>
  )
}

export default TimeLineSimple
