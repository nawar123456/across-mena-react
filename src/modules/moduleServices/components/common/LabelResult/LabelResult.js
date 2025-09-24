import './LabelResult.css';

const LabelResult = ({title,unit,result,iconCompare}) => {
  return (
    <div className='label-parent'>
        

        <span className={'input-title'}>
            
            <div className='labe-icon'>
            {iconCompare} 
            </div>
            
            {title}
            
            </span>

            <span
            className={'input-results'}>
              {
              result
              }

            <span className={'label-unit'}>
                {unit}
            </span>

            </span>
    </div>
  )
}

export default LabelResult
