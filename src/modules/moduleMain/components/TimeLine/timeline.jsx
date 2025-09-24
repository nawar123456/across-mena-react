import { useTranslation } from 'react-i18next';
import { RiShip2Fill } from "react-icons/ri";
//  import {ReactComponent as RiShip2Fill}  from '../../../../assets/icons/ship_days.svg';
import triangleTimeline from '../../../../assets/icons/triangle-timeline.svg'
import circleTimeLine from '../../../../assets/icons/circle-timeline.svg'


// import {ReactComponent as ShipDaysIcon}  from '../../../../assets/icons/ship_days.svg';
import './TimeLine.css';
import { useState,useEffect } from 'react';

const TimeLine = ({Pos,variant,startDate,cityFrom,cityTo,portTitleTo,portTitleFrom, endDate,numberStations,numberDays}) => {



  const {t,i18n} = useTranslation();

	const isTimeLineBooking=portTitleFrom===t('bookingTitles.placeholderPortFrom');

	    const currentLanguage = 'en'; // or 'ar'
			const isVertical = variant === 'vertical';

  const stationArray = Array.from({ length: numberStations }, (_, index) => index);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 450);
    const isArabic = i18n.language === 'ar';

	useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 450);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

	const TimelineIcon = ({ variant }) => {
console.log('var',variant)
console.log('isV',isVertical)
    return (
        <RiShip2Fill
            className={`title-icon ${variant}`}
            style={{
							display:isVertical?'none':'normal',
                transform: isArabic ? 'rotateY(160deg)' : 'none',
                height: '30px',
                width: '30px',
            }}
        />
    );
	}
  // console.log(stationArray,"stationArray",numberStations,"numberStations")

  return (

    <div className={`timeline-container ${variant}`}>

    <span className={`timeline-end ${variant}`}>

        <span className={`${variant===undefined && 'timeline-font timeline-end-title'}`} style={{whiteSpace:'nowrap'}}>{portTitleFrom}</span>
        <span style={{fontWeight:'bold',color:'#0D3453',whiteSpace:'nowrap'}} className={`${variant===undefined && 'timeline-font timeline-end-port'}`}>{cityFrom }</span>
        <span className={`${variant===undefined && 'timeline-font timeline-end-date'}`}>{endDate}</span>

    </span>

    <div className={`timeline ${variant}`} style={{insetInlineEnd: Pos && Pos }}>

    <div className={`timeline-line ${variant}`} style={{   justifySelf : (i18n.language==='en' && window.innerWidth <  660) && 'start',marginLeft:isMobileView && isVertical? '0px' :'0em'}}>
      <span className={`timeline-innerline ${variant}`}></span>
    </div>


    <ul style={{left : (i18n.language==='en' && window.innerWidth <  660) && '-94%'}}>
      <li>
			{isMobileView  && variant===undefined ? (

	         portTitleFrom===t('labelServices.discharge')? (

				<img className={
					`${isTimeLineBooking? 'timeline-point2':'timeline-point'} ${variant}`}

				src={circleTimeLine} alt='traingleTimeline' />
					 ):(

<img className={
`${isTimeLineBooking? 'timeline-point2':'timeline-point'} ${variant}`}


src={triangleTimeline} alt='traingleTimeline'></img>
)
): (
					<span className={
						`${isTimeLineBooking? 'timeline-point2':'timeline-point'} ${variant}`}
						></span>
        )}



      </li>

          {
            (numberStations > 0) &&

            Object.entries(stationArray?.length>0).map((item,index) => (
            <li key={index}>
              <span className={
					`${isTimeLineBooking? 'timeline-point2':'timeline-point'} ${variant}`}
					></span>

            </li>
          ))
        }

      <li>
			{isMobileView  && variant===undefined ? (

portTitleFrom===t('labelServices.discharge')? (

<img className={
				`${isTimeLineBooking? 'timeline-point2':'timeline-point'} ${variant}`}
					src={triangleTimeline} alt='traingleTimeline' />
):(

<img className={
					`${isTimeLineBooking? 'timeline-point2':'timeline-point'} ${variant}`}

src={circleTimeLine} alt='traingleTimeline'></img>
)
): (
<span className={ `'timeline-point' ${variant} `}
					></span>
)}

			  </li>

		</ul>

    </div>

    <span className={`timeline-start ${variant}`} style={{top:numberStations >0  ? "98%": '70%'}}>

        <span className={`${variant===undefined && 'timeline-font timeline-start-title'}`}>{portTitleTo}</span>
        <span style={{fontWeight:'bold',color:'#0D3453'}} className={`${variant===undefined && 'timeline-font timeline-start-port'}`}>{cityTo }</span>
        <span className={`${variant===undefined && 'timeline-font timeline-start-date'}`}>{startDate}</span>


    </span>

    <div className={`timeline-title ${variant}`}>
        <span className={`title-days ${variant}  `}>
				<span className='days-number-results-book'>

            {numberDays}  {t('bookingTitles.labelDays')}
        </span>
				</span>

				<TimelineIcon language={currentLanguage} variant={variant} />
				</div>

    <div className={`timeline-type ${variant}`}>

        <span className={`type-title ${variant} `}>
            {numberStations > 0 ? `${numberStations} ${t('bookingTitles.labelTransshipment')}` : `${t('bookingTitles.labelDirct')}`}
        </span>



    </div>

    </div>
  )
}

export default TimeLine
