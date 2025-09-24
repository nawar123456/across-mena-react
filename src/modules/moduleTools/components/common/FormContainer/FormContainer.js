import styles from './FormContainer.module.css'

const FormContainer = ({children}) => {
  return (
    <form name='form-calulator' className={styles['form-calculator']}> 
      
    {children}  
    </form>
  )
}

export default FormContainer
