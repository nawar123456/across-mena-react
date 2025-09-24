import { useEffect, useRef } from 'react';
import './DialogAgree.css';
import { useDispatch } from 'react-redux';
import { getLastItemValue } from '../../../store/calculatorTap/customs.slice';
import { useTranslation } from 'react-i18next';


const DialogAgree = ({toggleModalAgree,handleCheckboxChange,sonObject,closeModalText}) => {

    const dialogRef = useRef();
    const dispatch = useDispatch();
    const {t} = useTranslation();

    useEffect(() => {
        if (dialogRef.current.open && !toggleModalAgree) {
          dialogRef.current.close()
        } else if (!dialogRef.current.open && toggleModalAgree) {
          dialogRef.current.showModal()
        }
    }, [toggleModalAgree])

    const closeModalDialog = (e)=>{
        handleCheckboxChange(e,-1,{});
    }

    const agreeModalText = (e) =>{
        //keep sonObject
        
        dispatch(getLastItemValue(sonObject.current.id.toString()))

        handleCheckboxChange(e,-1,{});

        //also close accordionModal
        closeModalText();
        

    }

return (
    

   
    <dialog  ref={dialogRef} className='dialog-item'>
        <h2 className='dialog-title'>
            {t('labelDutiesCalculator.ischoosen')} {sonObject.current.id}
        </h2>
        <p className='dialog-description'>
            {sonObject.current.label}
        </p>

        <div className='dialog-btns'>
            <button className='agree-btn' onClick={agreeModalText}>
            {t('actions.buttonAgree')}
            </button>

            <button className='close-btn' onClick={closeModalDialog}>
            {t('actions.buttonCancel')}
            </button>
        </div>


    </dialog>
)
}

export default DialogAgree
