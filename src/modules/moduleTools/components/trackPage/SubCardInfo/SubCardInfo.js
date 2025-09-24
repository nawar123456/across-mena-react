import './SubCardInfo.css';

const SubCardInfo = ({children, style}) => {
  return (
    <section style={style} className='track-subcard__card'>
    {children}
    </section>
  )
}

export default SubCardInfo
