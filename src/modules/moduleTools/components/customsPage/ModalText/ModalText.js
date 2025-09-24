import { useEffect, useRef } from 'react';
import './ModalText.css';
import { useTranslation } from 'react-i18next';



const ModalText = ({toggleModalText ,setToggleModalText }) => {

    const dialogRef = useRef();
    const {t} = useTranslation();

    useEffect(() => {
        if (dialogRef.current.open && !toggleModalText) {
            dialogRef.current.close()
        } else if (!dialogRef.current.open && toggleModalText) {
            dialogRef.current.showModal()
        }
    }, [toggleModalText])

    const closeModalText = ()=>{
        setToggleModalText(false);
    }


    return (
        <dialog  ref={dialogRef} className='modal-contract'>
            
            <div className='contract-info'>

            <h3 className='contract-title'>
            {t('agreement.title')}
            </h3>

            <ol className='contract-list'>
                <li className='contract-item'>
                    {t('agreement.item_1')}
                </li>
                <li className='contract-item'>
                {t('agreement.item_2')}
                </li>
                <li className='contract-item'>
                {t('agreement.item_3')}
                </li>
                <li className='contract-item'>
                {t('agreement.item_4')}
                </li>
                <li className='contract-item'>
                {t('agreement.item_5')}
                </li>
                <li className='contract-item'>
                {t('agreement.item_6')}
                </li>
                <li className='contract-item'>
                {t('agreement.item_7')}
                </li>
                <li className='contract-item'>
                {t('agreement.item_8')}
                </li>
                <li className='contract-item'>
                {t('agreement.item_9')}
                </li>
            </ol>
            <div className='contract-btn'>
            <button className='contract-close' onClick={closeModalText}>
            {t('actions.buttonclose')}
            </button>
            </div>

            </div>
        
        </dialog>
    )
}

export default ModalText
