import React, { Fragment, useEffect, useRef } from 'react'
import  ProgressBar  from '../ProgressBar/ProgressBar';
import { calculateProgress } from '../../../../../utils/trackCalculator/trackCalculator';

const ProgressBars = ({currentDateUTC, styleProgressVertical ,isVertical , styleProgressHorizantal, showIconLocation, currentTransportName , trackingPath , iconsTransportations}) => {

  // console.log(trackingPath,"trackingPath")

  const currentDateTansport = useRef("");



  useEffect(()=>{

    currentDateTansport.current = currentDateUTC;

  },[])

      const  findObjectById = (array, id) => {
        return array.find(obj => obj.id === id);
      }

      const iconImage = useRef(""); // from api will be string of url 
      const typeicon = useRef(""); // by me as svg
      let  progress = 0;

    

    
      // const currentDate = new Date(currentDateUTC); // Get the current date

      const progressBars = trackingPath
        ?.filter((_, index) => index + 1 < trackingPath.length) // Filter every pair of consecutive objects
        ?.map((_, index) => {
          const obj1 = trackingPath[index];
          const obj2 = trackingPath[index + 1];
          if(isVertical && index===0){
            progress = calculateProgress(new Date(currentDateUTC), new Date(obj2?.arrival_date) , new Date(obj1?.gatein_date));

          }else if( isVertical && obj2?.id ===obj1?.id ){
            progress = calculateProgress(new Date(currentDateUTC), new Date(obj1?.gatein_date)  ,new Date(obj2?.arrival_date) );

          }else{
            //Horizantail
            progress = calculateProgress(new Date(currentDateUTC), new Date(obj2?.arrival_date) , new Date(obj1?.gatein_date));

          }
          
          if(isVertical !==true){//Horizantal
          if(showIconLocation===true){
            typeicon.current=findObjectById(iconsTransportations,4)?.image;
          }
          else if(showIconLocation===false && obj1?.station_nature[0]?.type_station ===obj2?.station_nature[0]?.type_station && obj1?.station_nature[0]?.type_station==="ميناء") {
            typeicon.current=findObjectById(iconsTransportations,1)?.image;
          }else if(showIconLocation===false && obj1?.station_nature[0]?.type_station ===obj2?.station_nature[0]?.type_station && obj1?.station_nature[0]?.type_station==="مطار"){
            typeicon.current=findObjectById(iconsTransportations,2)?.image;
          }else if(showIconLocation===false){
            typeicon.current=findObjectById(iconsTransportations,3)?.image;
          }
          
          
          if(obj2?.station_nature[0]?.image_station){
            iconImage.current=""
            if(index + 2 ===trackingPath?.length ){
              iconImage.current=obj2?.station_nature[0]?.image_station
              }
          }else{
            iconImage.current=obj2?.station_nature[0]?.image_station
          }

        }
        
          return (
            <Fragment key={index}>
              {
                isVertical ===true ?
                <ProgressBar index={index} lastIndex={((index + 1) === trackingPath?.length -1) && true} isVertical={isVertical} styleProgressVertical={styleProgressVertical} styleProgressHorizantal={styleProgressHorizantal} date1={index % 2 ===0 ? obj1?.gatein_date : obj1?.arrival_date} date2={obj2?.arrival_date} station_name={obj1?.station_name} station_nameLast={obj2?.station_name} currentTransportName={currentTransportName} currentDateTransport ={currentDateTansport.current}  progress={progress}  iconEnd ={iconImage.current} />
                :
                <ProgressBar  isVertical={isVertical} styleProgressVertical={styleProgressVertical} styleProgressHorizantal={styleProgressHorizantal} date1={index % 2 ===0 ? obj1?.gatein_date : obj1?.arrival_date} date2={obj2?.arrival_date} station_name={obj1?.station_name} station_nameLast={obj2?.station_name} currentTransportName={currentTransportName} currentDateTransport ={currentDateTansport.current}  progress={progress} iconStart={obj1?.station_nature[0]?.image_station} iconEnd ={iconImage.current} type={typeicon.current} />

              }
          </Fragment>)
        });

        return(
            progressBars
        )
}

export default ProgressBars
