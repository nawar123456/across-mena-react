import './Skeleton.css';

const SkeletonCardPrice = () => {

    const array =[1,2,3];


  return (
    <>

    {
        array.map((_,i)=>{
            return(
                <div key={i} className=' skeleton skeleton-book-item card-book_item'>
                    <div className='skeleton row_1'>

                    </div>

                </div>
            )
        })
    }

    </>
  )
}

export default SkeletonCardPrice
