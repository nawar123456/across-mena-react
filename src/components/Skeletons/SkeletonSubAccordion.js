import styles from '../../modules/moduleTools/components/prohibitedPage/Accordion/AccordionFinal.module.css';
import './Skeleton.css';

const array =[1,2,3];

const SkeletonSubAccordion = () => {
    return (
        array.map((_,index)=>{
            return (
              <div key={index} className={styles["parent-one"]}>
                <div className={styles["parent-one-content"]}>
                  <div className="skeleton skeleton-sub-list"></div>
                </div>
              </div>
            );
        })
    )
}

export default SkeletonSubAccordion
