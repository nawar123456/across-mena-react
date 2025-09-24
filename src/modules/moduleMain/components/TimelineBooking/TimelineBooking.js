
import { useSelector } from 'react-redux';
import TimeLine from '../TimeLine/TimeLine';
import './TimelineBooking.css';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import TimeLineAddBook from '../TimeLine/TimeLineAddBook';
import { getCurrency } from '../../../../utils/portUtils';

const TimelineBooking = ({numberStation , endDate, startDate ,TotalPickUp,containerType, numberDays}) => {
  const {t} = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
	const selectedContainer = useSelector((state) => state.moduleServices.seaFormSlice);

  const {
    globalOceanFreight,
} = useSelector((state) => state.moduleMain.homeSlice);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 660);
    };

    // Initial check on mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const {
    portsObject,
} = useSelector((state) => state.moduleMain.homeSlice);
const currency = getCurrency(portsObject?.portFrom, portsObject?.portTo);

// const calculatedOceanFreight = useSelector((state) => state.home.calculatedOceanFreight);


  return (
    <div className='right-book'>


        <p className='right-header__title'>
          {t('bookingTitles.labelTradelane')}
        </p>

        <div className='right-header__subtitle'>
          <p style={{color:'#727272',fontSize:'16px'}}>{t('bookingTitles.labelDeparture')}</p>
          <p style={{color:'#0D3453',fontSize:'16px'}}>{startDate}</p>
        </div>

      <div className='right-timeline'>

      <TimeLineAddBook
      
       variant={isMobile ? undefined : "vertical"}
       portTitleFrom={t('bookingTitles.placeholderPortFrom')}
        portTitleTo={t('bookingTitles.placeholderPortTo')}
        reverseIcons={true}
       visible={false}
				cityFrom={portsObject.portFrom}
				cityTo={portsObject.portTo}
				portsObject={portsObject}
				startDate={endDate}
				endDate={startDate}
				 numberStations={numberStation}
				 numberDays={numberDays} />
      </div>

      <div className='right-btn' style={{display:'none'}}>
        <button >
        {t('bookingTitles.buttonSchedule')}
        </button>
      </div>

      <div className='right-header__subtitle'>
          <p style={{fontSize:'16px'}}>{t('labelTrackPage.theContainer')}</p>
          <p style={{color:'#0D3453',fontSize:'16px'}}>
						 {` ${selectedContainer.selectedContainer}X ${containerType?.toString().toUpperCase().replace('FT', ` FT`)}`} {`${''}`}</p>
      </div>

      <div className='right-total'>
        <span style={{color:'#727272',fontWeight:'bold',fontSize:'18px'}} >
        {t('bookingTitles.labelTotalPrice')}
        </span>
        <span style={{fontWeight:'bold',fontSize:'1.4em',color:'#0D3453'}}>
          {currency}  {globalOceanFreight}
        </span>
      </div>


    </div>
  )
}

export default TimelineBooking
