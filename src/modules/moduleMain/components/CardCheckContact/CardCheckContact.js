import './CardCheckContact.css';
import {ReactComponent as WhatsappIcon}  from '../../../../assets/icons/whatsapp-line.svg'
const CardCheckContact = ({icon , placeholder, handleChecked , field,value}) => {

    const handleCheckedValue = (e)=>{

        handleChecked(field,!value)
    }
		const cardClass = `${icon.type === WhatsappIcon ? 'parent-card__check whatsapp-card' : 'parent-card__check'} ${value ? 'border-active' : ''}`;
		return (
    <div className={cardClass} onClick={handleCheckedValue} >

      <div className='parent-card__check-icon'>
      {icon}
      <span>
        {placeholder}
      </span>
      </div>

      <div className='parent-card__check-input'>

      <label htmlFor="custom-checkbox" className="form-control">
        <input className="parent-finish-checkbox"
				 checked={value}
				  id="custom-checkbox"
					type="checkbox"
					name="checkbox-checked"
					style={{accentColor:'#fcc400 !important'}}  />
      </label>

      </div>

    </div>
  )
}

export default CardCheckContact
