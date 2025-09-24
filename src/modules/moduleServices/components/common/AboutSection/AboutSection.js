import { MainContainer } from '../../../../../components';
import './AboutSection.css';

const AboutSection = ({title,text1,text2,imageAbout}) => {
  return (
    <MainContainer hasPadding={false}>
    <div className='about-sea'>
      <h2 className='about-sea__title'>
        {title}
      </h2>
      <div className='about-sea__parent'>
        
        <div className='about-sea__texts'>
        <p className='about-sea__text1'>
          {text1}
        </p>
        <p className='about-sea__text2'>
          {text2}
        </p>
        </div>

        <div className='about-sea__image'>
          <img className='about-sea__img' src={imageAbout} alt="About Images" loading='lazy'/>
        </div>

      </div>
    
    </div>
    </MainContainer>
  )
}

export default AboutSection
