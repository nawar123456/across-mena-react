import styles from '../../modules/moduleTools/pages/CustomsCalculator/index.module.css';
import './Skeleton.css';

const SkeletonResults = () => {

    const array =[1,2,3,4];

    return (
    <>
    <div className={styles['math-right']} style={{paddingLeft:'30px'}} >

        {
            array.map((_,index)=>{
                return(
                    <div key={index}>
                    <p className='skeleton skeleton-text'>
                    </p>
                    </div>
                )
            })
        }
    </div>

    <div className={styles['math-left']}>
    {
            array.map((_,index)=>{
                return(
                    <div key={index}>
                    <p className='skeleton skeleton-text'>
                    </p>
                    </div>
                )
            })
        }
    </div>

    <div className={styles.line}>
            <p className='skeleton skeleton-text2'></p>
    </div>
    </>
)

}

export default SkeletonResults;
