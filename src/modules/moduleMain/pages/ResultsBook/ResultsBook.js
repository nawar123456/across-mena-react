import { Fragment, useEffect, useRef, useState } from 'react';
import './ResultsBook.css';
import { MainContainer } from '../../../../components';
import { CardInputs, Hero } from '../../components';
import { useSelector } from 'react-redux';
import CardBooking from '../../components/CardBooking/CardBooking';
import {ReactComponent as ContainerIcon}  from '../../../../assets/icons/container-icon.svg';
import SkeletonCardPrice from '../../../../components/Skeletons/SkeletonCardPrice';
import { useTranslation } from 'react-i18next';
import FormNoResults from '../../components/FormNoResults/FormNoResults';

const ResultsBook = () => {

    const {t} = useTranslation();
    const targetRef = useRef(null);
    const title= t('title.titleMainPage');
    const subTitle =t('title.subtitlemain');
    const {
        tripsArray,
        loadingTrip,
        portsObject,
        portsObjectSave
    } = useSelector((state) => state.moduleMain.homeSlice);
const [visibleTripsCount, setVisibleTripsCount] = useState(0);

    const [cardsPrice,setCardsPrice] = useState([]);
		useEffect(() => {
  console.log('📦 tripsArray updated:', tripsArray);
  console.log('🔍 Type:', typeof tripsArray);
  console.log('✅ Is Array:', Array.isArray(tripsArray));

  if (Array.isArray(tripsArray)) {
    const count = tripsArray.filter((item) => {
      const tripDate = new Date(item.date);
      const currentDate = new Date();
      const dayDifference = (tripDate - currentDate) / (1000 * 60 * 60 * 24);
      return dayDifference >= 2;
    }).length;

    setVisibleTripsCount(count);
  } else {
    setVisibleTripsCount(0);
  }
}, [tripsArray]);

    useEffect(() => {
      if (targetRef.current) {
        targetRef.current.scrollIntoView({ behavior: 'smooth' });

      }
   }, []);
   

    useEffect(()=>{

        setCardsPrice([]);

        if(tripsArray.length >0){

        setCardsPrice(tripsArray.map(item => ({ ...item, checkedOrigin: false, checkedDistanation: false })))

        }


      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[loadingTrip])



return (
    <>
      <Hero title={title} subTitle={subTitle} />

        <MainContainer>
        <div ref={targetRef} className='home-card'>

        <CardInputs portsObjectSave={portsObjectSave}/>

        </div>

        <div  className='home-card_parent'>

        {
        loadingTrip && tripsArray?.length === 0 ?

        <SkeletonCardPrice/>
        :
        tripsArray?.length > 0 && visibleTripsCount>0 ?
        cardsPrice?.map((item,index) => (
            <Fragment key={index}>
            <CardBooking item={item} portsObject={portsObject} setCardsPrice={setCardsPrice} index={index}  image={<ContainerIcon/>}

						/>
            </Fragment>
            ))
        :
        <>

        <FormNoResults/>
        </>

        }
        </div>

        </MainContainer>
    </>
  )
}

export default ResultsBook
