import "./ProgressBar.css";
import { ReactSVG } from 'react-svg'

const ProgressBar = ({index , lastIndex , date1 , date2 , isVertical , styleProgressVertical , styleProgressHorizantal, station_nameLast,station_name, currentTransportName, currentDateTransport,progress ,iconStart, iconEnd  , type}) => {

  const solidLineStyle = {
      borderRight: styleProgressVertical?.borderRightSolid,
      height: isVertical ? `${progress}%` : 'initial',
      width:isVertical ?'initial' : `${progress}%`,
      zIndex:2,
      borderBottom:styleProgressHorizantal?.borderBottomSolid
      // background:'#f5f5f5',

    };
  
    //default line
    const dashedLineStyle = {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      height: isVertical ? `100%` : 'initial',
      width: isVertical ? 'initial' : '100%',

      borderRight: styleProgressVertical?.borderRight,
      borderBottom:styleProgressHorizantal?.borderBottom

      // Add other styles as needed
    };

    const tooltipStyle = {
      left: `${progress }%`, // Set left to 50% for centering
      transform: `translateX(-${progress}%)`, // Center the tooltip horizontally
      display:`${ isVertical===true ? 'none' : (progress===0 || progress===100 ) ?  'none' : 'initial' }`,
      zIndex:4,
    };

    return (
      <>
      <div className="parent-progress__station" style={{left:index!==0 && styleProgressVertical?.leftLittle}}>
        {/* <img className="e" src={iconStart} alt="station icon" /> */}
        {
          iconStart ? 
          <ReactSVG className="parent-progress__station-icon"  src={ iconStart}  />
          :
          <div className="parent-progress__station-icon"   style={{left : styleProgressVertical?.leftIcon, position:styleProgressVertical?.positionIcon, backgroundColor:progress !== 0 ? styleProgressVertical?.backgroundColorChange  :styleProgressVertical?.backgroundColorOriginal , height: index===0? styleProgressVertical?.heightBigPoints : styleProgressVertical?.heightSmallPoints , width : index===0 ? styleProgressVertical?.widthBigPoints : styleProgressVertical?.widthSmallPoints, borderRadius: styleProgressVertical?.borderRadious}} >
          </div>
        }
        

        <span className="parent-progress__station-name" style={{top:styleProgressVertical?.topInfo , left:styleProgressVertical?.leftNameStation , textAlign:styleProgressVertical?.textAlignName , fontSize:styleProgressVertical?.fontSizeStation}}>
          {((isVertical && index % 2 !==0 )|| index ===0) ?
          station_name
          :
          isVertical ===false ?
          station_name 
          :
          ""
          }
        </span>
        
        {
        isVertical &&
        <span className="parent-progress__station-date">
        { date1}
        </span>
        }

        </div>


      <div className="progress-bar" style={{ position: 'relative' , height:`${isVertical ? styleProgressVertical?.progressBarheight : styleProgressHorizantal?.progressBarheight }` , width:`${isVertical ? styleProgressVertical?.progressBarWidth : styleProgressHorizantal?.progressBarWidth }`  }}>
        {/* <div className="progress-fill" style={progressStyle}></div> */}
        <div style={dashedLineStyle}></div>

        <div style={solidLineStyle}>
        {/* Your content goes here */}
      </div>

        <div className="progress-tooltip" style={tooltipStyle}>{/*ايقونة متغير فرح يتقستقيل ايقونة  */}
          {/* {`${progress}% ${type}`} */}
          {type && <ReactSVG   src={ type} className="track_card__transporticon" />}

          <div className='track_card__tooltip'>
            <span>
            {currentTransportName}
            </span>
            <span className="track_card__tooltip-date">
            {
              currentDateTransport
            }
            </span>

        </div>
        </div>

      </div>
      {
      (iconEnd!=="" || lastIndex) && 
      <div className="parent-progress__station" style={{left:styleProgressVertical?.leftLittle}}>
        {/* <img className="e" src={iconEnd} alt="station icon" /> */}
        {
          iconEnd ? 
          <ReactSVG className="parent-progress__station-icon"  src={iconEnd} />
          :
          <div className="parent-progress__station-icon"  style={{backgroundColor:progress === 100 ? styleProgressVertical?.backgroundColorChange  :styleProgressVertical?.backgroundColorOriginal , height:  styleProgressVertical?.heightBigPoints , width : styleProgressVertical?.widthBigPoints ,borderRadius: styleProgressVertical?.borderRadious}}>
          </div>

        }

        <span className="parent-progress__station-name" style={{left: isVertical ? styleProgressVertical?.leftNameStation : '-75px' , textAlign:'end' ,top:styleProgressVertical?.topInfo , fontSize:styleProgressVertical?.fontSizeStation}}>
          {station_nameLast}
          
        </span>

        {isVertical &&
        <span className="parent-progress__station-date">
        { date2}
        </span>
        }

      </div>
      }
      </>
    );
  };

export default ProgressBar
