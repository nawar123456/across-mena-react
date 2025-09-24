import { useEffect, useState,forwardRef } from 'react';
import styles from './InputAccordion.module.css';
import Counter from '../Counter/Counter';
import { useTranslation } from 'react-i18next';
import { containersArray } from '../../functions';
import { useSelector } from 'react-redux';
// import Arrow  from '../../../../../assets/icons/Arrow-down.png';

const InputAccordion = forwardRef(
  (
  {se,Icon,placeholder,title,content,setIncrement,setDecrement ,handleCountText, errorValue},ref) => {

    const [isActive, setIsActive] = useState(false);
    const {t} = useTranslation();
    const [resultTitle,setResutTitle]=useState([]);

    const {
      postForm,
    } = useSelector((state) => state.moduleServices.seaFormSlice);


    
    useEffect(()=>{
      if(Object.keys(postForm).length>0 ){
        setResutTitle([]); // return [] if not choose anything
      }
    },[postForm]);


    const toggleAccordion = (e) => {
      e.preventDefault();

        setIsActive((isActive)=>!isActive);

        setResutTitle(containersArray(content,"seaForm")); // return [] if not choose anything
        
        
      };

    return (
<div className={`${styles['accordion__item']} `} ref={ref}>


    <p className={`${styles['field__title']}`}>
      {title}
    </p>

    <div 
    onClick={toggleAccordion} 
    className={`${styles['accordion__title']} ${isActive ? styles['active'] : ''}`}
    style={{borderColor: errorValue && '#f60000'}}
    >
        <div className={styles['title-details']}>

        {
        resultTitle.length > 0 ?
        resultTitle.map((item,index)=>(

          <div key={index} className={styles['result-container']}>
          <span style={{textWrap:'nowrap'}}>{item.container_type}</span>
          <span>x</span>
          <span>{item.container_number}</span>
          <span style={{margin:'0px 5px'}}>{index===resultTitle.length-1 ? '' : ','}</span>
          </div>

        ))
        :
        placeholder
        }
      </div>


        
         <div className={`${styles["bmenu"]} ${styles['x7']}`}>
        <span className={`${styles['btop']}`}></span>
          <span className={`${styles['bmid']}`}></span>
          <span className={`${styles['bbot']}`}></span> 

       </div> 
    </div>

    <div className={`${styles['accordion__content']} ${isActive ? styles['active'] : ''}`}>

        <div className={styles['content__items']}>
        { 
              content.map((item,index)=>(
              
              <div className={styles['container-item']} key={index}>
                <div className={styles['item-img']}>
                  {item.img}
                </div>

                <div className={styles['item-title']}>
                  <span className={styles['item-title-bold']}>
                  {item.title} 
                  </span>
                  <span className={styles['item-title-details']}>
                    {item.details}
                  </span>
                </div>

                <div className={styles['item-counter']}>

                      <Counter 
                      min={0} 
                      max={40}
                      count={item.valueCount}
                      setDecrement={setDecrement}
                      setIncrement={setIncrement}
                      handleCountText={handleCountText}
                      index={index}
                      />
                </div>

              </div>

              ))
        }
        </div>


        <div className={styles['container-btn']} onClick={toggleAccordion} >
            <input className={styles['container-submit' ]} 
            type='submit' 
            value={t('actions.confirmBtn')}
            />
        </div> 

    </div>

    <span className={styles['input-icon']}>
    {Icon}
    </span>



    </div>
  )
}
)
export default InputAccordion
