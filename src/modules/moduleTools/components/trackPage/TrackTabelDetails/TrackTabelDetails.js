import { formatNumber } from '../../../../../utils/math/mathUtils';
import './TrackTabelDetails.css';

const TrackTabelDetails = ({arrayObjects , styleTable}) => {

  function isNumber(str) {
    return /^\d+$/.test(str);
  }

    return (
    <div className='parent-table' style={{padding:styleTable?.padding}}>

    <table className="table-74 rounded-corners" style={{background:styleTable?.background , boxShadow:styleTable?.boxShadow}}>
    <thead>

    <tr>
      {
        arrayObjects.map((item,index)=>(
          <th key={index} style={{borderTop:styleTable?.borderTop}} >{item?.title}</th>
        ))
      }

    </tr>
    </thead>

<tbody>
    <tr>
      {
        arrayObjects.map((item,index)=>(
          <td data-label={item?.title} key={index} style={{borderTop : index===0 && styleTable?.borderTop}}>

            <span className='table-td__content' style={{padding: !(item?.value) &&  '24px'}}>
            {
            isNumber(item?.value?.toString())===true ? formatNumber(item?.value?.toString()) : item?.value
            }
            </span>

          </td>
        ))
      }
    </tr>

    </tbody>

    </table>
    </div>
    )
}

export default TrackTabelDetails                                           
