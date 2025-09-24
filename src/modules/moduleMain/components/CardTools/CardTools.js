import './CardTools.css';

const CardTools = ({icon}) => {
  return (
    <div className='card-tools-parent'>

  
        <div className='card-tools__img-parent'>
        <img className='card-tools__img' src={icon} alt='icon card'/>
        </div>

        <div className='card-tools__info'>
        <p className='card-tools__title'>
        حاسبة الاة 
        </p>

        <p className='card-tools__desc'>
        تفاصيل تفاصيل 
        </p>
        </div>

        <button className='card-tools_btn'>
        التالي 
        </button>
    
    </div>
  )
}

export default CardTools
