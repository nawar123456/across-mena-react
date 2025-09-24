import { useNavigate } from 'react-router-dom';
import './CardAbout.css';

const CardAbout = ({path,img,title,text}) => {

  const navigate= useNavigate();

  const handleNavigate = (path)=>{

    if(path)
    navigate(path)
  }

  return (
    
    <div onClick={()=>handleNavigate(path)} style={{cursor: path &&'pointer'}} className='cards-about__container'>
    <p className='cards-about__title'>{title}</p>
  <div className='cards-about__info'>

  <img src={img} alt='icon card' className='cards-about__info-img'/>

    <p className='cards-about__info-text'>
    {text}
    </p>


  </div>
  </div>

  )
}

export default CardAbout
