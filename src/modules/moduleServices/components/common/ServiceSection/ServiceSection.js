import { MainContainer } from '../../../../../components';
import './ServiceSection.css';

const ServiceSection = ({title,detailsArray}) => {
  return (

    <MainContainer hasPadding={false}>
    <div  className='service-sea'>
        <h2 className='service-sea__title'>
            {title}
        </h2>

        <div className='service-sea__cards'>
            {
                detailsArray.map((item,index)=>(
            <div key={index} className='service-sea__card'>
                
                <img className='service-sea__card-img' src={item.icon} alt='Service Icon'/>
                <p className='service-sea__card-text'>
                    {item.text}
                </p>
            </div>

            ))}

        </div>
    
    </div>
    </MainContainer>
  )
}

export default ServiceSection
