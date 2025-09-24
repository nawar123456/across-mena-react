import './Skeleton.css';
import { Fragment } from 'react';

const SkeletonModal = ({ownerId}) => {

    const array =[1,2];

return (
    <>

    {
        array.map((_,i)=>{
            return(
                <Fragment key={i}>
                <p className='note-number skeleton skeleton-number'></p>
                <li className='skeleton skeleton-content'></li>
                <p className='skeleton skeleton-content'></p>
                <p className='skeleton skeleton-content'></p>

                {
                    ownerId.toString()==="11"|| ownerId.toString()==="74" ?
                    <>
                    <p className='note-number skeleton skeleton-number'></p>
                    <li className='skeleton skeleton-content'></li>
                    <p className='skeleton skeleton-content'></p>
                    <p className='skeleton skeleton-content'></p>
                    </>
                    :null
                }
                </Fragment>
            )
        })
    }

    </>
    
)
}

export default SkeletonModal;

