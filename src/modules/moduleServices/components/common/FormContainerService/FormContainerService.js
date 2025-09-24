import './FormContainerService.css';


const FormContainerService = ({children,zIndex}) => {
  return (
    <div className='form-container-service' style={{zIndex:zIndex}}>
    {children}
    </div>
  )
}

export default FormContainerService
