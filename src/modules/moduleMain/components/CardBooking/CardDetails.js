import './CardDetails.css';

const CardDetails = ({isStyleIcon,Icon,index,infoTitle,checkedValue,field,toggleChecked , priceOrigin,priceOcean,priceDistantion}) => {



  const handleChecked= (value)=>{

    if(priceOcean){//because of always is true not need toggle
      return;
    }

    toggleChecked(index,checkedValue,field);

  }
  const isDisabled = priceOrigin === 0 || priceDistantion === 0 || priceOcean !== undefined;

	const isOceanFr =priceOcean !== undefined;



  return (
    <div className='item_details'>

  <div className='details_info'>

    <label className="form-control">
      <input className="parent-finish-checkbox" type="checkbox"
			 checked={checkedValue}
			 onChange={handleChecked}
			name="checkbox-checked"
			disabled={isDisabled} // Disable the checkbox if the condition is met
  style={{
		cursor: isDisabled ? 'default' : 'pointer',
		opacity: isDisabled ? 0.4 : 1, // Apply cursor style to the checkbox

	}}
			 />

    </label>

    <span className={`details_info-icon ${isStyleIcon}`}>
    {Icon}
    </span>

    <span className='details_info-title'>
      {infoTitle}
    </span>


  </div>

    <div className='details_price'>

			<span> {priceOrigin ||priceOcean ||priceDistantion }</span>
			<span style={{fontSize: '8px',padding: '21px 1px 0px 1px'}}>EUR</span>
    </div>


  </div>
  )
}

export default CardDetails
