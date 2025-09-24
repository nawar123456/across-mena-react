import './InputWithSelectAirForm.css';
// import inputIcon from '../../../../../assets/icons/weight-icon.svg'
import { useTranslation } from 'react-i18next';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

const InputWithSelect = ({notDecimal,valueCheck,getCheckToggle,placeholder,title,textWeightValue,untiText,showunitText,hideSelect,Icon,selectUnit,field,fieldUnit,index,optionsArray,getInputText,getinputSelect,errorUnit,errorValue}) => {

  const {t} = useTranslation();


    const handleInputText =(e)=>{

        getInputText(field,e.target.value,index)

    }



    const handleClick = (e)=>{
        e.preventDefault();
        // try{
        // e.target.select();
        // }
        // catch(e){

        // }
        }


    return (
    <div className='input-parent'>

            <span className='input-label' >
            {title}
            </span>


            <input
						inputMode={ notDecimal ?"": 'decimal'}   title=''  required
            value={textWeightValue}
            placeholder={placeholder}
            onChange={handleInputText}
            onClick={handleClick}
            className='input-text'
            // style={{borderColor:errorValue ? '#f60000':isFocusedInput ?'#fcc400':'#b5b5b58c'}}
            style={{borderColor:(errorValue && textWeightValue?.trim()==="") && '#f60000' , padding:(!Icon &&'10px')}}

            type='text'
            />


            {hideSelect ===undefined &&
            <div  className='input-select' style={{width: showunitText ===true && '50px'}}>
            {showunitText ===true ?
            <span className='unit-input'>
            {untiText ? untiText:"Cm"}
            </span>
            :
            <>

            <ToggleSwitch unit1Title={t('labelServices.ton')} unit2Title={t('labelServices.keloGram')} changeToggle={getCheckToggle} valueCheck={valueCheck}  index={index}/>

            </>


            }
            </div>
            }


            </div>
  )
}

export default InputWithSelect
