import './ToggleSwitch.css';
import { t } from 'i18next';

const ToggleSwitch = ({unit1Title, unit2Title , changeToggle,valueCheck,index}) => {
    


    const toggleClick = ()=>{
        // setIsLeftPosition((prev)=>!prev); 
        
        // if(isCheck){
        if(!valueCheck){
        changeToggle(t('labelServices.ton'),!valueCheck,index)
        }else{
        changeToggle(t('labelServices.keloGram'),!valueCheck,index)
        }
        // }
    }

    return (
    <div className="toggle-form-parent">
        <div className={`toggle-form-parent__box ${ valueCheck && 'toggle--isActive'} `} onClick={toggleClick}>
            <div className='toggle-form-parent__box-text'>
                <div style={{color:valueCheck ? '#fff' : '#333'}}>
                    {unit1Title}
                </div>
                <div style={{color:valueCheck ? '#333' : '#fff'}}>
                    {unit2Title}
                </div>

            </div>
        <div className='toggle-form-parent__box-circle'></div>
        </div>
    </div>
    )
}

export default ToggleSwitch;
