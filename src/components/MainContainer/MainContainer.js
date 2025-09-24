import styles from './MainContainer.module.css'

const MainContainer = ({children, hasPadding,width100,paddingStyle}) => {


return (
    
    <div style={{width:width100 }} className={  hasPadding === true ? `${styles['main-container']} ${styles['main-padding']} ${paddingStyle && styles['form-request']}` : `${styles['main-container']}`}>
    {children}
    </div>
)
}

export default MainContainer
