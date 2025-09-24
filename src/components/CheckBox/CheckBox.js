import styles from './CheckBox.module.css';


const CheckBox = ({id,title,handleCheck,isChecked}) => {

    return (

<div className={styles['input-checkbox']}>
        <label htmlFor={id} className={styles['check-details']} style={{marginBottom:'0px'}}>{title}</label>
            <input id={id} checked={isChecked} onChange={handleCheck} className={styles['checkbox-type']} type='checkbox'  />
        </div>
)
}

export default CheckBox
