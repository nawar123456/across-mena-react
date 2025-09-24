import styles from '../../modules/moduleTools/components/prohibitedPage/Accordion/AccordionFinal.module.css';
import './Skeleton.css';

const SkeletonAccordion = ({loading,loading22,loading23,error,children}) => {
    
    const array = [1,2,3,4,5,6,7,8,9,10]
    
    const renderHandler = () =>{

        return (
            <>
                {loading || loading22 || loading23 ? (
                array.map((_,index) =>{
                    return(
                    <div key={index} className={styles.accordion}>
                        <div className={`skeleton section-close ${styles.section}`} style={{border:'none'}}>
                        </div>
                    </div>
                    )
                })
                
                )
                
                : error ? (
                    <p className='loading-error' >
                    {error}
                    <br/>
                    <p className='error-desc'>
                    Someting went wrong <br/>
                    reload the page 
                    </p>
                    </p>
                ) 
                : (
                
                children
        
                )}
            </>
            );
    }


    return renderHandler();

}

export default SkeletonAccordion
